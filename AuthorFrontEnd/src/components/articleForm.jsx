import { useEffect, useState } from "react"
import { useOutletContext, redirect, useNavigate } from "react-router-dom";

function ArticleForm() {
    const [ user, setUser ] = useOutletContext();
    const navigate = useNavigate();
    const [ articleTitle, setArticleTitle ] = useState('');
    const [ articleText, setArticleText ] = useState('');
    const [ postResponse, setPostResponse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/${user.id}/articles`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                title: articleTitle,
                text: articleText,
            }),
        })
        .then(res => res.json())
        .then(data => {
            setArticleTitle('');
            setArticleText('');
            setPostResponse(data.message);
        })
        .catch(err => {
            setArticleTitle('');
            setArticleText('');
            console.error(err.message);
        });
    }
    
    if (user) {
        return (
            <div className="main">
                <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="title" id="title" placeholder="title" className="title" required
                            value={articleTitle}
                            onChange={(e) => setArticleTitle(e.target.value)} />
                </div>
                <div>
                    <textarea name="text" id="text" required
                                value={articleText}
                                onChange={(e) => setArticleText(e.target.value)}>
                    </textarea>
                </div>
                <button>Submit</button>
                </form>
                <div>
                    <p className="resMsg">{postResponse}</p>
                </div>
            </div>
        )
    } else {
        useEffect(() => {
            navigate("/login");
        }, []);
    }
}

export default ArticleForm