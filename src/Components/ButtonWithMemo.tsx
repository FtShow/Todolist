import React, {memo, useCallback} from "react";
import Button from "@mui/material/Button";
import {FilterValuesType} from "../App";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";


export type ButtonWithMemoType = {
    filter: FilterValuesType
    title: string
    variant: 'text' | 'outlined' | 'contained'
    color: OverridableStringUnion<
        "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
        ButtonPropsColorOverrides
    >
    callBack: (v: FilterValuesType) => void

}

export const ButtonWithMemo: React.FC<ButtonWithMemoType> = memo((props) => {


    const onClickHandler = useCallback(() => {
        props.callBack(props.filter)
    }, [props.filter])
    return (
        <Button variant={props.variant}
                color={props.color}
                onClick={onClickHandler}>{props.title}
        </Button>
    );
})
