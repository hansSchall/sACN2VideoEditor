import React from "react";
import { Bi } from "../../bi";
import { Header } from "../global/header";
import { EditMode, EGUIStdProps } from "./editor-gui";
import { useSQL } from "./sql";

export function ElementList(props: EGUIStdProps) {
    const elList = useSQL("SELECT * FROM els", props.serverID, []);
    return <>
        <Header title={props.pageTitle} menuIcon="list" onMenu={() => {
        }} />
        <div className="main g-list">
            <div className="g-list-header">Elemente</div>
            {
                elList ?
                    elList.map(item =>
                        <div className="g-list-item" tabIndex={0} key={item.id} onClick={() => {
                            props.setElement(item.id);
                            props.setEditMode(EditMode.VIEW);
                        }}>
                            <div className="g-item-header">{item.id}</div>
                            <div className="g-item-line c-text">
                                {item.type}
                            </div>
                        </div>)
                    :
                    "loading ..."
            }
            {
                elList?.length === 0 ? "keine Einträge" : null
            }
            <div className="g-bottomright-buttons">
                <button className="g-button" onClick={() => {
                    props.setEditMode(EditMode.INSERT);
                }}><Bi i="plus-lg" /></button>
            </div >
        </div >
    </>
}
