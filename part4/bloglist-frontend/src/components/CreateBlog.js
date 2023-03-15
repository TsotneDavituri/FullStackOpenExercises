import { useState, useEffect} from "react"
import blogService from '../services/blogs'

const CreateBlog = ({setNotification, setErrorMessage, blogs, setBlogs}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
      blogService.getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    }, [setBlogs])

    const handleCreation = async (event) => {
        event.preventDefault()
        try {
          const newBlog = {
            title,
            author,
            url
          }
    
          const createdBlog = await blogService.create(newBlog)

          setAuthor('')
          setTitle('')
          setUrl('')

          setBlogs([...blogs, createdBlog])
    
          setNotification(`Creation succeeded!`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
    
        } catch (exception) {
          setErrorMessage('wrong request')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }

    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={handleCreation}>
                <div>
                    title:
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}>
                    </input>
                </div>
                <div>
                    author:
                    <input type="text"
                        name="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}>
                    </input>
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}>
                    </input>
                </div>
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default CreateBlog