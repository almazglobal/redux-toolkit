import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4} from "uuid";
import {RootState} from "./index";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {normalize, schema} from "normalizr";

const baseUrl = 'http://localhost:3001/posts'

export type CommentType = {
    id: string
    author: {
        username: string
        name: string
    },
    comment: string
}

export type AuthorType = {
    username: string
    name: string
}

export type PostType = {
    id: string,
    author: AuthorType
    body: string
    comments: CommentType[]
}

const init: PostType[] = []

export type initialStateType = {
    posts: PostType[]
    status: null | string
    error: any
}

const initialState: initialStateType = {
    posts: [],
    status: null as null | string,
    error: null as any,
}
export const addNewTask = createAsyncThunk<void, string>(
    'posts/addNewTask',
    async function (title, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(baseUrl,
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
            dispatch(addPost(data))
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
    'posts/toggleStatus',
    async function (id: string, {rejectWithValue, dispatch, getState}) {


    }
)

export const deleteTodo = createAsyncThunk(
    'posts/deleteTodo',
    async function (id: string, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`${baseUrl}/${id}`,
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

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}?_limit=10`)
            if (!response.ok) throw new Error('Server error')
            const data = await response.json()

            // Define a users schema
            const user = new schema.Entity('user');

            // Define your comments schema
            const comment = new schema.Entity('comments', {
                author: user
            });

            // Define your article
            const posts = new schema.Entity('post', {
                author: user,
                comments: [comment]
            });

            const normalizedData = normalize(data, posts);
            debugger
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<PostType>) {
            state.posts.unshift(action.payload)
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter(posts => posts.id !== action.payload)
        },
        toggleTodoComplete(state, action: PayloadAction<string>) {
            // const toggleTodo = state.posts.find(posts => posts.id === action.payload)
            // if (toggleTodo)
            //     toggleTodo.completed = !toggleTodo.completed
        },
    },
    extraReducers: (builder) => {
        // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'resolved'
            state.posts = action.payload
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
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

export const {addPost, removeTodo, toggleTodoComplete} = postsSlice.actions
export const postsReducer = postsSlice.reducer