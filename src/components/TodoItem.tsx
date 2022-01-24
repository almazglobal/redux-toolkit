import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTodo, removeTodo, toggleStatus, toggleTodoComplete} from "../store/todoSlice";
import {RootState} from "../store";

type TodoListItemType = {
    title: string
    completed: boolean
    id: string
}
const TodoItem: React.FC<TodoListItemType> = ({title, completed, id}) => {

    const dispatch = useDispatch()
    const removeTodoHandle = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    const toggleCompletedTodoHandle = (todoId: string) => {
        dispatch(toggleStatus(todoId))
    }
    return (
        <>
            <li>
                <label>
                    <input type="checkbox"
                           checked={completed}
                           onChange={() => toggleCompletedTodoHandle(id)} />
                    <span>{title}</span>
                </label>

                <span className={'delete'} onClick={() => removeTodoHandle(id)}>&times;</span>

            </li>
        </>
    );
};

export default TodoItem;