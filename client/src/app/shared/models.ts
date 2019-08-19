export interface Identifiable {
    _id: string;
}

export interface User extends Identifiable {
    username: string;
}