import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"
import styles from './signup.module.css'

function Signup() {
    const [ user, setUser ] = useOutletContext();
    const [ signupName, setSignupName ] = useState('');
    const [ signupMail, setSignupMail ] = useState('');
    const [ signupPw, setSignupPw] = useState('');
    const [ signupCpw, setSignupCpw ] = useState('');
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState([]);

    const handleSignup = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/users/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: signupName,
                email: signupMail,
                password: signupPw,
                cpw: signupCpw,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.result === 'success'){
                setSignupName('');
                setSignupMail('');
                setSignupPw('');
                setSignupCpw('');
                console.log(data.result);
                return navigate('/');
            } else if (data.errors) {
                setErrors(data.errors);
            } else {
                setErrors([data.error]);
            }
        })
        .catch(err => console.error(err));
    }

    if (!user) {
        return (
            <main className="main">
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Username</label>
                        <input  type="text" name="name" id="name" required
                                value={signupName}
                                onChange={e => setSignupName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input  type="email" name="email" id="email" required
                                value={signupMail}
                                onChange={e => setSignupMail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input  type="password" name="password" id="password" minLength={8} required
                                value={signupPw}
                                onChange={e => setSignupPw(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="cpw">Confirm Password</label>
                        <input type="password" id="cpw" name="cpw" required
                                value={signupCpw}
                                onChange={e => setSignupCpw(e.target.value)} />
                    </div>
                    <button>Sign Up</button>
                </form>
                <div>
                    {errors && errors.map(e => {
                        return <p key={e} className={styles.errMsg}>{e}</p>
                    })}
                </div>
            </main>
        )
    } else {
        return <h2>You are already logged in.</h2>
    }
}

export default Signup