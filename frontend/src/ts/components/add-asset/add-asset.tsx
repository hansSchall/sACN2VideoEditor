import React, { useState } from "react";
import { lang } from "../../lang/lang";
import { useInput } from "../common/hook.input";
import { Header } from "../global/header";

export function AddAsset(props: { server: string }) {
    const [uploading, setUploading] = useState(false);
    const [id, updateID, setID] = useInput("");
    const [label, updateLabel, setLabel] = useInput("");
    const [message, setMessage] = useState("");
    if (uploading)
        return <>
            <Header title={`sACN2Video Asset Editor`} />
            <div className={"main g-dialog"}>
                <div className="g-input-label">uploading ...</div>

            </div>
        </>
    else
        return <>
            <Header title={`sACN2Video Asset Editor`} />
            <div className={"main g-dialog"}>
                <form /* action="/api/v3/ext/add-asset" method="post" */ encType="multipart/form-data">
                    <div className="g-input-label">Datei</div>
                    <input className="g-input" type="file" name="file" required />
                    <div className="g-input-label">ID</div>
                    <input className="g-input" type="text" name="id" placeholder="..." value={id} onChange={updateID} required />
                    <div className="g-input-label">Label</div>
                    <input className="g-input" type="text" name="label" placeholder="..." value={label} onChange={updateLabel} required />
                </form>
                {message}
                <div className="g-dialog-button-footer">
                    <button className="g-button gt-bt-green" tabIndex={0} onClick={() => {
                        const files = document.querySelector<HTMLInputElement>('[name=file]')?.files
                        const formData = new FormData()
                        if (!(files?.[0] && id && label)) {
                            return; // do nothing
                        }
                        formData.append("file", files[0]);
                        formData.append("id", id);
                        formData.append("label", label);
                        const xhr = new XMLHttpRequest();
                        xhr.addEventListener("load", () => {
                            setUploading(false);
                            location.reload();
                        })
                        xhr.open("POST", `${props.server}api/v3/ext/add-asset`);
                        xhr.send(formData);
                        setUploading(true);
                    }}>Import</button>
                    <button className="g-button gt-bt-red" tabIndex={0} onClick={() => {
                        ipc.invoke("close-win");
                    }}>{lang.get("cancel")}</button>
                </div >
            </div>
        </>
}
