import React, { useState } from "react";
import { lang } from "../../lang/lang";
import { Switch } from "../common/switch";

export function AddServer(props: { remote: boolean }) {
    const [autoPort, setautoPort] = useState(true);
    const portInputDisabled = autoPort && !props.remote;
    const [port, setPort] = useState(1);
    const [server, setServer] = useState("localhost");
    const [file, setFile] = useState("none");
    const [label, setLabel] = useState("");
    return <div className="main g-dialog">
        {/* <div className="g-dialog-h1">{lang.get("addServer")}</div> */}
        <div className="g-input-label">{lang.get("label")}</div>
        <input className="g-input" tabIndex={0} value={label} onChange={(ev) => {
            setLabel(ev.target.value);
        }}></input>

        {props.remote ? ( // remote
            <>
                <div className="g-input-label">{lang.get("server")}</div>
                <input className="g-input" tabIndex={0} value={server} onChange={(ev) => {
                    const rawVal = ev.target.value;
                    setServer(rawVal.replace(/(\/|:|\\)/g, ""))
                }} />
            </>
        ) : ( // local
            <>
                <div className="g-input-label">{lang.get("file")}</div>
                <button className="g-input" tabIndex={0} onClick={() => {
                    ipc.invoke("open-file", {

                    }).then(res => {
                        setFile(res.filePaths[0] || file)
                    })
                }}>{file}</button>
            </>
        )}

        <div className="g-input-label">Port</div>

        {props.remote ? null :
            <div className="g-inline">
                <Switch on={autoPort} native={{ onClick: () => setautoPort(!autoPort) }} />
                <div className="g-inline-label">{lang.get("autoAssignPort")}</div>
            </div>
        }
        {portInputDisabled ? null :
            <input
                className="g-input"
                tabIndex={0}
                value={isNaN(port) ? "" : port.toString()}
                onChange={(ev) => setPort((Math.max(parseInt(ev.target.value), 1)))}
            />
        }

        <div className="g-dialog-button-footer">
            <button className="g-button gt-bt-green" tabIndex={0} onClick={() => {
                if (props.remote) {
                    ipc.invoke("add-remote-server", {
                        label,
                        server,
                        port,
                    }).then(() => {
                        ipc.invoke("close-win");
                    })
                } else {
                    ipc.invoke("add-server", {
                        label,
                        file,
                        port: (autoPort ? "auto" : port),
                    }).then(() => {
                        ipc.invoke("close-win");
                    })
                }
            }}>{lang.get("add")}</button>
            <button className="g-button gt-bt-red" tabIndex={0} onClick={() => {
                ipc.invoke("close-win");
            }}>{lang.get("cancel")}</button>
        </div >
    </div >
}
