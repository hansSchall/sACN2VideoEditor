import React from "react";
import { Bi } from "../../../bi";
import { lang } from "../../../lang/lang";

export function LogsOverview() {
    return <div className="main g-list">
        <div className="g-list-header">Logs</div>
        <div className="g-list-item">
            <div className="g-item-header">left.s2v</div>
            <div className="g-item-line">

            </div>
            <div className="g-item-line g-flex-line">
                <button className="g-button"><Bi i="eye" /> View</button>
                <button className="g-button"><Bi i="trash" /> Löschen</button>
            </div>
        </div >
        <div className="g-list-item">
            <div className="g-item-header">HMI B</div>
            <div className="g-item-line">
                10.101.111.2:82
            </div>
            <div className="g-item-line g-flex-line">
                <button className="g-button">Logs</button>
                <button className="g-button">View</button>
                <button className="g-button -disabled">Edit</button>
                <button className="g-button">Show URL</button>
                <button className="g-button -disabled">Stop</button>
            </div >
        </div >
        <div className="g-list-item">
            <div className="g-item-header">HMI C</div>
            <div className="g-item-line">
                Port: 83
            </div>
            <div className="g-item-line g-flex-line">
                <button className="g-button">Logs</button>
                <button className="g-button">View</button>
                <button className="g-button">Edit</button>
                <button className="g-button">Show URL</button>
                <button className="g-button">Stop</button>
            </div >
        </div >
        {/* <div className="g-bottomright-buttons">
            <button className="g-button"><Bi i="plus-lg" /></div>
            <button className="g-button"><Bi i="hdd-network" /></div>
        </div> */}
    </div >
}
