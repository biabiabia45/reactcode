import { useDispatch, useSelector } from 'react-redux';
import { addToNum, decrement, inscrement } from './store/modules/counterStore';

function App() {
  const { count } = useSelector(state => state.counter)

  const dispatch = useDispatch()
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(inscrement())}>+</button>
      <button onClick={() => dispatch(addToNum(20))}>到20</button>
      <button onClick={() => dispatch(addToNum(10))}>到10</button>
    </div>
  );
}

export default App;
