import App from "./App"
import ArticleForm from "./components/articleForm"
import Login from "./components/login";
import Signup from "./components/signup";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <ArticleForm /> },
            { path: "login", element: <Login />},
            { path: "signup", element: <Signup />},
        ]
    },
];

export default routes;