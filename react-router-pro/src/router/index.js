import { createBrowserRouter } from 'react-router-dom';
import Article from '../page/article';
import Login from '../page/login';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/article/:id',
        element: <Article />
    }
])

export default router