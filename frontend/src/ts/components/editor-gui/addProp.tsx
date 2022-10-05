import React from "react";
import { lang } from "../../lang/lang";
import { useInput } from "../common/hook.input";
import { Header } from "../global/header";
import { EditMode, EGUIStdProps } from "./editor-gui";
import { runSQL } from "./sql";

export function AddProp(props: EGUIStdProps) {
    const [i_id, i_on_id] = useInput("");
    return <>
        <Header title={props.pageTitle} menuIcon="chevron-left" onMenu={() => {
            props.setEditMode(EditMode.VIEW);
            props.setElement(null);
            props.setProp(null);
        }} />
        <div className="main g-list">
            <div className="g-list-header">Eigenschaft hinzufügen</div>
            <div className="g-input-label">ID</div>
            <input className="g-input" tabIndex={0} autoFocus={true} placeholder={"..."} value={i_id} onChange={i_on_id}></input>

            <div className="g-dialog-button-footer">
                <button className="g-button gt-bt-green" tabIndex={0} onClick={async () => {
                    await runSQL("INSERT INTO elProps (el, prop) VALUES (?,?)", props.serverID, [props.element, i_id]);
                    props.setEditMode(EditMode.VIEW);
                    props.setProp(i_id);
                }}>OK</button>
                <button className="g-button gt-bt-red" tabIndex={0} onClick={() => {
                    props.setEditMode(EditMode.VIEW);
                    props.setProp(null);
                }}>{lang.get("cancel")}</button>
            </div>
        </div >
    </>
}
