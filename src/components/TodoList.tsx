import React from 'react';
import TodoItem from "./TodoItem";
import {TodoType} from "../App";

type TodoListType = {
    todos: TodoType[]
    toggleCompletedTodo: (todoId: string) => void
    removeTodo: (todoId: string) => void
}
export const TodoList: React.FC<TodoListType> = ({
                                              todos,
                                              removeTodo,
                                              toggleCompletedTodo,
                                          }) => {
    return (
        <>
            <ul>
                {
                    todos.map(todo => {
                        return <TodoItem key={todo.id}
                                         id={todo.id}
                                         text={todo.text}
                                         completed={todo.completed}
                                         toggleCompletedTodo={toggleCompletedTodo}
                                         removeTodo={removeTodo} />
                    })
                }
            </ul>
        </>
    );
};
