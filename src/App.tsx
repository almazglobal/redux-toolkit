import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {v4} from "uuid";
import {InputForm} from "./components/InputForm";
import {TodoList} from "./components/TodoList";

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


function App() {
    const [todos, setTodos] = useState<TodoType[]>(init)
    const [text, setText] = useState<string>('')

    const removeTodo = (todoId: string) => {
        setTodos(todos.filter(todo => todo.id !== todoId))
    }

    const addTodo = () => {
        setTodos([
            {
                id: v4(),
                text,
                completed: false,
            },
            ...todos,
        ])
        setText('')

    }

    const toggleCompletedTodo = (todoId: string) => {
        setTodos(todos.map(todo => todoId === todo.id
            ? {...todo, completed: !todo.completed}
            : {...todo}))
    }
    return (
        <div className="App">
            <InputForm
                text={text}
                addTodo={addTodo}
                setText={setText} />
            <TodoList todos={todos}
                      toggleCompletedTodo={toggleCompletedTodo}
                      removeTodo={removeTodo} />

        </div>
    );
}

export default App;
