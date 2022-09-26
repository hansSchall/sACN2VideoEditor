import React, { useState } from "react";
import { Bi } from "../../bi";
import { Header } from "../global/header";

export function EditorSQL(props: {
    id: string,
}) {
    const [result, setResult] = useState<Record<string, string>[]>([]);
    const [colTitles, setColTitles] = useState<string[]>([]);
    const [sql, setSQL] = useState("");

    async function executeSQL(sql: string) {
        const raw = await ipc.invoke("run-sql", props.id, sql);
        const cols = new Set<string>();
        for (let i of raw) {
            for (let col in i) {
                cols.add(col);
            }
        }
        setColTitles([...cols.keys()]);
        setResult(raw);
    }

    return <>
        <Header title={"SQL-Editor"} />
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
                        setSQL(ev.target.value);
                    }}
                    onKeyDown={(ev) => {
                        if (ev.key == "Enter")
                            executeSQL(sql);
                    }} />
                <div className="g-item-line g-flex-line" style={{
                    justifyContent: "center"
                }}>
                    <div className="g-button" onClick={() => {
                        executeSQL(sql);
                    }}><Bi i="caret-right-fill" size={1.3} /> Run SQL</div>
                    <div className="g-button" onClick={() => {
                        executeSQL("SELECT * FROM sqlite_master where type='table'");
                    }}>Table List</div>
                </div>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            {colTitles.map(title => <th key={title}>{title}</th>)}
                        </tr>
                    </thead>
                    <tbody className="c-text">
                        {result.map((row, ind) => <tr key={ind}>{colTitles.map(col => <td key={col}>{row[col]}</td>)}</tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
