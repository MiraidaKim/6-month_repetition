import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'

export default function Layout() {
    const location = useLocation()

    const hideHeader =
        location.pathname === '/auth' ||
        location.pathname === '/register'

    return (
        <>
            {!hideHeader && <Header />}
            <main>
                <Outlet />
            </main>
        </>
    )
}
