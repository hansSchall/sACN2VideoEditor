import React from "react";
import { Bi } from "../../../bi";
import { lang } from "../../../lang/lang";

export function HMIpansOverview() {
    return <div className="main g-list">
        <div className="g-list-header">HMI-Panels</div>
        <div className="g-list-item">
            <div className="g-item-header">HMI A</div>
            <div className="g-item-line">

            </div>
            <div className="g-item-line g-flex-line">
                <div className="g-button"><Bi i="list-columns-reverse" /> {lang.get("logs")}</div>
                <div className="g-button"><Bi i="display" /> {lang.get("view")}</div>
                <div className="g-button"><Bi i="pencil" /> {lang.get("edit")}</div>
                <div className="g-button"><Bi i="search" /> {lang.get("editSql")}</div>
                <div className="g-button"><Bi i="clipboard" /> {lang.get("copyURL")}</div>
                <div className="g-button"><Bi i="stop-circle" /> {lang.get("stop")}</div>
            </div>
        </div>
        <div className="g-list-item">
            <div className="g-item-header">HMI B</div>
            <div className="g-item-line">
                10.101.111.2:82
            </div>
            <div className="g-item-line g-flex-line">
                <div className="g-button">Logs</div>
                <div className="g-button">View</div>
                <div className="g-button -disabled">Edit</div>
                <div className="g-button">Show URL</div>
                <div className="g-button -disabled">Stop</div>
            </div>
        </div>
        <div className="g-list-item">
            <div className="g-item-header">HMI C</div>
            <div className="g-item-line">
                Port: 83
            </div>
            <div className="g-item-line g-flex-line">
                <div className="g-button">Logs</div>
                <div className="g-button">View</div>
                <div className="g-button">Edit</div>
                <div className="g-button">Show URL</div>
                <div className="g-button">Stop</div>
            </div>
        </div>
        {/* <div className="g-bottomright-buttons">
            <div className="g-button"><Bi i="plus-lg" /></div>
            <div className="g-button"><Bi i="hdd-network" /></div>
        </div> */}
    </div>
}
