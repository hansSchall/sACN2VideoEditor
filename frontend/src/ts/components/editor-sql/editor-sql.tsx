import React, { useState } from "react";
import { Bi } from "../../bi";
import { Header } from "../global/header";

export function EditorSQL(props: {
    id: string,
    host: string,
    label: string,
}) {
    const [result, setResult] = useState<Record<string, string>[]>([]);
    const [colTitles, setColTitles] = useState<string[]>([]);
    const [sql, setSQL] = useState("");
    const [error, setError] = useState("");
    const [statusText, setStatusText] = useState("bearbeiten ...");

    async function executeSQL(sql: string, user: boolean) {
        setError("");
        setStatusText("wird ausgeführt ...");
        const raw = await ipc.invoke("run-sql", props.id, sql).catch(err => {
            setError("Error: " + err);
            setColTitles([]);
            setResult([]);
            setStatusText(err);
        })



        const cols = new Set<string>();
        for (let i of raw) {
            for (let col in i) {
                cols.add(col);
            }
        }
        setColTitles([...cols.keys()]);
        setResult(raw);
        if (user)
            setStatusText("Query result: (" + raw.length + " lines)")
        else
            setStatusText("Tabellen:")
    }

    return <>
        <Header title={"SQL-Editor " + props.label} />
        <div className="main g-list">
            <div className="g-list-item">
                <input
                    className="g-input"
                    style={{
                        backgroundColor: "#222"
                    }}
                    value={sql}
                    placeholder="Enter SQL query"
                    onChange={(ev) => {
                        setStatusText("bearbeiten ...")
                        setSQL(ev.target.value);
                    }}
                    onKeyDown={(ev) => {
                        if (ev.key == "Enter")
                            executeSQL(sql, true);
                    }} />
                <div className="g-item-line g-flex-line" style={{
                    justifyContent: "center"
                }}>
                    <button className="g-button" onClick={() => {
                        executeSQL(sql, true);
                    }}><Bi i="caret-right-fill" size={1.3} /> Run SQL</button>
                    <button className="g-button" onClick={() => {
                        executeSQL("SELECT * FROM sqlite_master where type='table'", false);
                    }}>Table List</button>
                </div>
                <div className="g-item-line g-flex-line" style={{
                    justifyContent: "center"
                }}>
                    {statusText}
                </div>
            </div>

            <div>
                {error}
                <table>
                    <thead>
                        <tr>
                            {colTitles.map(title => <th key={title}>{title}</th>)}
                        </tr>
                    </thead>
                    <tbody className="c-text">
                        {result.map((row, ind) => <tr key={ind}>{colTitles.map(col => <td key={col}>{row[col]}</td>)}</tr>)}
                        {result.length === 0 ? "no result" : null}
                    </tbody>
                </table>
            </div>
        </div >
    </>
}
