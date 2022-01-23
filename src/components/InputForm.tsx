import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {addTodo} from "../store/todoSlice";


export const InputForm: React.FC = () => {

    const [text, setText] = useState<string>('')
    const dispatch = useDispatch()
    const addTask = () => {
        dispatch(addTodo(text))
        setText('')
    }

    const onTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return (
        <>
            <label>
                <input type="text"
                       value={text}
                       onChange={onTextHandler} />
                <button onClick={addTask}>Add Todo</button>
            </label>
        </>
    );
};
