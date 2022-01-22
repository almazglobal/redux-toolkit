import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TodoType} from "../App";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
       addTodo(state, action: PayloadAction<TodoType>) {},
       removeTodo(state, action: PayloadAction<string>) {},
       toggleTodoComplete(state, action: PayloadAction<string>) {},
    },

})