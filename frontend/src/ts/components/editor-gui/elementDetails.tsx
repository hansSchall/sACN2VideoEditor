import React from "react";
import { Bi } from "../../bi";
import { Header } from "../global/header";
import { EditMode, EGUIStdProps } from "./editor-gui";
import { useSQL } from "./sql";

export function ElementDetails(props: EGUIStdProps) {

    const propList = useSQL("SELECT * FROM elProps WHERE el = ?", props.serverID, [props.element], [props.element]);

    return <>
        <Header title={props.pageTitle} menuIcon="chevron-left" onMenu={() => {
            props.setEditMode(EditMode.VIEW);
            props.setElement(null);
            props.setProp(null);
        }} />
        <div className="main g-list">
            <div className="g-list-header">Details: Element {props.element}</div>
            {/* {JSON.stringify(propList)} */}
            {
                propList ?
                    propList.map(item =>
                        <div className="g-list-item" tabIndex={0} key={item.prop} onClick={() => {
                            props.setProp(item.prop);
                            props.setEditMode(EditMode.EDIT);
                        }}>
                            <div className="g-item-header">{item.prop}</div>
                            <div className="g-item-line c-text">
                                {item.valueType}:{item.value}
                            </div>
                        </div>
                    )
                    :
                    "loading ..."
            }
            {
                propList?.length === 0 ? "keine Einträge" : null
            }
            <div className="g-bottomright-buttons">
                <button className="g-button" onClick={() => {
                    props.setEditMode(EditMode.INSERT);
                    props.setProp(null);
                }}><Bi i="plus-lg" /></button>
                <button className="g-button" onClick={() => {
                    props.setEditMode(EditMode.DELETE);
                    props.setProp(null);
                }}><Bi i="trash" /></button>
            </div>
        </div >
    </>
}
