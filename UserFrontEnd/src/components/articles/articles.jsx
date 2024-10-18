import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from './articles.module.css'

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
            <div className={styles.articleContainer}>
                {articles.length > 0 
                ? articles.map(a => {
                    return <div key={a.id} className={styles.articleCard}>
                        <h2>{a.title}</h2>
                        <p>{a.text}</p>
                        <div className={styles.time}>{a.time.substring(0,10)}</div>
                        <a href={`articles/${a.id}`} id={styles.detailLink}>Detail</a>
                    </div>
                }) 
                : <h2>Not articles published</h2>}
            </div>
        </main>
    )
}

export default Articles;