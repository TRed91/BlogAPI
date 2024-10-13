import { useEffect, useState } from "react"

function ArticleForm() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ loginName, setLoginName ] = useState("");
    const [ loginPw, setLoginPw ] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/authors/login", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: loginName,
                password: loginPw,
            })
        })
        .then((res) => res.json())
        .then(data => {
            if (data.result === 'success') {
                localStorage.setItem('token', data.token);
                console.log(data.result);
            } else {
                console.log(data.result);
            }
        })
    }

    if (isLoggedIn) {
        return (
            <div>
                <form action="http://localhost:3000/authors/:id/articles" method="post">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="title" required />
                </div>
                <div>
                    <textarea name="text" id="text"></textarea>
                </div>
                <button>Submit</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
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
    
}

export default ArticleForm