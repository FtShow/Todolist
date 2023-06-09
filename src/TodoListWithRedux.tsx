import React, {ChangeEvent, FC, memo, useCallback, useMemo} from "react";
// @ts-ignore
import autoAnimate from "@formkit/auto-animate";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/store";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC} from "./Reducers/tasksReducer";
import {changeFilterTodolistAC, removeTodolistAC, updateTodolistTitleAC} from "./Reducers/todoListReducer";
import {Task} from "./Components/Task";
import {ButtonWithMemo} from "./Components/ButtonWithMemo";

type TodoListPropsType = {

    todolistId: string
    title: string;
    filter: FilterValuesType
}
export type TaskType = {
    title: string;
    isDone: boolean;
    id: string;
}

export const TodoListWithRedux: FC<TodoListPropsType> = memo((props) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTaskHandler = useCallback((title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        dispatch(addTaskAC(props.todolistId, newTask))
    }, [props.todolistId])

    const removeTask = (taskID: string) => dispatch(removeTaskAC(props.todolistId, taskID))

    const changeStatus = (taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistId, taskID, isDone))
    }
    const editTaskSpan = useCallback((taskID: string, updateTitle: string) => {
        dispatch(editTaskAC(props.todolistId, taskID, updateTitle))
    }, [props.todolistId])

    const editTodolistTitleHandler = (title: string) => {
        dispatch(updateTodolistTitleAC(props.todolistId, title))
    }


    //вывод каждой такси
    if (props.filter === "complete") {
        tasks = tasks.filter(el => el.isDone)
    }
    if (props.filter === "active") {
        tasks = tasks.filter(el => !el.isDone)
    }
    const tasksJSXElements: Array<JSX.Element> = useMemo(() => {
        return tasks.map((elem: TaskType, index: number): JSX.Element => {


            const taskClass = elem.isDone ? "taskIsDone" : "task"
            return (
                <Task
                    key={elem.id}
                    taskID={elem.id}
                    title={elem.title}
                    checked={elem.isDone}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                    editTaskSpan={editTaskSpan}
                />
            )
        })
    }, [tasks])


//вывод тудулиста

    const changeFilter = useCallback((newFilter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(props.todolistId, newFilter))
    }, [props.todolistId])

    return (
        <div className="todolist">


            <h3><EditableSpan oldTitle={props.title} callback={editTodolistTitleHandler}/>
                {/*<button style={matherialUIstylesButton} onClick={() => props.removeTodolist(props.todolistId)}>X</button>*/}

                <IconButton onClick={() => dispatch(removeTodolistAC(props.todolistId))}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm callback={addTaskHandler}/>
            </div>
            <ul>
                {/*вывод массива тасок*/}
                {tasksJSXElements}
            </ul>
            <div className={"filterBtnWrapper"}>
                <ButtonWithMemo
                    filter={"all"}
                    variant={props.filter === "all" ? "outlined" : "contained"}
                    title={"ALL"} color={"success"}
                    callBack={changeFilter}/>

                <ButtonWithMemo
                    filter={"active"}
                    variant={props.filter === "active" ? "outlined" : "contained"}
                    title={"ACTIVE"} color={"secondary"}
                    callBack={changeFilter}/>

                <ButtonWithMemo filter={"complete"}
                                variant={props.filter === "complete" ? "outlined" : "contained"}
                                title={"COMPLETE"} color={"error"}
                                callBack={changeFilter}/>


                {/*<Button variant={props.filter === "all" ? "outlined" : "contained"} color="success"*/}
                {/*        onClick={() => dispatch(changeFilterTodolistAC(props.todolistId, "all"))}>All*/}
                {/*</Button>*/}

                {/*<Button variant={props.filter === "active" ? "outlined" : "contained"} color="secondary"*/}
                {/*        onClick={() => dispatch(changeFilterTodolistAC(props.todolistId, "active"))}>Active*/}
                {/*</Button>*/}

                {/*<Button variant={props.filter === "complete" ? "outlined" : "contained"} color="error"*/}
                {/*        onClick={() => dispatch(changeFilterTodolistAC(props.todolistId, "complete"))}>Completed*/}
                {/*</Button>*/}
            </div>
        </div>
    )
})