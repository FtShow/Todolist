import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type AddItemFormPropsType = {
    callback: (newTitle: string)=>void
}
export const AddItemForm:React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const censure = title.split(" ").reduce((acc: boolean, elem) => elem == "fuck" ? true : acc, false)
    const titleMaxLength = 25;
    const itTitleLengthToLong = title.length > titleMaxLength

    const isAddBtnDisabled: boolean = !title.length || itTitleLengthToLong
    const userMessage = error ? <div style={{color: "red"}}>Title is required</div> : null

    const addTaskHandler = () => {
        const trimedTitle = title.trim()
        if (trimedTitle) {
            props.callback(trimedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        !isAddBtnDisabled && event.key === "Enter" && addTaskHandler()
    }

    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        error && setError(false)
    }
    const titleMaxLengthWarning = itTitleLengthToLong
        ? <div style={{color: "red"}}>Title to long</div>
        : null
    return (
        <div>
            <input className={itTitleLengthToLong || error ? "inputError" : undefined}
                   value={title}
                   onChange={setTitleHandler}
                   onKeyDown={onPressHandler}/>
            <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+</button>

            {userMessage || titleMaxLengthWarning}
            {censure && <div style={{color: "red"}}>itTitleCensure</div>}
        </div>
    );
};
