import {TasksType, todolistType} from "../App";
import {tasksReducer} from "./tasksReducer";
import {addTodolistAC, todoListReducer} from "./todoListReducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<todolistType> = [];

    const newTodolistID = v1()
    const newTodolist: todolistType = {id: newTodolistID, title: "title", filter: "all"}

    const action = addTodolistAC("gooo", v1());

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    console.log(keys)
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;


    expect(idFromTodolists).toBe(action.payload.todolistID);

     expect(idFromTasks).toBe(action.payload.todolistID);
});