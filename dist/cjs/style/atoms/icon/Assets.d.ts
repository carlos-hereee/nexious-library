import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
interface KeyDefinition {
    [key: string]: IconDefinition;
}
export declare const svg: KeyDefinition;
export declare const getDefinition: (name: string) => IconDefinition;
export {};
