import React, {useCallback} from "react";
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
    changeFilterTodolistAC,
    removeTodolistAC,
    updateTodolistTitleAC
} from "./Reducers/todoListReducer";
import {addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC} from "./Reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./Reducers/store";
import {TodoListWithRedux} from "./TodoListWithRedux";

export type FilterValuesType = "all" | "active" | "complete"
export type TasksType = {
    [key: string]: TaskType[]
}

export type todolistType = { id: string, title: string, filter: FilterValuesType }

export const AppWithRedux = () => {


    const todolist = useSelector<AppRootStateType, todolistType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title, v1())
        dispatch(action)
    }, [])

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid style={{padding: "20px"}} container>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist.map(el => {

                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: "10px"}} elevation={7}>
                                    <TodoListWithRedux
                                        todolistId={el.id}
                                        key={el.id}
                                        title={el.title}
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

