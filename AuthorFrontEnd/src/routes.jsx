import App from "./App"
import ArticleForm from "./components/articleForm"
import Login from "./components/login";
import Signup from "./components/signup";
import Articles from "./components/articles";
import ArticleDetails from "./components/articleDetails";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <ArticleForm /> },
            { path: "login", element: <Login />},
            { path: "signup", element: <Signup />},
            { path: "articles", element: <Articles />},
            { path: "articles/:articleId", element: <ArticleDetails />},
        ],
    },
];

export default routes;