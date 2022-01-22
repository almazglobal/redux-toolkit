import React from 'react';

type TodoListItemType = {
    id: string
    text: string
    completed: boolean
    toggleCompletedTodo: (todoId: string) => void
    removeTodo: (todoId: string) => void
}
const TodoItem: React.FC<TodoListItemType> = ({
                                                  id,
                                                  text,
                                                  completed,
                                                  toggleCompletedTodo,
                                                  removeTodo
                                              }) => {
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