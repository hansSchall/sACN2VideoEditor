import React from "react";
import { Bi } from "../../bi";

export function Aside(props: {
    items: ({
        label: string,
        icon: string,
        active: boolean,
        onClick: VoidFunction,
    })[]
}) {
    return <div id="aside">
        {props.items.map(item => <div key={item.label} className={"g-button" + (item.active ? " active" : "")} title={item.label} onClick={item.onClick}><Bi i={item.icon} /></div>)}
        {/* <div className="g-button"><Bi i="display" /></div>
        <div className="g-button"><Bi i="pencil" /></div>
        <div className="g-button"><Bi i="clipboard" /></div>
        <div className="g-button"><Bi i="image" /></div> */}
    </div>
}
