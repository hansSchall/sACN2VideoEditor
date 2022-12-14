import React from "react";

export function Switch(props: { native: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, on: boolean, disabled?: boolean }) {
    return <div className={"g-switch" + (props.on ? " -on" : " -off") + (props.disabled ? " -disabled" : "")} {...props.native}></div>
}
