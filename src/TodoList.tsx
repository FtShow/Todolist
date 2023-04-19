import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from "react";
// @ts-ignore
import autoAnimate from "@formkit/auto-animate";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: string) => void;
    changeFilter: (nextFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
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
    // const taskTitleInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler2 = () => {
    //     if (taskTitleInput.current) {
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = "";
    //     }
    // }
    const titleMaxLength = 25;
    const addTaskHandler = () => {
        const trimedTitle = title.trim()
        if(trimedTitle){
            props.addTask(trimedTitle)
        }
        else{
            setError(true)
        }

        setTitle("")
    }
    const censure = title.split(" ").reduce((acc: boolean, elem) => elem == "fuck" ? true : acc, false)

    const itTitleLengthToLong = title.length > titleMaxLength

    const isAddBtnDisabled: boolean = !title.length || itTitleLengthToLong
    const userMessage = error? <div style={{color: "red"}}>Title is required</div>: null

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
        const removeTask = () => props.removeTask(elem.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

            props.changeTaskStatus(elem.id, e.currentTarget.checked)
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
            <h3>{props.title}</h3>
            <div>
                <input className={ itTitleLengthToLong || error? 'inputError': undefined}
                       value={title}
                       onChange={setTitleHandler}
                       onKeyDown={onPressHandler}/>
                <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+</button>
                {/*<input value={title} onChange={setTitleHandler} onKeyDown={onPressHandler}/>*/}

                {/*</button>*/}
                {userMessage|| titleMaxLengthWarning}
                {censure && <div style={{color: "red"}}>itTitleCensure</div>}
            </div>
            <ul>
                {/*вывод массива тасок*/}
                {tasksJSXElements}
            </ul>
            <div className={"filterBtnWrapper"}>

                <button className={props.filter === "all" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter("all")}>All
                </button>

                <button className={props.filter === "active" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter("active")}>Active
                </button>

                <button className={props.filter === "complete" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter("complete")}>Completed
                </button>
            </div>
        </div>
    )
}
export default TodoList;