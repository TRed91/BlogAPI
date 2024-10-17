import { useState } from "react";

function CommentForm({ userId, articleId, rerender }){
    const [ comment, setComment ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/users/${userId}/comments/${articleId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                text: comment,
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.result);
            setComment('');
            rerender();
        })
        .catch(err => console.error(err.message));

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea type="text" name="comment" id="comment" required
                        value={comment}
                        onChange={e => setComment(e.target.value)}/>
                <button>Post Comment</button>
            </form>
        </div>
    )
    
}

export default CommentForm;