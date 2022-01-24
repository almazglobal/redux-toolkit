import React from 'react';
import {useDispatch} from "react-redux";
import {AuthorType, CommentType, deleteTodo, toggleStatus} from "../store/postsSlice";

type PostItemType = {
    body: string
    comments: CommentType[]
    id: string
    author: AuthorType
}
export const PostItem: React.FC<PostItemType> = ({body, author, id}) => {

    const dispatch = useDispatch()
    const removeTodoHandle = (postsId: string) => {
        dispatch(deleteTodo(postsId))
    }

    const toggleCompletedTodoHandle = (postsId: string) => {
        dispatch(toggleStatus(postsId))
    }
    return (
        <>
            <li>
                <label>
                    {/*<input type="checkbox"*/}
                    {/*       checked={completed}*/}
                    {/*       onChange={() => toggleCompletedTodoHandle(id)} />*/}
                    <span>{body}</span>
                </label>

                <span className={'delete'} onClick={() => removeTodoHandle(id)}>&times;</span>

            </li>
        </>
    );
};
