import App from './App';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Articles from './components/articles/articles';

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            { path: 'login', element: <Login/>},
            { path: 'signup', element: <Signup/> },
            { path: 'articles', element: <Articles/> }
        ],
    },
];

export default routes