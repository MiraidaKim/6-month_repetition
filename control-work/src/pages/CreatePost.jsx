import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../store/usePosts'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const { createPost } = usePosts()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !summary) {
            alert('Заполните все поля')
            return
        }

        await createPost({ title, summary })
        navigate('/posts')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Создать пост</h1>
            <input
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Описание"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <button>Создать</button>
        </form>
    )
}
