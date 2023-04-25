import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "complete"
type TasksType = {
    [key: string]: TaskType[]
}
let todolistID1 = v1();
let todolistID2 = v1();

function App() {
    const todoListTitle_1 = "What to learn";

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    const tasks_1 = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
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
    // const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] = useState(tasks_1);


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(el =>
                el.id !== taskId)
        });
    };

    type todolistsType = { id: string, title: string, filter: FilterValuesType }


    // const filteredTask = getTask(tasks, filter)
    // const changeFilter = (nextFilter: FilterValuesType) => {
    //     setFilter(nextFilter)
    // }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }


    const changeFilter = (todolistId: string, nextFilter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: nextFilter} : el));
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ?
                {...el, isDone: newIsDoneValue} : el)
        })

    }
    const removeTodolist = (todolistID: string) =>{
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    return (

        <div className="App">
            {todolists.map(el => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "complete") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <TodoList
                        todolistId={el.id}
                        removeTodolist={removeTodolist}
                        key={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                    />

                )
            })}
        </div>
    );
}

export default App;
