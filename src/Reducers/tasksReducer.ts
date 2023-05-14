import {TasksType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: combinedActionTaskType): TasksType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.newTask]
            }
        }
        case "EDIT-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                    {...el, title: action.payload.title} : el)
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                    {...el, isDone: action.payload.newIsDoneValue} : el)
            }
        }
        case "ADD-NEW-TASK-LIST": {
            return {...state, [v1()]: []}
        }
        default:
            return state
    }
}

type combinedActionTaskType =
    addTaskACType
    | editTaskACType
    | changeTaskStatusACType
    | addTaskListForNewTodolistACType
    | removeTaskACType

type addTaskACType = ReturnType<typeof addTaskAC>
type editTaskACType = ReturnType<typeof editTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type addTaskListForNewTodolistACType = ReturnType<typeof addTaskListForNewTodolistAC>

export const addTaskAC = (todolistId: string, newTask: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            newTask
        }
    } as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
}
export const editTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "EDIT-TASK",
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newIsDoneValue
        }
    } as const
}
export const addTaskListForNewTodolistAC = () => {
    return {
        type: "ADD-NEW-TASK-LIST"
    } as const
}