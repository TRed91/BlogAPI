import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
    const [ user, setUser ] = useOutletContext();
    const navigate = useNavigate();
    const [ loginName, setLoginName ] = useState("");
    const [ loginPw, setLoginPw ] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user])

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/login`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: loginName,
                password: loginPw,
            }),
        })
        .then((res) => res.json())
        .then(data => {
            if (data.result === 'success') {
                localStorage.setItem('token', data.token);
                setLoginName('');
                setLoginPw('');
                console.log(data.result);
                setUser(data.user);
            } else {
                console.log(data.result, data.error);
            }
        })
    }
    return (
        <div className="main">
            <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="name">Username</label>
                <input  type="text" name="name" id="name" 
                        value={loginName} 
                        onChange={(e) => setLoginName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input  type="password" name="password" id="password"
                        value={loginPw}
                        onChange={(e) => setLoginPw(e.target.value)} />
            </div>
            <button>Login</button>
            </form>
        </div>
    )
}

export default Login;