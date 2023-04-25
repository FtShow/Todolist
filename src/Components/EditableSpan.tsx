import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    oldTitle: string,
    callback: (updateTitle: string) => void
    className?: string
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState<boolean>(false)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.callback(updateTitle)
    }
    const editHandler = () => {
        setEdit(!edit)
        edit && addTask()
    }

    return (
        edit
            ? <input onBlur={editHandler} onChange={changeHandler} autoFocus value={updateTitle}/>
            : <span className={props.className} onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};
