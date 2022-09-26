import React from "react";

export function Bi(props: { i: string, noMargin?: boolean, size?: number }) {
    return <i className={"bi bi-" + props.i + (props.noMargin ? " -no-margin" : " bi--margin")} style={{
        fontSize: (props.size + "em") || "",
    }} ></ i>
}
