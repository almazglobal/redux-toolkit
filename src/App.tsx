import React, {useState} from 'react';
import './App.css';
import {InputForm} from "./components/InputForm";
import {TodoList} from "./components/TodoList";
import {useDispatch} from "react-redux";
import {addTodo} from "./store/todoSlice";


function App() {

    const [text, setText] = useState<string>('')
    const dispatch = useDispatch()
    const addTask = () => {
        dispatch(addTodo(text))
        setText('')
    }

    return (
        <div className="App">
            <InputForm
                text={text}
                setText={setText}
                handleSubmit={addTask}
            />
            <TodoList />
        </div>
    );
}

export default App;
