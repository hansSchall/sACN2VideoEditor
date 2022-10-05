import React from "react";
import { Bi } from "../../bi";

export function Header(props: {
    title: string,
    menuIcon?: string,
    menuActive?: boolean,
    onMenu?: VoidFunction,
    showOnHover?: boolean,
}) {
    if (document.title != props.title) {
        document.title = props.title
    }
    return <header className={"win-header" + (props.showOnHover ? " -hoverOnly" : "")}>
        <div className={"header-fraction -button" + (props.menuActive ? " -active" : "")} onClick={props.onMenu}><Bi i={props.menuIcon || "list"} /></div>
        <div className="header-fraction -title">{props.title}</div>
        <div className="header-fraction -button"></div>
    </header>
}
