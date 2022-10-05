import React from "react";
import { lang } from "../../lang/lang";
import { Header } from "../global/header";
import { EGUIStdProps } from "./editor-gui";

export function ConfirmDelete(props: EGUIStdProps & {
    cancel: VoidFunction,
    delete: VoidFunction,
    label: string,
}) {
    return <>
        <Header title={props.pageTitle} menuIcon="chevron-left" onMenu={props.cancel} />
        <div className="main g-list">
            <div className="g-list-header">{props.label} wirklich löschen?</div>

            <div className="g-dialog-button-footer">
                <button className="g-button gt-bt-green" tabIndex={0} onClick={props.delete}>Löschen</button>
                <button className="g-button gt-bt-red" tabIndex={0} onClick={props.cancel}>{lang.get("cancel")}</button>
            </div>
        </div >
    </>
}
