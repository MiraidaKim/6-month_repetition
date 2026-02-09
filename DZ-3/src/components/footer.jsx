import {useAuth} from '../store/use-auth.js'
import './footer.css';


export function Footer() {
    const isAuth = useAuth(state => state.isAuth)

    return (
        <footer>Footer</footer>
    )
}