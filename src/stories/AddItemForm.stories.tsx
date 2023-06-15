import type {Meta, StoryObj} from "@storybook/react";


import Button from "@mui/material/Button";
import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions"
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: "TODOLISTS/AddItemForm",
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: "Button click",
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        callback: action("CLICK")
    }
};

export const AddItemFormErrorStory: Story = {

    render: function Render(args)  {
        const [title, setTitle] = useState<string>("Title is required")
        const [error, setError] = useState<boolean>(false)
        const censure = title.split(" ").reduce((acc: boolean, elem) => elem == "fuck" ? true : acc, false)
        const titleMaxLength = 25;
        const itTitleLengthToLong = title.length > titleMaxLength

        const isAddBtnDisabled: boolean = !title.length || itTitleLengthToLong
        const userMessage = error ? <div style={{color: "red"}}>Title is required</div> : null

        const addTaskHandler = () => {
            const trimedTitle = title.trim()
            if (trimedTitle) {
                args.callback(trimedTitle)
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
                    size="small"
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
        )
    }
}