export interface Theme {
    color: string;
    name: string;
    bodyClass: string;
}

export const appThemes: Theme[] = [
    { color: '#0097a7', name: 'Cyan light', bodyClass: '' },
    { color: '#00acc1', name: 'Blue dark', bodyClass: 'blue-dark-theme' },
    { color: '#009688', name: 'Teal light', bodyClass: 'teal-light-theme' }
];