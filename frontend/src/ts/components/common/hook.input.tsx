import { useState } from "react";

export function useInput(defaultValue: string): [string, (ev: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string>>] {
    const [value, setValue] = useState(defaultValue);
    return [value, (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    }, setValue];
}
