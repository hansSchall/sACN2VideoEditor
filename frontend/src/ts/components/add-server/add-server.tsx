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
        <input className="g-input" value={label} onChange={(ev) => {
            setLabel(ev.target.value);
        }}></input>

        {props.remote ? ( // remote
            <>
                <div className="g-input-label">{lang.get("server")}</div>
                <input className="g-input" value={server} onChange={(ev) => {
                    const rawVal = ev.target.value;
                    setServer(rawVal.replace(/(\/|:|\\)/g, ""))
                }} />
            </>
        ) : ( // local
            <>
                <div className="g-input-label">{lang.get("file")}</div>
                <div className="g-input" onClick={() => {
                    ipc.invoke("open-file", {

                    }).then(res => {
                        setFile(res.filePaths[0] || file)
                    })
                }}>{file}</div>
            </>
        )}

        <div className="g-input-label">Port</div>

        {props.remote ? null :
            <div className="g-inline">
                <Switch on={autoPort} onClick={() => setautoPort(!autoPort)} />
                <div g-inline-label>{lang.get("autoAssignPort")}</div>
            </div>
        }
        {portInputDisabled ? null :
            <input
                className="g-input"
                value={isNaN(port) ? "" : port.toString()}
                onChange={(ev) => setPort((Math.max(parseInt(ev.target.value), 1)))}
            />
        }

        <div className="g-dialog-button-footer">
            <div className="g-button gt-bt-green" onClick={() => {
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
            }}>{lang.get("add")}</div>
            <div className="g-button gt-bt-red" onClick={() => {
                ipc.invoke("close-win");
            }}>{lang.get("cancel")}</div>
        </div>
    </div>
}
