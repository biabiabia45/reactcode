import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: 'counter',
    // 初始化state
    initialState: {
        count: 0
    },
    // 修改state的操作
    reducers: {
        inscrement(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        },
        addToNum(state, action) {
            state.count = action.payload
        }
    }
})

const { inscrement, decrement, addToNum } = counterStore.actions

const reducer = counterStore.reducer

// 按需导出的方式导出actionCreater
export { inscrement, decrement, addToNum }
// 按默认导出的方式导出reducer
export default reducer