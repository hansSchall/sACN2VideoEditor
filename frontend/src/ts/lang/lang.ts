import { langDe } from "./de";
import { langEn } from "./en";

const langs = new Map<string, LangDef>([
    ["de", langDe],
    ["en", langEn],
]);

let prefLang: string = "de";

function getTransl(id: string, lang: string, ttl: number): string {
    const langDef = langs.get(lang);
    if (!langDef) {
        throw new Error(`language ${lang} does not exist`);
    }
    const translation = langDef.data.get(id);
    if (translation) {
        return translation;
    } else {
        if (ttl > 0) {
            return getTransl(id, langDef.defaultTo, ttl - 1);
        } else {
            console.warn(`lang chain of '${id}' too long`)
            return "{" + id + "}";
        }
    }
}

export namespace lang {
    export function get(id: string, lang: string = prefLang) {
        return getTransl(id, lang, langs.size * 2);
    }
    export function init(language: string) {
        return function (id: string) {
            lang.get(id, language);
        }
    }
    export function setPrefLang(lang: string) {
        if (langs.has(lang))
            prefLang = lang;
        else
            throw new Error(`language ${lang} does not exist`)
    }
    export function getPrefLang() {
        return prefLang;
    }
    export function getLangList() {
        return [...langs].map(([id, { label }]) => ({ id, label }));
    }
}
export type LangDef = {
    data: Map<string, string>,
    defaultTo: string,
    label: string,
};
