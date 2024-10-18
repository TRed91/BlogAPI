import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from './login.module.css';

function Login() {
    const [ user, setUser ] = useOutletContext();
    const navigate = useNavigate();
    const [ loginName, setLoginName ] = useState('');
    const [ loginPw, setLoginPw ] = useState('');
    const [ msg, setMsg ] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user]);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/users/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: loginName,
                password: loginPw,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.result === 'success'){
                localStorage.setItem('token', data.token);
                setLoginName('');
                setLoginPw('');
                console.log(data.result);
                setUser(data.user);
            } else {
                console.log(data.result, data.error);
                setMsg(data.error);
            }
        })
    }
    return (
        <main className="main">
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div>
                    <label htmlFor="name">Username</label>
                    <input  type="text" name="name" id="name" required
                            value={loginName}
                            onChange={e => setLoginName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input  type="password" name="password" id="password" required
                            value={loginPw}
                            onChange={e => setLoginPw(e.target.value)} />
                </div>
                <button>Log In</button>
            </form>
            <div className={styles.errMsg}>{msg}</div>
        </main>
    )
}

export default Login;