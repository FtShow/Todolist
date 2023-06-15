import type {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions"
import React, {useState} from "react";
import {Task} from "../Components/Task";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: "TODOLISTS/Task",
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        taskID: "asdas",
        checked: false,
        title: "task",
        removeTask: action("remove"),
        changeStatus: action("change"),
        editTaskSpan: action("edit")
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {};
export const TaskNotDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        checked: false,
    }

};
export const TaskWithHook = () => {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    const [task, setTask] = useState({taskID: "asdas", checked: false, title: "task",})

    const changeTaksStatus = () =>{
        setTask({...task, checked: !task.checked})
    }
    const changeTaksTitle= (taskID: string, title: string) =>{
        setTask({...task, title: title})
    }

    return <Task taskID={"asdas"}
                 checked={task.checked}
                 title={task.title}
                 removeTask={action("remove")}
                 changeStatus={changeTaksStatus}
                 editTaskSpan={changeTaksTitle}/>

};
