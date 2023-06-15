import type {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions"
import React, {ChangeEvent, useState} from "react";
import {Task} from "../Components/Task";
import {EditableSpan} from "../Components/EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: "TODOLISTS/EditableSpan",
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory =() => {
    const [title, setTitle] = useState( "asdas")
    const editSpanHandler = (u: string) =>{
        setTitle(u)
    }
return <EditableSpan oldTitle={title} callback={editSpanHandler}/>
};
// export const TaskNotDoneStory: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//
//
// };
// export const TaskWithHook = () => {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     const [task, setTask] = useState({taskID: "asdas", checked: false, title: "task",})
//
//     const changeTaksStatus = () =>{
//         setTask({...task, checked: !task.checked})
//     }
//     const changeTaksTitle= (taskID: string, title: string) =>{
//         setTask({...task, title: title})
//     }
//
//     return <Task taskID={"asdas"}
//                  checked={task.checked}
//                  title={task.title}
//                  removeTask={action("remove")}
//                  changeStatus={changeTaksStatus}
//                  editTaskSpan={changeTaksTitle}/>
//
// };
