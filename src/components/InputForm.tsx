import React, {ChangeEvent} from 'react';

type InputFormType = {
    text: string
    addTodo: () => void
    setText: (text: string) => void
}

export const InputForm: React.FC<InputFormType> = ({text, addTodo, setText}) => {
    const onTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return (
       <>
           <label>
               <input type="text"
                      value={text}
                      onChange={onTextHandler} />
               <button onClick={addTodo}>Add Todo</button>
           </label>
       </>
    );
};
