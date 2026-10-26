import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import AddForm from './AddForm'
import userEvent from '@testing-library/user-event'


describe('blog tests', ()=>{
test('renders author and title, but not url and others without being selected', () => {

  const blog={
    title: 'Test Blog',
    author:'Jack Morris',
    url: 'ThisURL',
    likes: 5,
    user:{
      username:'Jack Morris'
    }
  }
  

  render(<Blog blog={blog} />)

  const title = screen.getByText('Test Blog Jack Morris', {exact:false})
 
  const url = screen.getByText('ThisURL', {exact:false})
  const likes = screen.getByText('5', {exact:false})

  expect(title).toBeDefined()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})
test('show button',async ()=>{
  const blog={
    title: 'Test Blog',
    author:'Jack Morris',
    url: 'ThisURL',
    likes: 5,
    user:{
      username:'Jack Morris'
    }
  }
  render(<Blog blog={blog} />)

  const url = screen.getByText('ThisURL', {exact:false})
  const likes = screen.getByText('5', {exact:false})

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
  expect(url).toBeVisible()
  expect(likes).toBeVisible()

})
test('test like function', async ()=>{
  const blog={
    title: 'Test Blog',
    author:'Jack Morris',
    url: 'ThisURL',
    likes: 5,
    user:{
      username:'Jack Morris'
    }
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} eventHandlerForTesting={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
  const button2=screen.getByText('TestLike')
  await user.click(button2)
  await user.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
test('test add blog', async ()=>{
  const mockHandler = vi.fn()
  
  render(<AddForm handleAdd={mockHandler}/>)
  const user = userEvent.setup()
  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'Test Blog')
  await user.type(inputs[1], 'Jack Morris')
  await user.type(inputs[2], 'URL')
  const add=await screen.findByText('Add Blog')
  await user.click(add)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Test Blog')
})
})