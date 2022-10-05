import { useEffect, useState } from "react";

export function useSQL(query: string, id: string, dependices: any[] = [], params: any[] = []) {
    useEffect(() => {
        runSQL(query, id, params).then(setValue);
    }, dependices);
    const [value, setValue] = useState<any[] | null>(null);
    return value;
}

export async function runSQL(sql: string, id: string, params: any[] = []): Promise<any[]> {
    return await ipc.invoke("run-sql", id, sql, params);
}
