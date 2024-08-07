import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToNum, decrement, inscrement } from './store/modules/counterStore';
import { fetchChannelList } from './store/modules/channelStore';
function App() {
  const { count } = useSelector(state => state.counter)

  const { channelList } = useSelector(state => state.channle)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(inscrement())}>+</button>
      <button onClick={() => dispatch(addToNum(20))}>到20</button>
      <button onClick={() => dispatch(addToNum(10))}>到10</button>
      <ul>
        {channelList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
