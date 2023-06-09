import React, {ChangeEvent, memo, useCallback, useState} from "react";

type EditableSpanPropsType = {
    oldTitle: string,
    callback: (updateTitle: string) => void
    className?: string
}
export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {


    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState<boolean>(false)

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }, [updateTitle])

    const addTask = useCallback(() => {
        props.callback(updateTitle)
    }, [updateTitle])

    const editHandler = useCallback(() => {
        setEdit(!edit)
        edit && addTask()
    }, [updateTitle, edit])

    return (
        edit
            ? <input onBlur={editHandler} onChange={changeHandler} autoFocus value={updateTitle}/>
            : <span className={props.className} onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
})
