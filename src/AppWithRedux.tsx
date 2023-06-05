import React, {Reducer, useReducer, useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeFilterTodolistAC, combinedActionType,
    removeTodolistAC,
    todoListReducer,
    updateTodolistTitleAC
} from "./Reducers/todoListReducer";
import {
    addTaskAC, addTaskAC2,
    addTaskListForNewTodolistAC,
    changeTaskStatusAC,
    editTaskAC,
    removeTaskAC,
    tasksReducer
} from "./Reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/store";

export type FilterValuesType = "all" | "active" | "complete"
export type TasksType = {
    [key: string]: TaskType[]
}

export type todolistType = { id: string, title: string, filter: FilterValuesType }

export const AppWithRedux = () => {
    console.log("APP RENDER")


    const todolist = useSelector<AppRootStateType, todolistType[]>(state=>state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksType>(state=>state.tasks)
    const dispatch = useDispatch()

    console.log(dispatch)




    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    };
    const updateTodolistTitle = (todolistID: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistID, updateTitle))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        dispatch(addTaskAC(todolistId, newTask))

    }
    const editTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(editTaskAC(todolistId, taskId, title))
    }
    const changeFilter = (todolistId: string, nextFilter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(todolistId, nextFilter))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title, v1())
        dispatch(action)
    }

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid style={{padding: "20px"}} container>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist.map(el => {

                        let filtetedTask = tasks[el.id]

                        if (el.filter === "complete") {
                            filtetedTask = tasks[el.id].filter(el => el.isDone)
                        }
                        if (el.filter === "active") {
                            filtetedTask = tasks[el.id].filter(el => !el.isDone)
                        }

                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: "10px"}} elevation={7}>
                                    <TodoList
                                        todolistId={el.id}
                                        updateTodolistTitle={updateTodolistTitle}
                                        removeTodolist={removeTodolist}
                                        key={el.id}
                                        editTask={editTask}
                                        title={el.title}
                                        tasks={filtetedTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>

    );
}

