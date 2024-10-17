import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Articles() {
    const [ user, setUser ] = useOutletContext();
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_MYAPI_HOST}/articles`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data.articles);
        })
        .catch(err => err.message);
    }, []);

    return (
        <main>
            <div>
                {articles.length > 0 
                ? articles.map(a => {
                    <div>
                        <h2>{a.title}</h2>
                        <p>{a.text}</p>
                        <div>{a.time}</div>
                        <div>{a.comments.map(c => {
                            <p>{c.text}</p>
                        })}</div>
                    </div>
                }) 
                : <h2>Not articles published</h2>}
            </div>
        </main>
    )
}

export default Articles;