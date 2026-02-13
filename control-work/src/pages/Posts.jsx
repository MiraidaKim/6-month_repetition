import { useEffect } from 'react'
import { usePosts } from '../store/usePosts'

export default function Posts() {
    const { posts, getPosts } = usePosts()

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            <h1>Все посты</h1>

            {posts.map((post) => (
                <div
                    key={post.id}
                    style={{
                        border: '1px solid gray',
                        padding: '10px',
                        margin: '10px 0'
                    }}
                >
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                </div>
            ))}
        </div>
    )
}
