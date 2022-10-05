import React from "react";
import { Header } from "../global/header";

export function AddAsset(props: { server: string }) {
    return <>
        <Header title={`sACN2Video Asset Editor`} />
        <div className={"main"} style={{
            overflow: "hidden"
        }}>
            <iframe className="iframe-fullscreen" src={props.server + "api/v3/ext/add-asset"}></iframe>
        </div>
    </>
}
