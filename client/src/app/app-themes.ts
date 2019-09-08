export interface Theme {
    color: string;
    name: string;
    bodyClass: string;
}

export const appThemes: Theme[] = [
    { color: '#009688', name: 'Teal light', bodyClass: '' },
    { color: '#2196f3', name: 'Blue dark', bodyClass: 'blue-dark-theme' }
];