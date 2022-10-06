import React, { useEffect, useState } from "react";
import { Bi } from "../../bi";
import { lang } from "../../lang/lang";
import { Header } from "../global/header";
import { AddElement } from "./addElement";
import { AddProp } from "./addProp";
import { ConfirmDelete } from "./confirmDelete";
import { EditProp } from "./editProp";
import { ElementDetails } from "./elementDetails";
import { ElementList } from "./elementList";
import { runSQL, useSQL } from "./sql";


export enum EditMode {
    VIEW,
    INSERT,
    EDIT,
    DELETE,
}

export type EGUIStdProps = {
    setEditMode: (mode: EditMode) => void,
    setElement: (el: string | null) => void,
    setProp: (el: string | null) => void,
    element: string | null,
    prop: string | null,
    serverID: string,
    pageTitle: string,
}

export function EditorGUI({ id: serverID, label: winLabel }: {
    id: string,
    host: string,
    label: string,
}) {
    let menuAction: VoidFunction = () => { };
    const [element, setElement] = useState<string | null>(null);
    const [prop, setProp] = useState<string | null>(null);


    // const elList = useSQL("SELECT * FROM els", serverID, [element]);
    // const propList = useSQL("SELECT * FROM elProps WHERE el = ?", serverID, [element, prop], [element]);

    const [editMode, setEditMode] = useState(EditMode.VIEW);

    const pageTitle = "sACN2Video Editor " + winLabel;

    const stdProps: EGUIStdProps = {
        setEditMode,
        setElement,
        setProp,
        pageTitle,
        serverID,
        prop,
        element,
    }

    if (element) {
        if (prop) {
            if (editMode == EditMode.DELETE) {
                // ########################## Prop DELETE ##########################
                return <ConfirmDelete {...stdProps} cancel={() => {
                    setEditMode(EditMode.VIEW);
                }} delete={async () => {
                    await runSQL("DELETE FROM elProps WHERE el = ? AND prop = ?", serverID, [element, prop]);
                    setEditMode(EditMode.VIEW);
                    setProp(null);
                }} label={"Eigenschaft '" + prop + "'"} />
            } else {
                // ########################## Prop Edit ##########################
                return <EditProp {...stdProps} />
            }
        } else {
            if (editMode == EditMode.INSERT) {
                // ########################## Add Prop ##########################
                return <AddProp {...stdProps} />
            } else if (editMode == EditMode.DELETE) {
                // ########################## Confirm Element Delete ##########################
                return <ConfirmDelete {...stdProps} cancel={() => {
                    setEditMode(EditMode.VIEW);
                }} delete={async () => {
                    await runSQL("DELETE FROM els WHERE id = ?", serverID, [element]);
                    await runSQL("DELETE FROM elProps WHERE el = ?", serverID, [element]);
                    setEditMode(EditMode.VIEW);
                    setElement(null);
                    setProp(null);
                }} label={"Element '" + element + "'"} />
            } else {
                // ########################## View element ##########################
                return <ElementDetails {...stdProps} />
            }
        }
    } else {
        if (editMode == EditMode.INSERT) {
            // ########################## Add Element ##########################
            return <AddElement {...stdProps} />
        } else {
            // ########################## Element List ##########################
            return <ElementList {...stdProps} />
            // return <>
            //     <Header title={"sACN2Video Editor " + winLabel} menuIcon="list" onMenu={() => {
            //     }} />
            //     <div className="main g-list">
            //         <div className="g-list-header">Elemente</div>
            //         {
            //             elList ?
            //                 elList.map(item =>
            //                     <div className="g-list-item" key={item.id}>
            //                         <div className="g-item-header">{item.id}</div>
            //                         <div className="g-item-line c-text">
            //                             {item.type}
            //                         </div>
            //                         <div className="g-item-line g-flex-line">
            //                             <button className="g-button" onClick={() => {
            //                                 setElement(item.id);
            //                                 setEditMode(EditMode.VIEW);
            //                             }}><Bi i="search" /> Details</button>

            //                             <button className="g-button -disabled" onClick={() => {
            //                             }}><Bi i="trash-fill" /> Löschen</button>
            //                         </div>
            //                     </div>)
            //                 :
            //                 "loading ..."
            //         }
            //         <div className="g-bottomright-buttons">
            //             <button className="g-button" onClick={() => {
            //                 setEditMode(EditMode.INSERT);
            //             }}><Bi i="plus-lg" /></button>
            //         </div >
            //     </div >
            // </>
        }
    }

    return <>
        <Header title={"sACN2Video Editor " + winLabel} menuIcon="chevron-left" onMenu={() => {
            setEditMode(EditMode.VIEW);
            setElement(null);
            setProp(null);
        }} />
        {/* {
            element
                ?
                (
                    prop ? (menuAction = () => {
                        setProp(null);
                    }, null)
                        :
                        (menuAction = () => {
                            setElement(null);
                        }, <div className="main g-list">
                                <div className="g-list-header">Details: Element {element}</div>
                                {JSON.stringify(propList)}
                                <div className="g-bottomright-buttons">
                                    <button className="g-button" onClick={() => {
                                    }}><Bi i="plus-lg" /></button>
                                    <button className="g-button" onClick={() => {
                                    }}><Bi i="trash" /></button>
                                </div>
                            </div >)

                )
                :
                <div className="main g-list">
                    <div className="g-list-header">Elemente</div>
                    {
                        elList ?
                            elList.map(item =>
                                <div className="g-list-item" key={item.id}>
                                    <div className="g-item-header">{item.id}</div>
                                    <div className="g-item-line c-text">
                                        {item.type}
                                    </div>
                                    <div className="g-item-line g-flex-line">
                                        <button className="g-button" onClick={() => {
                                            setElement(item.id);
                                        }}><Bi i="search" /> Details</button>

                                        <button className="g-button -disabled" onClick={() => {
                                        }}><Bi i="trash-fill" /> Löschen</button>
                                    </div>
                                </div >)
                            :
                            "loading ..."
                    }
                    <div className="g-bottomright-buttons">
                        <button className="g-button" onClick={() => {
                        }}><Bi i="plus-lg" /></button>
                    </div >
                </div >
        } */}
        <div className="main g-list">
            <div className="g-list-header">No content here</div>
        </div>
    </>
}
