import App from "./App"
import ArticleForm from "./components/articleForm"




const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <ArticleForm /> },
            
        ]
    },
];

export default routes;