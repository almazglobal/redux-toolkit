import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
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

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function () {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()
        return data
    }
)
export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: init,
        status: null,
        error: null,
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
           const toggleTodo = state.todos.find(todo => todo.id === action.payload)
           if (toggleTodo)
           toggleTodo.completed = !toggleTodo.completed
       },
    },
    extraReducers: (builder) => {
        [fetchTodos.pending]: (state, action) => {},
        [fetchTodos.fulfilled]: () => {},
        [fetchTodos.rejected]: () => {},
        // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
        builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
            state.entities[payload.id] = payload
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            if (action.payload) {
                // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    },

})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions
export const todoReducer = todoSlice.reducer