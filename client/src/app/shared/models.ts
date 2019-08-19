export interface Identifiable {
    _id: string;
}

export interface User extends Identifiable {
    username: string;
}

export interface Board extends Identifiable {
    name: string;
    adminUserId: string;
    userIds: string[];
}