const Notification = ({ message, looks}) => {
  if (message === null) {
    return null
  }
  return (
    <div className={`${looks}`} >
      {message}
    </div>
  )
}

export default Notification