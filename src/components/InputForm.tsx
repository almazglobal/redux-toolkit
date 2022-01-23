import React, {ChangeEvent} from 'react';

type InputFormType = {
    text: string
    setText: (text: string) => void
    handleSubmit: () => void
}

export const InputForm: React.FC<InputFormType> = ({text, setText, handleSubmit}) => {
    const onTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return (
        <>
            <label>
                <input type="text"
                       value={text}
                       onChange={onTextHandler} />
                <button onClick={handleSubmit}>Add Todo</button>
            </label>
        </>
    );
};
