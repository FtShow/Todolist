import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Provider} from "react-redux";
import {AppWithRedux} from "../AppWithRedux"
import {store} from "../Reducers/store";
import {ReduxStoryProviderDecorator} from "../Reducers/ReduxStoryProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
    title: "TODOLISTS/AppWithRedux",
    component: AppWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoryProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {

};
