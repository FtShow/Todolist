import {FilterValuesType, todolistType} from "../App";
import {v1} from "uuid";

export const todoListReducer = (state: todolistType[], action: combinedActionType): todolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [...state, {id: action.payload.todolistID, title: action.payload.title, filter: "all"}]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case "CHANGE-FILTER-TODOLIST": {
            return [
                ...state.map(el => el.id === action.payload.todolistID
                    ? {...el, filter: action.payload.nextFilter}
                    : el)
            ]

        }
        case "UPDATE-TITLE-TODOLIST": {
            return (state.map(el => el.id == action.payload.todolistID
                ? {...el, title: action.payload.updateTitle}
                : el))
        }
        default:
            return state

    }

}
type combinedActionType =
    addTodolistACType
    | removeTodolistACType
    | changeFilterTodolistType
    | updateTodolistTitleACType

export type addTodolistACType = ReturnType<typeof addTodolistAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeFilterTodolistType = ReturnType<typeof changeFilterTodolistAC>
type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>

export const addTodolistAC = (title: string, todolistID: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
            todolistID
        }
    } as const
}
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID
        }
    } as const
}
export const changeFilterTodolistAC = (todolistID: string, nextFilter: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        payload: {
            todolistID,
            nextFilter
        }
    } as const
}
export const updateTodolistTitleAC = (todolistID: string, updateTitle: string) => {
    return {
        type: "UPDATE-TITLE-TODOLIST",
        payload: {
            todolistID,
            updateTitle,
        }
    } as const
}