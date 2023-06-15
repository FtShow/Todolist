import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";

export const ReduxStoryProviderDecorator = (storyFN: ()=>React.ReactNode) => {
    return <Provider store={store}>{storyFN()}</Provider>
};
