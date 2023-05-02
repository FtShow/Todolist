import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from "react";
// @ts-ignore
import autoAnimate from "@formkit/auto-animate";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";

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
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const editTaskHandler = (taskID: string,title:string ) => {
        props.editTask(props.todolistId, taskID, title )
    }
    const updateTodolistTitleHandler = (updateTitle:string) =>{
        props.updateTodolistTitle(props.todolistId, updateTitle)

    }
    //вывод каждой такси
    const tasksJSXElements: Array<JSX.Element> = props.tasks?.map((elem: TaskType, index: number): JSX.Element => {
        const removeTask = () => props.removeTask(props.todolistId, elem.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

            props.changeTaskStatus(props.todolistId, elem.id, e.currentTarget.checked)
        }

        const taskClass = elem.isDone ? "taskIsDone" : "task"
        return (

            <li key={index}>
                <div>
                    <input type="checkbox"
                            onChange={changeStatus}
                            checked={elem.isDone}/>
                    <EditableSpan callback={(updateTitle)=>{editTaskHandler(elem.id, updateTitle)}} oldTitle={elem.title}/>
                </div>
                <button onClick={removeTask}>X</button>
            </li>)
    })


//вывод тудулиста
    return (
        <div className="todolist">


            <h3><EditableSpan oldTitle={props.title} callback={(updateTitle)=>{updateTodolistTitleHandler(updateTitle)}}/>
                <button onClick={() => props.removeTodolist(props.todolistId)}>X</button>
            </h3>
            <div>
                <AddItemForm callback={addTaskHandler}/>
            </div>
            <ul>
                {/*вывод массива тасок*/}
                {tasksJSXElements}
            </ul>
            <div className={"filterBtnWrapper"}>

                <button className={props.filter === "all" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter(props.todolistId, "all")}>All
                </button>

                <button className={props.filter === "active" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter(props.todolistId, "active",)}>Active
                </button>

                <button className={props.filter === "complete" ? "filterBtnActive" : "filterBtn"}
                        onClick={() => props.changeFilter(props.todolistId, "complete")}>Completed
                </button>
            </div>
        </div>
    )
}
export default TodoList;