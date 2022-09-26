import React, { useState } from "react";
import { Bi } from "../../bi";
import { lang } from "../../lang/lang";
import { Aside } from "../aside/aside";
import { Header } from "../global/header";
import { HMIpansOverview } from "./views/hmipanels";
import { LogsOverview } from "./views/logtargets";
import { SACN2VideoServersOverview } from "./views/overview";

export function Home() {
    const [view, setView] = useState("sacn2video")
    return <>
        <Header title={lang.get("overview")} />
        <Aside items={[
            {
                icon: "hdd",
                label: "sACN2Video servers",
                onClick: () => setView("sacn2video"),
                active: view == "sacn2video",
            },
            {
                icon: "layout-wtf",
                label: "HMI panels",
                onClick: () => setView("hmi"),
                active: view == "hmi",
            },
            {
                icon: "list-columns-reverse",
                label: "Logs",
                onClick: () => setView("logs"),
                active: view == "logs",
            },
            {
                icon: "gear-fill",
                label: "Settings",
                onClick: () => ipc.invoke("open-window", "about:settings"),
                active: view == "settings",
            },
            {
                icon: "door-open-fill",
                label: "Quit app",
                onClick: () => { },
                active: false,
            },
        ]} />

        {selectView(view)}
    </>
}

function selectView(view: string) {
    switch (view.toLowerCase()) {
        case "sacn2video":
            return <SACN2VideoServersOverview />
        case "hmi":
            return <HMIpansOverview />
        case "logs":
            return <LogsOverview />
        default:
            return <div className="main">
                <div className="glob-error-msg">
                    <Bi i="exclamation-triangle" />
                    <span>
                        {/* {`component 'home.${view}' not found`}<br /> */}
                        Error: CLIENT.VIEW_HOME.NOT_FOUND.{view}
                    </span>
                </div>
            </div>
    }
}
