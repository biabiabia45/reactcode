//项目的根组件，一切组件的根基。
//App->index.js->public/index.html(root)
import {useState} from 'react'
import './index.css'
import _ from 'lodash'
import { useRef } from 'react'
const count = 100

function getName(){
  return 'jack'
}

const list = [
  {id : 2000, name: '1111'},
  {id: 3000, name: '2222'},
  {id: 23232, name: '3290'}
]

const login = true

const articleType = 3 // 0 1 3 ,代表无图模式 单图模式、三图模式

//定义核心函数 根据文章类型返回不同的jsx模板 

function getArticleType(){
  if (articleType === 0){
    return <div> 我是无图文章 </div>
  }else if (articleType === 1){
    return <div> 我是单图文章 </div>
  }else{
    return <div> 我是三图文章 </div>
  }
}


// 定义组件
// function Button(){
//   return <button> click </button>
// }

const Button = () =>{
  return <button> click </button>
}

const tap =[
  {type: 'hot', text:'最热'},
  {type: 'time', text : '最新'}
]

function Son(props){ 
  return <div>this is a son</div>
}
function App() {
  // const handleClick = () =>{
  //   console.log("hello world")
  // }

  // 使用事件对象参数
  // const handleClick = (e) =>{
  //   console.log("hello world", e)
  // }

  // 使用自定义参数
  // const handleClick = (name) =>{
  //   console.log("hello world", name)
  // }

  // 使用自定义参数以及事件对象参数
  const handleClick = (name, e) =>{
    console.log("hello world", name, e)
  }

  // useState实现计数器自增
  // count就是状态变量，setCount就是修改状态变量的方法
  const [counts, setCounts] = useState(0)

  const handleAdd = () =>{
    setCounts(counts + 1) 
  }
  
  const[forms, setForm] = useState({ name : 'Jack'})

  const handleName = () =>{
    setForm({
      ...forms,
      name:'Mike'
    })
  }
  
  // tap切换功能
  const [type, setType] = useState('hot')
  const handleTabChange = (type) =>{
    console.log(type)
    setType(type)

    // if(type === 'hot'){
    //   setCommentList(_.orderBy(commentList, 'like', 'desc'))
    // }else{
    //   setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
    // }
  }


  // 声明react状态
  const [value, setValue] = useState('')


  // react中获取dom需要渲染完毕后dom生成之后才可用
  // dom可用时，ref.current来获取dom
  const inputRef = useRef(null)

  const showDom = () =>{
    console.dir(inputRef.current)
  }
  return (
    <div className="App">
      {/* 1.1.使用引号传递字符串 */}
      {'this is a message'}
      {/* 1.2.识别js变量 */}
      {count}
      {/* 1.3.1函数调用 */}
      {getName()}
      {/* 1.3.2方法调用 */}
      {new Date().getDate()}
      {/* 1.4.使用js对象 */}
      {/* if、switch、变量声明等属于语句，不能出现在{}中 */}
      <div style={{color : 'blue'}}> this is a div </div>

      {/* 1.5渲染列表 */}
      {/* 核心是map方法，return结构 */}
      {/* 需要加上独一无二的key值，字符串或者number值 通常会用id绑定 */}
      {/* react框架内部使用 提升更新性能的 */}
      <ul>
        {list.map(item => <li key = {item.id}>{item.name}</li>)}
      </ul>

      <ul>
        {tap.map(item => <li key = {item.type}>{item.text}</li>)}
      </ul>
      {/* 1.6条件渲染 */}
      {/* 逻辑与&& */}
      {login && <span>true显示</span>}

      {/* 三元运算符 */}
      {login ? <span>login success</span> :  <span>this is false</span>}


      {/* 1.7实现复杂渲染 */}
      {getArticleType()}

      {/* 1.8绑定事件 */}
      {/* <button onClick = {handleClick}> example </button> */}
      {/* <button onClick = {handleClick}> example </button> */}
      {/* <button onClick = {(name) => handleClick('John')}> example </button> */}
      <button onClick = {(e) => handleClick('John', e)}> example </button>

      {/* 自闭和方式渲染 */}
      <Button />

      {/* 成对标签渲染 */}
      <Button></Button>

      {/* useState 自增函数*/}
      <button onClick = {handleAdd}> {counts} </button>
      <button onClick = {handleName}> {forms.name} </button>

      {/* 通过class类名控制样式 */}
      <span className = "foo"> this is span </span>

      <input value ={value}
      onChange = {(e) => setValue(e.target.value)}
      type = "text" />

      <input type = "text" ref = {inputRef} />
      <button onClick = {showDom}>获取dom</button>
    </div>  
  );
}

export default App;
