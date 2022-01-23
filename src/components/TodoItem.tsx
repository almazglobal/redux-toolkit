import React from 'react';
import {useDispatch} from "react-redux";

type TodoListItemType = {
    text: string
    completed: boolean
    id: string
}
const TodoItem: React.FC<TodoListItemType> = ({text, completed, id}) => {
    const dispatch = useDispatch()
    const removeTodo = (todoId: string) => {
        dispatch(removeTodo(todoId))
    }

    const toggleCompletedTodo = (todoId: string) => {
        dispatch(toggleCompletedTodo(todoId))
    }
    return (
        <>
            <li>
                <input type="checkbox"
                       checked={completed}
                       onChange={() => toggleCompletedTodo(id)} />
                <span>{text}</span>
                <button className={'delete'} onClick={() => removeTodo(id)}>&times;</button>
            </li>
        </>
    );
};

export default TodoItem;