import React, { useEffect } from "react";
import { Bi } from "../../../bi";
import { lang } from "../../../lang/lang";
import { SyncFromServer } from "../../../sync/fromServer";

export function SACN2VideoServersOverview() {

    const list = SyncFromServer.useSyncedMapSync<string, {
        label: string,
        remote: boolean,
        server: string,
        port: number,
        file: string,
        url: string,
    }>("sacn2videoServerList");

    return <div className="main g-list">
        <div className="g-list-header">{lang.get("runningSACN2VideoServers")}</div>
        {[...list.entries()].map(([id, item]) => {
            return <div className="g-list-item" key={id}>
                <div className="g-item-header">{item.label}</div>
                <div className="g-item-line c-text">
                    Host: {item.server}:{item.port == -1 ? "unknown" : item.port}<br></br>
                    File: {item.file}<br />
                    URL: {item.url}<br />
                    ID: {id}
                </div>
                <div className="g-item-line g-flex-line">
                    <button className="g-button" onClick={() => {
                        ipc.invoke("open-window", "log:view", [["id", id], ["type", "sacn2video"]])
                    }}><Bi i="list-columns-reverse" /> {lang.get("logs")}</button>

                    <button className="g-button" onClick={() => {
                        ipc.invoke("open-window", "s2v:output", [["id", id], ["label", item.label], ["url", item.url]])
                    }}><Bi i="display" /> {lang.get("view")}</button>

                    <button className="g-button" onClick={() => {
                        ipc.invoke("open-window", "s2v:edit:gui", [["id", id], ["label", item.label]])
                    }}><Bi i="pencil" /> {lang.get("edit")}</button>

                    <button className="g-button" onClick={() => {
                        ipc.invoke("open-window", "s2v:edit:sql", [["id", id], ["label", item.label]])
                    }}><Bi i="search" /> {lang.get("editSql")}</button>

                    <button className="g-button" onClick={() => {
                        ipc.invoke("open-window", "s2v:assets", [["id", id], ["url", item.url]])
                    }}><Bi i="file-earmark-binary" /> {lang.get("manageAssets")}</button>

                    <button className="g-button" onClick={() => {
                        ipc.invoke("restartSacn2VideoServer", id)
                    }}><Bi i="arrow-clockwise" /> {lang.get("reload")}</button>

                    <button className="g-button" onClick={() => {
                        navigator.clipboard.writeText(item.url)
                    }}><Bi i="clipboard" /> {lang.get("copyURL")}</button>

                    {
                        item.remote ?
                            <button className="g-button" onClick={() => {
                                ipc.invoke("stopSacn2VideoServer", id)
                            }}><Bi i="trash-fill" /> {lang.get("Entfernen")}</button>
                            :
                            <button className="g-button" onClick={() => {
                                ipc.invoke("stopSacn2VideoServer", id)
                            }}><Bi i="stop-circle" /> {lang.get("stop")}</button>
                    }
                </div>
            </div >
        })}
        {/* <div className="g-list-item">
            <div className="g-item-header">right.s2v</div>
            <div className="g-item-line">
                Port: 81
            </div>
            <div className="g-item-line g-flex-line">
                <button className="g-button"><Bi i="list-columns-reverse" /> {lang.get("logs")}</div>
                <button className="g-button"><Bi i="display" /> {lang.get("view")}</div>
                <button className="g-button"><Bi i="pencil" /> {lang.get("edit")}</div>
                <button className="g-button"><Bi i="search" /> {lang.get("editSql")}</div>
                <button className="g-button"><Bi i="clipboard" /> {lang.get("copyURL")}</div>
                <button className="g-button"><Bi i="stop-circle" /> {lang.get("stop")}</div>
            </div>
        </div>
        <div className="g-list-item">
            <div className="g-item-header">left.s2v [remote]</div>
            <div className="g-item-line">
                10.101.111.2:82
            </div>
            <div className="g-item-line g-flex-line">
                <button className="g-button">Logs</div>
                <button className="g-button">View</div>
                <button className="g-button -disabled">Edit</div>
                <button className="g-button">Show URL</div>
                <button className="g-button -disabled">Stop</div>
            </div>
        </div>
        <div className="g-list-item">
            <div className="g-item-header">center.s2v</div>
            <div className="g-item-line">
                Port: 83
            </div>
            <div className="g-item-line g-flex-line">
                <button className="g-button">Logs</div>
                <button className="g-button">View</div>
                <button className="g-button">Edit</div>
                <button className="g-button">Show URL</div>
                <button className="g-button">Stop</div>
            </div>
        </div> */}
        <div className="g-bottomright-buttons">
            <button className="g-button" onClick={() => {
                ipc.invoke("open-window", "s2v:add-server:local")
            }}><Bi i="plus-lg" /></button>
            <button className="g-button" onClick={() => {
                ipc.invoke("open-window", "s2v:add-server:remote")
            }}><Bi i="hdd-network" /></button>
        </div >
    </div >
}
