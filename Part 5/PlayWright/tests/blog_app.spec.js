const { test, expect, beforeEach, describe } = require('@playwright/test')
import bcrypt from 'bcryptjs'
import User from '../../../Part 4/BlogList/Models/user'
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
	await request.post('http://localhost:3000/api/testing/reset')
    await request.post('http://localhost:3000/api/users', {
      data: {
        name: 'Jack Morris',
        username: 'JackMorris',
        password: 'Cleopatra-8'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator=page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const user={username:'JackMorris', password:'Cleopatra-8'}
			await page.getByLabel('username').fill(user.username)
			await page.getByLabel('password').fill(user.password)
			await page.getByRole('button', { name: 'login' }).click()
			const loggedIn=await page.getByText('JackMorris logged in')
			await expect(loggedIn).toBeVisible()
			
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('user.username')
			await page.getByLabel('password').fill('user.password')
			await page.getByRole('button', { name: 'login' }).click()
			const failedLogin=await page.getByText('wrong credentials')
			await expect(failedLogin).toBeVisible()

    })
  })
	describe('When Logged In: ', async ()=>{
		beforeEach(async ({page, request})=>{
			const user={username:'JackMorris', password:'Cleopatra-8'}
			await page.getByLabel('username').fill(user.username)
			await page.getByLabel('password').fill(user.password)
			await page.getByRole('button', { name: 'login' }).click()

		})
		test('a new blog can be created', async ({ page }) => {
			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog1')
			await page.getByLabel('Author:').fill('TestBlog1')
			await page.getByLabel('Url:').fill('TestBlog1')
			await page.getByText('Add Blog').click()
			await expect(page.getByText('TestBlog1 TestBlog1')).toBeVisible()
			
		})
		test('that blog can be liked', async ({ page }) => {
			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog')
			await page.getByLabel('Author:').fill('TestBlog')
			await page.getByLabel('Url:').fill('TestBlog')
			await page.getByText('Add Blog').click()
			await page.getByText('View').click()
			const likes= page.locator('likes')
			await page.getByRole('button', { name: 'Like', exact:true }).click()
			await expect(page.getByText('likes: 1')).toBeVisible()
			
		})
		test('user who added blog can delete it', async({page})=>{
			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog1')
			await page.getByLabel('Author:').fill('TestBlog1')
			await page.getByLabel('Url:').fill('TestBlog1')
			await page.getByText('Add Blog').click()
			await page.getByText('View').click()
			await page.getByText('Delete').click()
			await expect(page.getByText('TestBlog1 TestBlog1')).toBeHidden()

		})
		test('only the user who added the blog sees the delete button', async({page, request})=>{
			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog1')
			await page.getByLabel('Author:').fill('TestBlog1')
			await page.getByLabel('Url:').fill('TestBlog1')
			await page.getByText('Add Blog').click()
			await page.getByText('View').click() 
			await expect(page.getByText('Delete')).toBeVisible()
			await page.getByText('Logout').click()
			await request.post('http://localhost:3000/api/users', {
      			data: {
        		name: 'Dave',
        		username: 'Dman',
        		password: 'Mor-Mos26'
      		}})
			await page.getByLabel('username').fill('Dman')
			await page.getByLabel('password').fill('Mor-Mos26')
			await page.getByRole('button', { name: 'login' }).click()
			await page.getByText('View').click()
			await expect(page.getByText('Delete')).toBeHidden()
		})
		
		test('the blogs are in descending order of likes', async({page, request})=>{
			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog1')
			await page.getByLabel('Author:').fill('TestBlog1')
			await page.getByLabel('Url:').fill('TestBlog1')
			await page.getByText('Add Blog').click()

			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog2')
			await page.getByLabel('Author:').fill('TestBlog2')
			await page.getByLabel('Url:').fill('TestBlog2')
			await page.getByText('Add Blog').click()

			await page.getByText('Create New Blog').click()
			await page.getByLabel('Title:').fill('TestBlog3')
			await page.getByLabel('Author:').fill('TestBlog3')
			await page.getByLabel('Url:').fill('TestBlog3')
			await page.getByText('Add Blog').click()

			const test1 = page.getByTestId('blog')
				.filter({ hasText: 'TestBlog1' })

			const test2 = page.getByTestId('blog')
				.filter({ hasText: 'TestBlog2' })

			const test3 = page.getByTestId('blog')
				.filter({ hasText: 'TestBlog3' })

			await test1.getByRole('button', { name: 'View' }).click()
			await test2.getByRole('button', { name: 'View' }).click()
			await test3.getByRole('button', { name: 'View' }).click()

			await test1.getByRole('button', { name: 'Like', exact:true }).click()

			for (let i = 0; i < 3; i++) {
			await test2.getByRole('button', { name: 'Like', exact:true }).click()
			}

			for (let i = 0; i < 2; i++) {
			await test3.getByRole('button', { name: 'Like', exact:true }).click()
			}

			await expect(page.getByTestId('blog').filter({ hasText: 'TestBlog1' }).getByText('Likes: 1')).toBeVisible()
			await expect(page.getByTestId('blog').filter({ hasText: 'TestBlog2' }).getByText('Likes: 3')).toBeVisible()
			await expect(page.getByTestId('blog').filter({ hasText: 'TestBlog3' }).getByText('Likes: 2')).toBeVisible()
			
			const blogs=page.getByTestId('blog')
			await expect(blogs).toHaveCount(3)
			await expect(blogs.nth(0)).toContainText('TestBlog2')
			await expect(blogs.nth(1)).toContainText('TestBlog3')
			await expect(blogs.nth(2)).toContainText('TestBlog1')
			

			

		})
	})
})