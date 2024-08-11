import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            {/* 声明式写法 */}
            <Link to="/article" > 文章</Link>
            Login
            {/* 编程式导航 */}
            <button onClick={() => navigate('/article')}>登录1</button>
            <button onClick={() => navigate('/article?id=2121&name=kok&kook=coke')}>登录2</button>
            <button onClick={() => navigate('/article/3213')}>登录3</button>
        </div>
    )
}

export default Login