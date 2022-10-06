import React, { useEffect } from "react";
import { lang } from "../../lang/lang";
import { useInput } from "../common/hook.input";
import { Header } from "../global/header";
import { EditMode, EGUIStdProps } from "./editor-gui";
import { runSQL } from "./sql";

export function EditProp(props: EGUIStdProps) {
    const [i_value, i_on_value, i_set_value] = useInput("loading ...");
    const [i_typ, i_on_typ, i_set_typ] = useInput("loading ...");

    async function apply() {
        await runSQL("UPDATE elProps SET value = ?, valueType = ? WHERE el = ? AND prop = ?", props.serverID, [i_value, i_typ, props.element, props.prop]);
        props.setEditMode(EditMode.VIEW);
        props.setProp(null);
    }

    function cancel() {
        props.setEditMode(EditMode.VIEW);
        props.setProp(null);
    }

    useEffect(() => {
        runSQL("SELECT value,valueType FROM elProps WHERE el = ? AND prop = ?", props.serverID, [props.element, props.prop]).then((res) => {
            console.log(res);
            i_set_typ(res[0]?.valueType || "");
            i_set_value(res[0]?.value || "");
        })
    }, []);
    return <>
        <Header title={props.pageTitle} menuIcon="chevron-left" onMenu={cancel} />
        <div className="main g-list">
            <div className="g-list-header">Eigenschaft bearbeiten</div>
            <div className="g-input-label">Eigenschaft</div>
            <div className="g-input" tabIndex={-1}>{props.prop}</div>
            <div className="g-input-label">ValueType</div>
            <input className="g-input" tabIndex={0} autoFocus={true} placeholder={"..."} value={i_typ} onChange={i_on_typ}></input>
            <div className="g-input-label">Value</div>
            <input className="g-input" tabIndex={0} placeholder={"..."} value={i_value} onChange={i_on_value} onKeyDown={ev => {
                if (ev.key == "Enter")
                    apply();
            }}></input>

            <div className="g-dialog-button-footer">
                <button className="g-button gt-bt-green" tabIndex={0} onClick={apply}>OK</button>
                <button className="g-button gt-bt-red" tabIndex={0} onClick={cancel}>{lang.get("cancel")}</button>
                <button className="g-button gt-bt-red" tabIndex={0} onClick={() => {
                    props.setEditMode(EditMode.DELETE);
                }}>Löschen</button>
            </div>
        </div >
    </>
}
