import React, { lazy, Suspense, useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Bi } from "./bi";
import { AddAsset } from "./components/add-asset/add-asset";
import { AddServer } from "./components/add-server/add-server";
import { Aside } from "./components/aside/aside";
import { EditorGUI } from "./components/editor-gui/editor-gui";
import { EditorSQL } from "./components/editor-sql/editor-sql";
import { Header } from "./components/global/header";
import { Home } from "./components/home/home";
import { lang } from "./lang/lang";
import { LoadBar } from "./loadBar";
import { SyncFromServer } from "./sync/fromServer";

require("./includeStyle");


window.addEventListener("load", () => {
    createRoot(document.getElementById("root") as HTMLElement).render(<StrictMode><App /></StrictMode>)
})

const appURL = new URL(location.href);
function flag(id: string) {
    return appURL.searchParams.get(id) || "";
}

const flags = {
    component: flag("app"),
    lang: flag("lang"),
    id: flag("id"),
    type: flag("type"),
    label: flag("label"),
    url: flag("url"),
    host: flag("host"),
}

function App() {
    const [language, setLanguage] = useState(flags.lang || "de");
    const [fullscreen, setFullscreenIndicator] = useState(false);

    useEffect(() => {
        document.addEventListener("fullscreenchange", (ev) => {
            if (document.fullscreenElement) {
                console.log("entering fullscreen");
                setFullscreenIndicator(true);
            } else {
                setFullscreenIndicator(false);
            }
        })
    }, []);

    if (language != lang.getPrefLang()) {
        lang.setPrefLang(language);
    }
    // let mainComponent: JSX.Element | string = `component '${appComponent}' not found`;
    // let title = "sACN2VideoEditor"



    // switch ("home" as string) {
    switch (flags.component) {
        case "":
        case null:
        case "home":
        case "overview":
        case "about:home":
            return <Home />
        case "s2v:add-server:local":
            return <>
                <Header title={lang.get("addServer")} />
                {/* <Aside items={[

                ]} /> */}
                <AddServer remote={false} />
            </>
        case "s2v:add-server:remote":
            return <>
                <Header title={lang.get("addRemoteServer")} />
                {/* <Aside items={[

                ]} /> */}
                <AddServer remote={true} />
            </>
        case "s2v:edit:sql":
            return <EditorSQL id={flags.id || "none"} host={flags.host || ""} label={flags.label || ""}></EditorSQL>
        case "s2v:edit:gui":
            return <EditorGUI id={flags.id || "none"} host={flags.host || ""} label={flags.label || ""}></EditorGUI>
        case "s2v:output":
            return <>
                <Header title={`sACN2Video Viewer ${flags.label}`} menuIcon={fullscreen ? "fullscreen-exit" : "fullscreen"} showOnHover={fullscreen} onMenu={() => {
                    if (document.fullscreenElement) {
                        // exitFullscreen is only available on the Document object.
                        document.exitFullscreen();
                    } else {
                        document.documentElement.requestFullscreen();
                    }
                }} />
                <div className={"main" + (fullscreen ? " -fullscreen" : "")} style={{
                    overflow: "hidden"
                }}>
                    <iframe className="iframe-fullscreen" src={flags.url || undefined}></iframe>
                    {/* {flags.url} */}
                </div>
            </>
        case "s2v:assets":
            return <AddAsset server={flags.url || ""} />;

        case "about:settings":
            return <>
                <Header title={"Einstellungen"} />
                <div className="main">
                </div>
            </>
    }
    return <>
        <Header title={"Error"} />
        {/* <Aside items={[

        ]} /> */}
        <div className="main">
            <div className="glob-error-msg">
                <Bi i="exclamation-triangle" />
                <span>
                    component '{flags.component}' not found<br />
                    Error: CLIENT.URL.QUERY.APP.NOT_FOUND.{flags.component}
                </span>
            </div>
        </div>
    </>
}
