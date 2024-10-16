import { useNavigate } from "react-router-dom";


function Header ({user}) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="header">
            <ul>
                <li><a href="/">New Article</a></li>
                {user && <li><a href="/articles">Articles</a></li>}
                {user ? <li><a onClick={logout} href="">Log Out</a></li> : <li><a href="/login">Log In</a></li>}
                {!user && <li><a href="/signup">Sign Up</a></li>}
            </ul>
        </div>
    )
}

export default Header;