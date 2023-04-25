import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from "react";
// @ts-ignore
import autoAnimate from "@formkit/auto-animate";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todolistId: string
    title: string;
    removeTodolist: (todoliskId: string) => void
    tasks: TaskType[];
    removeTask: (todoliskId: string, taskId: string) => void;
    changeFilter: (todoliskId: string, nextFilter: FilterValuesType) => void
    addTask: (todoliskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    filter: FilterValuesType
}
export type TaskType = {
    title: string;
    isDone: boolean;
    id: string;
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    console.log("12")
    const titleMaxLength = 25;
    const addTaskHandler = () => {
        const trimedTitle = title.trim()
        if (trimedTitle) {
            props.addTask(props.todolistId,trimedTitle)
        } else {
            setError(true)
        }

        setTitle("")
    }
    const censure = title.split(" ").reduce((acc: boolean, elem) => elem == "fuck" ? true : acc, false)

    const itTitleLengthToLong = title.length > titleMaxLength

    const isAddBtnDisabled: boolean = !title.length || itTitleLengthToLong
    const userMessage = error ? <div style={{color: "red"}}>Title is required</div> : null

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
    //вывод каждой такси
    const tasksJSXElements: Array<JSX.Element> = props.tasks.map((elem: TaskType, index: number): JSX.Element => {
        const removeTask = () => props.removeTask(props.todolistId, elem.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

            props.changeTaskStatus(props.todolistId, elem.id, e.currentTarget.checked)
        }
        const taskClass = elem.isDone ? "taskIsDone" : "task"
        return (

            <li key={index}>
                <div><input type="checkbox"
                            onChange={changeStatus}
                            checked={elem.isDone}/>
                    <span className={taskClass}>{elem.title}</span>
                </div>
                <button onClick={removeTask}>X</button>
            </li>)
    })


//вывод тудулиста
    return (
        <div className="todolist">


            <h3>{props.title}<button onClick={()=>{props.removeTodolist(props.todolistId)}}>X</button></h3>
            <div>
                <input className={itTitleLengthToLong || error ? "inputError" : undefined}
                       value={title}
                       onChange={setTitleHandler}
                       onKeyDown={onPressHandler}/>
                <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+</button>

                {userMessage || titleMaxLengthWarning}
                {censure && <div style={{color: "red"}}>itTitleCensure</div>}
            </div>
            <ul>
                {/*вывод массива тасок*/}
                {tasksJSXElements}
            </ul>
            <div className={"filterBtnWrapper"}>

                <button className={props.filter === "all" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter(props.todolistId, "all" )}>All
                </button>

                <button className={props.filter === "active" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter(props.todolistId, "active", )}>Active
                </button>

                <button className={props.filter === "complete" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter(props.todolistId, "complete")}>Completed
                </button>
            </div>
        </div>
    )
}
export default TodoList;