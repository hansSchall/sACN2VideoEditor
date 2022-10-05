import React from "react";
import { lang } from "../../lang/lang";
import { useInput } from "../common/hook.input";
import { Header } from "../global/header";
import { EditMode, EGUIStdProps } from "./editor-gui";
import { runSQL } from "./sql";

export function AddElement(props: EGUIStdProps) {
    const [i_id, i_on_id] = useInput("");
    const [i_typ, i_on_typ] = useInput("");
    return <>
        <Header title={props.pageTitle} menuIcon="chevron-left" onMenu={() => {
            props.setEditMode(EditMode.VIEW);
            props.setElement(null);
            props.setProp(null);
        }} />
        <div className="main g-list">
            <div className="g-list-header">Element hinzufügen</div>
            <div className="g-input-label">ID</div>
            <input className="g-input" tabIndex={0} autoFocus={true} placeholder={"..."} value={i_id} onChange={i_on_id}></input>
            <div className="g-input-label">Typ</div>
            <input className="g-input" tabIndex={0} placeholder={"..."} value={i_typ} onChange={i_on_typ}></input>

            <div className="g-dialog-button-footer">
                <button className="g-button gt-bt-green" tabIndex={0} onClick={async () => {
                    await runSQL("INSERT INTO els (id, type) VALUES (?,?)", props.serverID, [i_id, i_typ]);
                    props.setEditMode(EditMode.VIEW);
                    props.setElement(i_id);
                    props.setProp(null);
                }}>OK</button>
                <button className="g-button gt-bt-red" tabIndex={0} onClick={() => {
                    props.setEditMode(EditMode.VIEW);
                    props.setElement(null);
                    props.setProp(null);
                }}>{lang.get("cancel")}</button>
            </div>
        </div >
    </>
}
