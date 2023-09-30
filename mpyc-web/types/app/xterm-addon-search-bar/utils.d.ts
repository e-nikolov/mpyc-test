import { ITheme } from 'xterm';
export declare const ANSI_COLOR_THEME: ITheme;
export type ANSI_COLOR = keyof typeof ANSI_COLOR_THEME;
export interface AnsiColorMappingRule {
    pattern: string;
    color: string;
}
export declare const colorize: (text: string, rules?: AnsiColorMappingRule[]) => string | undefined;
