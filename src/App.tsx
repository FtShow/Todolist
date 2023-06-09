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
import {TodoListWithRedux} from "./TodoListWithRedux";

export type FilterValuesType = "all" | "active" | "complete"
export type TasksType = {
    [key: string]: TaskType[]
}
let todolistID1 = v1();
let todolistID2 = v1();
export type todolistType = { id: string, title: string, filter: FilterValuesType }

function App() {

    const tasks_1 = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS1", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],

        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ]
    }

    const [todolist, dispatchTodolist] = useReducer<Reducer<Array<todolistType>, combinedActionType>>(todoListReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchTask] = useReducer(tasksReducer, tasks_1);


    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTask(removeTaskAC(todolistId, taskId))
    };
    const updateTodolistTitle = (todolistID: string, updateTitle: string) => {
        dispatchTodolist(updateTodolistTitleAC(todolistID, updateTitle))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        dispatchTask(addTaskAC(todolistId, newTask))

    }
    const editTask = (todolistId: string, taskId: string, title: string) => {
        dispatchTask(editTaskAC(todolistId, taskId, title))
    }
    const changeFilter = (todolistId: string, nextFilter: FilterValuesType) => {
        dispatchTodolist(changeFilterTodolistAC(todolistId, nextFilter))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatchTask(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
    }
    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title, v1())
        dispatchTodolist(action)
        dispatchTask(action)
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

export default App;
