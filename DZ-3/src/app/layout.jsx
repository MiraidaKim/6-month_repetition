import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer.jsx'
import { useAuth } from '../store/use-auth.js'
import { $authApi } from '../api/requester.js'
import './layout.css'


export function Layout() {
    const setUser = useAuth(state => state.setUser)

    useEffect(() => {
        const token = localStorage.getItem('tokenAuth')
        if (!token) return 

        const checkAuth = async () => {
            try {
                const { data } = await $authApi.get('/auth_me')
                setUser(data)
            } catch (err) {
                console.log(err)
            }
        }

        checkAuth()
    }, [])

    return (
        <div className="layout"> 
            <Header />
            <main className="layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

