import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const censure = title.split(" ").reduce((acc: boolean, elem) => elem == "fuck" ? true : acc, false)
    const titleMaxLength = 25;
    const itTitleLengthToLong = title.length > titleMaxLength

    const isAddBtnDisabled: boolean = !title.length || itTitleLengthToLong
    const userMessage = error ? <div style={{color: "red"}}>Title is required</div> : null

    const addTaskHandler = () => {
        const trimedTitle = title.trim()
        if (trimedTitle) {
            props.callback(trimedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const matherialUIstylesButton = {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
    }
    const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        !isAddBtnDisabled && event.key === "Enter" && addTaskHandler()
    }

    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        error && setError(false)
    }
    const titleMaxLengthWarning = itTitleLengthToLong
        ? <div style={{color: "red"}}>Title to long</div>
        : null
    return (
        <div>
            <TextField
                error={!!error}
                size='small'
                value={title}
                onChange={setTitleHandler}
                onKeyPress={onPressHandler}
                id="outlined-basic"
                label={isAddBtnDisabled ? "Title is required" : "Type out smth."}
                variant="outlined"
            />
            <Button variant="contained"
                    style={matherialUIstylesButton}
                    disabled={isAddBtnDisabled}
                    onClick={addTaskHandler}>+</Button>


        </div>
    );
};
