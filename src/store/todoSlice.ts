import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4} from "uuid";

export type TodoType = {
    id: string
    text: string
    completed: boolean
}

const init: TodoType[] = [
    {
        id: v4(),
        text: 'CSS',
        completed: false,
    },
    {
        id: v4(),
        text: 'React',
        completed: true,
    },
    {
        id: v4(),
        text: 'JS',
        completed: false,
    },
]

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: init,
    },
    reducers: {
       addTodo(state, action: PayloadAction<string>) {
           state.todos.unshift({
               id: v4(),
               text: action.payload,
               completed: false,
           })
       },
       removeTodo(state, action: PayloadAction<string>) {
           state.todos = state.todos.filter(todo => todo.id !== action.payload)
       },
       toggleTodoComplete(state, action: PayloadAction<string>) {
           state.todos.map(todo => todo.id === action.payload ? {...todo, completed: todo.completed} : todo)
       },
    },

})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions
export const todoReducer = todoSlice.reducer