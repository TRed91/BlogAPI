import App from './App';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Articles from './components/articles/articles';
import ArticleDetail from './components/articleDetail/articleDetails';

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            { index: true, element: <Articles/> },
            { path: 'login', element: <Login/>},
            { path: 'signup', element: <Signup/> },
            { path: 'articles/:articleId', element: <ArticleDetail />},
        ],
    },
];

export default routes