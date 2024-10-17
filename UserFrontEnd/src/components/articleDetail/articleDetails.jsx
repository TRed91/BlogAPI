import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CommentForm from "../commentForm/commentForm";

function ArticleDetail(){
    const { articleId } = useParams();
    const [ user, setUser ] = useOutletContext();
    const [ article, setArticle ] = useState(null);
    const [ msg, setMsg] = useState('Loading...');
    const [ toggle, forceRerender] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/articles/${articleId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setArticle(data.article)
        })
        .catch(err => console.error(err.message));
    }, [article]);

    const handleDelete = (id) => {
        let input = prompt("Enter 'Delete' if you want to delete this comment.").toLowerCase();
        if (input === 'delete') {
            fetch(`${import.meta.env.VITE_MYAPI_HOST}/users/comments/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.result);
                data.result === 'success' 
                    ? setMsg(data.message) 
                    : setMsg(data.error);
            })
            .catch(err => {
                console.error(err.message)
            })
        }
    }

    if (article) {
        return (
            <main>
                <h2>{article.title}</h2>
                <p>{article.text}</p>
                <div>{article.time}</div>
                <hr />
                {user && <CommentForm   userId={user.id} 
                                        articleId={articleId} 
                                        rerender={() => forceRerender(!toggle)}/>}
                <hr />
                <h3>Comments:</h3>
                <div>
                    {article.comments.map(c => {
                        return <div key={c.id}>
                            <p>{c.text}</p>
                            <div>{c.time}</div>
                            {user && c.userId === user.id && 
                            <div>
                                <button onClick={() => handleDelete(c.id)}>Delete</button>
                            </div>}
                        </div>
                    })}
                </div>
            </main>
        )
    }
    
}

export default ArticleDetail;