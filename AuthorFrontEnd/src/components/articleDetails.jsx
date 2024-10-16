import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ArticleButtons from "./articleButtons";
import ArticleEdit from "./articleEdit";

function ArticleDetails () {
    const { articleId} = useParams();
    const [ user, setUser ] = useOutletContext();
    const [ article, setArticle] = useState(null);
    const [ toggleEdit, setToggleEdit ] = useState(false);
    const [ msg, setMsg] = useState('Loading...');
    const [ toggle, forceRerender] = useState(false);

    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/${user.id}/articles/${articleId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data.result !== 'error') {
                    setArticle(data.article);
                } else if (data.error === 'unauthorized') {
                    setMsg('Unauthorized');
                } else {
                    setMsg('Not found');
                }
            })
            .catch(err => console.error(err.message));
        }
    }, [user, toggle]);

    if (article) {
        return (
            <div className="detailsMain">
                {toggleEdit && <ArticleEdit userId={user.id} 
                                                            article={article} 
                                                            toggleEdit={() => setToggleEdit(false)}
                                                            message={(val) => setMsg(val)}
                                                            rerender={() => forceRerender(!toggle)}/>}
                                <ArticleButtons userId={user.id} 
                                                articleId={articleId} 
                                                published={article.published} 
                                                message={(val) => setMsg(val)}
                                                rerender={() => forceRerender(!toggle)}
                                                toggleEdit={() => setToggleEdit(!toggleEdit)}/>
                <h2>{article.title}</h2>
                <hr />
                <p>{article.text}</p>
                <div>
                    {article.published ? article.time : 'Not Published'}
                </div>
                <hr />
                <h3>Comments:</h3>
                <div>
                    {article.comments.map(c => {
                        <div>
                            <div>{c.text}</div>
                            <div>{c.time}</div>
                        </div>
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h2>{msg}</h2>
            </div>
        )
    }
    
}

export default ArticleDetails;