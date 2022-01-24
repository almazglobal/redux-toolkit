import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4} from "uuid";
import {RootState} from "./index";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

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
export const addNewTask = createAsyncThunk<void, string>(
    'todos/addNewTask',
    async function (title, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        userId: 1,
                        completed: false,
                    }),
                })
            if (!response.ok) throw new Error("Can't add new task. Error server")
            const data = await response.json()
            dispatch(addTodo(data))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk<void,
    string,
    {
        state: RootState,
        // rejectValue: Error,
    }>(
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
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue('Error')
            }

            // const isError = (candidate: any): candidate is Error => {
            //     return candidate.isFetchError === true;
            // }
            // if (isError(error)) {
            //     return rejectWithValue(error.message)
            // }

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
        addTodo(state, action: PayloadAction<TodoType>) {
            state.todos.unshift(action.payload)
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
        builder.addCase(addNewTask.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    },


})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions
export const todoReducer = todoSlice.reducer