import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export type FilterValuesType = "all" | "active" | "complete"
type TasksType = {
    [key: string]: TaskType[]
}
let todolistID1 = v1();
let todolistID2 = v1();

function App() {
    const todoListTitle_1 = "What to learn";

    type todolistsType = { id: string, title: string, filter: FilterValuesType }

    let [todolist, setTodolist] = useState<Array<todolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

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

    const [tasks, setTasks] = useState(tasks_1);


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks(
            {...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)}
        )
    };
    const updateTodolistTitle = (todolistID: string, updateTitle: string) => {
        setTodolist(todolist.map(el => el.id == todolistID ? {...el, title: updateTitle} : el))
    }


    // const filteredTask = getTask(tasks, filter)
    // const changeFilter = (nextFilter: FilterValuesType) => {
    //     setFilter(nextFilter)
    // }
    console.log("121")
    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        })
    }
    const editTask = (todolistId: string, taskId: string, title: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ?
                {...el, title: title} : el)
        })
    }


    const changeFilter = (todolistId: string, nextFilter: FilterValuesType) => {
        setTodolist([
                ...todolist.map(el => el.id === todolistId ? {...el, filter: nextFilter} : el)
            ]
        )
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ?
                {...el, isDone: newIsDoneValue} : el)
        })

    }
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        const newTodolist: todolistsType = {id: newTodolistID, title: title, filter: "all"}
        setTodolist([...todolist, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }


    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid style={{padding: "20px"}} container>
                    <AddItemForm  callback={addTodolist} />
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
