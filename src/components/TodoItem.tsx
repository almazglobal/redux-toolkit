import React from 'react';
import {useDispatch} from "react-redux";
import {removeTodo, toggleTodoComplete} from "../store/todoSlice";

type TodoListItemType = {
    text: string
    completed: boolean
    id: string
}
const TodoItem: React.FC<TodoListItemType> = ({text, completed, id}) => {
    const dispatch = useDispatch()
    const removeTodoHandle = (todoId: string) => {
        dispatch(removeTodo(todoId))
    }

    const toggleCompletedTodoHandle = (todoId: string) => {
        dispatch(toggleTodoComplete(todoId))
    }
    return (
        <>
            <li>
                <label>
                    <input type="checkbox"
                           checked={completed}
                           onChange={() => toggleCompletedTodoHandle(id)} />
                    <span>{text}</span>
                </label>

                <span className={'delete'} onClick={() => removeTodoHandle(id)}>&times;</span>
            </li>
        </>
    );
};

export default TodoItem;