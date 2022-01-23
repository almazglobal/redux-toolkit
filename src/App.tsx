import React, {useState} from 'react';
import './App.css';
import {InputForm} from "./components/InputForm";
import {TodoList} from "./components/TodoList";
import {useDispatch} from "react-redux";
import {addTodo} from "./store/todoSlice";


function App() {

    return (
        <div className="App">
            <InputForm   />
            <TodoList />
        </div>
    );
}

export default App;
