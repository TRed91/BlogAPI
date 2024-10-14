import { useEffect, useState } from "react"
import { useOutletContext, redirect, useNavigate } from "react-router-dom";

function ArticleForm() {
    const [ user, setUser ] = useOutletContext();
    const navigate = useNavigate();
    
    if (user) {
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
        useEffect(() => {
            navigate("/login");
        }, []);
    }
}

export default ArticleForm