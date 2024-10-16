import { useState } from "react";
import { useNavigate } from "react-router-dom"

function ArticleButtons({ userId, articleId, published, message, rerender, toggleEdit }) {
    const navigate = useNavigate();

    const handlePublish = () => {
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/${userId}/publish/${articleId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                publish: published ? 'false' : 'true',
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.result === 'success') {
                message(data.message);
                rerender();
                navigate('/articles');
            } else {
                message(data.error);
            }
        })
        .catch(err => message(err.message))
    }

    const handleDelete = () => {
        let confirm = prompt("Type 'DELETE' if you want to delete this article.").toLowerCase();
        if(confirm === 'delete') {
            fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/${userId}/articles/${articleId}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'success') {
                    message(data.message);
                    rerender();
                    navigate('/articles');
                } else {
                    message(data.error);
                }
            })
            .catch(err => message(err.message))
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => navigate(`/articles/${articleId}`)}>Details</button>
                <button onClick={handlePublish}>{published ? 'Unpublish' : 'Publish'}</button>
                <button onClick={() => toggleEdit()}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ArticleButtons;