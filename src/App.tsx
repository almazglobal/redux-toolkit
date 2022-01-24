import React, {useEffect, useState} from 'react';
import './App.css';
import {InputForm} from "./components/InputForm";
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, fetchTodos, initialStateType, TodoType} from "./store/todoSlice";
import {RootState} from "./store";


function App() {
    const {status, error} = useSelector<RootState, initialStateType>(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <div className="App">
            <InputForm />
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}
            <TodoList />
        </div>
    );
}

export default App;
