import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {TodoListOptional, data1, data2,} from "./TodoListOptional";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "complete"

function App() {
    const todoListTitle_1 = "What to learn";


    const tasks_1 = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ]
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] = useState(tasks_1);
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(elem => elem.id !== taskId))
    }
    const getTask = (taskList: Array<TaskType>, filter:FilterValuesType)=>{
        switch (filter){
            case 'active':
                return taskList.filter(elem => !elem.isDone)
            case 'complete':
                return taskList.filter(elem => elem.isDone)
            default:
                return taskList
        }
    }
    const filteredTask = getTask(tasks, filter)
    const changeFilter = (nextFilter:FilterValuesType) =>{
        setFilter(nextFilter)
    }

const addTask = (title:string) =>{
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
}
const changeTaskStatus = ( taskId: string, newIsDoneValue: boolean ) =>{
        setTasks(tasks.map(elem=>elem.id === taskId? {...elem, isDone: newIsDoneValue}: elem))
}
    return (

        <div className="App">

            <TodoList
                title={todoListTitle_1}
                tasks={filteredTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />


            {/*<TodoList
                title={todoListTitle_2}
                tasks={tasks_2}
            />
            <TodoListOptional
                title={data1.title}
                tasks={data1.tasks}
                students={data1.students}
            />
            <TodoListOptional
                title={data2.title}
                tasks={data2.tasks}
                students={data2.students}
            />*/}

        </div>
    );
}

export default App;
