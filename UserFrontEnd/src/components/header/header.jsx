import { useNavigate } from "react-router-dom"
import styles from './header.module.css'

function Header({user}) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <header>
            <nav>
                <ul className={styles.navlist}>
                    <li><a href="/">Articles</a></li>
                    {user ? <li><a onClick={logout} href="">Log Out</a></li> : <li><a href="/login">Log In</a></li>}
                    {!user && <li><a href="/signup">Sign Up</a></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header