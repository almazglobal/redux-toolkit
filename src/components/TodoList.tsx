import React from 'react';
import TodoItem from "./TodoItem";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {TodoType} from "../store/todoSlice";

export const TodoList: React.FC = () => {
    const todos = useSelector<RootState, TodoType[]>(state => state.todos.todos)
    return (

        <>
            <ul>
                {
                    todos.map(todo => {
                        return <TodoItem key={todo.id} {...todo} />
                    })
                }
            </ul>
        </>
    );
};
