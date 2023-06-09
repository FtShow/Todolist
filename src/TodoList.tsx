import React, {ChangeEvent, FC, useCallback, useMemo} from "react";
// @ts-ignore
import autoAnimate from "@formkit/auto-animate";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

type TodoListPropsType = {

    todolistId: string
    removeTodolist: (v: string) => void
    title: string;
    tasks: TaskType[];
    removeTask: (todolistId: string, taskId: string) => void;
    changeFilter: (todolistId: string, nextFilter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    editTask: (todolistId: string, taskId: string, title: string) => void
    filter: FilterValuesType
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}
export type TaskType = {
    title: string;
    isDone: boolean;
    id: string;
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [])

    const editTaskHandler = (taskID: string, title: string) => {
        props.editTask(props.todolistId, taskID, title)
    }
    const updateTodolistTitleHandler = (updateTitle: string) => {
        props.updateTodolistTitle(props.todolistId, updateTitle)
    }
    //вывод каждой такси
    const tasksJSXElements: Array<JSX.Element> = useMemo( ()=>{
        return props.tasks?.map((elem: TaskType, index: number): JSX.Element => {
        const removeTask = () => props.removeTask(props.todolistId, elem.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {


            props.changeTaskStatus(props.todolistId, elem.id, e.currentTarget.checked)
        }

        const taskClass = elem.isDone ? "taskIsDone" : "task"
        return (

            <li key={index}>

                    <Checkbox
                           onChange={changeStatus}
                           checked={elem.isDone}/>
                    <EditableSpan className={taskClass} callback={(updateTitle) => {
                        editTaskHandler(elem.id, updateTitle)
                    }} oldTitle={elem.title}/>

                <IconButton onClick={removeTask}>
                    <DeleteIcon/>
                </IconButton>
            </li>)
    })}, [props.tasks])


//вывод тудулиста
    return (
        <div className="todolist">


            <h3><EditableSpan oldTitle={props.title} callback={(updateTitle) => {
                updateTodolistTitleHandler(updateTitle)
            }}/>
                {/*<button style={matherialUIstylesButton} onClick={() => props.removeTodolist(props.todolistId)}>X</button>*/}

                <IconButton onClick={() => props.removeTodolist(props.todolistId)}>
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

                <Button variant={props.filter === "all" ? 'outlined': "contained"} color="success"
                        onClick={() => props.changeFilter(props.todolistId, "all")}>All
                </Button>

                <Button variant={props.filter === "active" ? 'outlined': "contained"}  color="secondary"
                        onClick={() => props.changeFilter(props.todolistId, "active",)}>Active
                </Button>

                <Button variant={props.filter === "complete" ? 'outlined': "contained"}  color="error"
                        onClick={() => props.changeFilter(props.todolistId, "complete")}>Completed
                </Button>
            </div>
        </div>
    )
}
export default TodoList;