import React, {ChangeEvent, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskPropsType = {
    taskID: string
    checked: boolean
    title: string
    removeTask: (taskID: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    editTaskSpan: (taskID: string, newTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = memo(({
                                                       taskID,
                                                       title,
                                                       checked,
                                                       removeTask,
                                                       changeStatus,
                                                       editTaskSpan
                                                   }) => {
    const onClickHandler = () => {
        removeTask(taskID)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(taskID, e.currentTarget.checked)
    }
    const onTItleChangeHandler = useCallback((newTitle: string) => {
        editTaskSpan(taskID, newTitle)
    }, [editTaskSpan, taskID])

    return (

        <li>
            <Checkbox
                onChange={onChangeHandler}
                checked={checked}/>
            <EditableSpan className={checked ? "taskIsDone" : "task"}
                          callback={onTItleChangeHandler}
                          oldTitle={title}/>

            <IconButton onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>

    );
})
