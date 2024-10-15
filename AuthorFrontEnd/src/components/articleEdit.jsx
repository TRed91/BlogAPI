import { useState } from "react";

function ArticleEdit({ userId, article, toggleEdit, message, rerender }) {
    const [ newTitle, setNewTitle ] = useState(article.title);
    const [ newText, setNewText ] = useState(article.text);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/${userId}/articles/${article.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                title: newTitle,
                text: newText,
            }),
        })
        .then(res => res.json())
        .then(data => {
            message(data.message);
            rerender();
            toggleEdit();
        })
        .catch(err => {
            console.error(err.message);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" id="title" required
                       value={newTitle}
                       onChange={(e) => setNewTitle(e.target.value)}/>
                <textarea type="text" name="text" id="text" required
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ArticleEdit;