import React, {ChangeEvent, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC} from "../Reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Reducers/store";
import {TasksType} from "../App";
import {TaskType} from "../TodoListWithRedux";

export type TaskPropsType = {
    taskID: string
    todolistID: string
}

export const TaskWithRedux: React.FC<TaskPropsType> = memo(({
                                                                taskID,
                                                                todolistID,
                                                            }) => {


    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID].reduce((acc, el) => el.id === taskID ? el : acc, {}) as TaskType)
    const dispatch = useDispatch()
    const removeTask = () => dispatch(removeTaskAC(todolistID, taskID))

    const changeStatus = () => {
        dispatch(changeTaskStatusAC(todolistID, taskID, !task.isDone))
    }
    const editTaskSpan = useCallback((newTitle: string) => {
        dispatch(editTaskAC(todolistID, taskID, newTitle))
    }, [todolistID])

    return (

        <li>
            <Checkbox
                onChange={changeStatus}
                checked={task.isDone}/>
            <EditableSpan className={task.isDone ? "taskIsDone" : "task"}
                          callback={editTaskSpan}
                          oldTitle={task.title}/>

            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>

    );
})
