import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function ArticleDetail(){
    const { articleId } = useParams();
    const [ user, setUser ] = useOutletContext();
    const [ article, setArticle ] = useState(null);
    const [ msg, setMsg] = useState('Loading...');
}

export default ArticleDetail;