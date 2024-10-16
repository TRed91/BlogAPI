import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ArticleButtons from "./articleButtons";
import ArticleEdit from "./articleEdit";

function ArticlesPage() {
    const [ user, setUser ] = useOutletContext();
    const [ toggle, forceRerender] = useState(false);
    const navigate = useNavigate();
    const [ articles, setArticles] = useState([]);
    const [ msg, setMsg] = useState('');
    const [ toggleEdit, setToggleEdit ] = useState(false);
    
    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_MYAPI_HOST}/authors/${user.id}/articles`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {setArticles(data.articles)})
            .catch(err => {
                navigate('/');
                console.error(err.message);
            })
        }
    }, [user, toggle]);

    const displayMessage = (msg) => {
       setMsg(msg);
    }

    return (
        <div className="articlesMain">
            <p className="resMsg">{msg}</p>
            <div>
                {user && articles.map(a => {
                    return (
                        <div key={articles.indexOf(a)} className="articleCard">
                            <h2>{!toggleEdit && a.title}</h2>
                            <p>{!toggleEdit && a.text}</p>
                            <p>{!toggleEdit && (a.time ? 'Published at: ' + a.time : 'not published')}</p>
                            {toggleEdit && <ArticleEdit userId={user.id} 
                                                        article={a} 
                                                        toggleEdit={() => setToggleEdit(false)}
                                                        message={displayMessage}
                                                        rerender={() => forceRerender(!toggle)}/>}
                            <ArticleButtons userId={user.id} 
                                            articleId={a.id} 
                                            published={a.published} 
                                            message={displayMessage}
                                            edit={toggleEdit}
                                            rerender={() => forceRerender(!toggle)}
                                            toggleEdit={() => setToggleEdit(!toggleEdit)}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ArticlesPage;