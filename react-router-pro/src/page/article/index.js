import { useParams, useSearchParams } from "react-router-dom"

const Article = () =>{
    // const [params] = useSearchParams()
    // const id = params.get('id')
    // const name = params.get(name)
    // const kook = params.get(kook)

    const param = useParams()
    const ids = param.id
    // return <div>article-{id}-{name}-{kook}</div>
    return <div>article{ids}</div>
}

export default Article