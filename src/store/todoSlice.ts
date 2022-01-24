import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4} from "uuid";
import {RootState} from "./index";

export type TodoType = {
    id: string
    title: string
    completed: boolean
}

const init: TodoType[] = [
    {
        id: v4(),
        title: 'CSS',
        completed: false,
    },
    {
        id: v4(),
        title: 'React',
        completed: true,
    },
    {
        id: v4(),
        title: 'JS',
        completed: false,
    },
]

export type initialStateType = {
    todos: TodoType[]
    status: null | string
    error: any
}

const initialState: initialStateType = {
    todos: [],
    status: null as null | string,
    error: null as any,
}

export const toggleStatus = createAsyncThunk<any, any, { state: RootState }>(
    'todos/toggleStatus',
    async function (id: string, {rejectWithValue, dispatch, getState}) {
        const completed = getState().todos.todos.find(todo => id === todo.id)!.completed
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: !completed
                    })
                })
            if (!response.ok) throw new Error("Can't change status of task. Server error")
            dispatch(toggleTodoComplete(id))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id: string, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'DELETE'
                })
            if (!response.ok) throw new Error("Can't delete task. Server error")
            dispatch(removeTodo(id))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if (!response.ok) throw new Error('Server error')
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.unshift({
                id: v4(),
                title: action.payload,
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
        // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'resolved'
            state.todos = action.payload
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        builder.addCase(toggleStatus.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })

    },


})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions
export const todoReducer = todoSlice.reducer