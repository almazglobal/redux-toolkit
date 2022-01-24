import React, {useEffect} from 'react';
import './App.css';
import {InputForm} from "./components/InputForm";
import {PostList} from "./components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, initialStateType} from "./store/postsSlice";
import {RootState} from "./store";


function App() {
    const {status, error} = useSelector<RootState, initialStateType>(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return (
        <div className="App">
            <InputForm />
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}
            <PostList />
        </div>
    );
}

export default App;
