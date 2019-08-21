export interface Identifiable {
    _id: string;
}

export interface User extends Identifiable {
    username: string;
    boards: Board[];
}

export interface Board extends Identifiable {
    name: string;
    adminUser: string;
    users: string[];
    prayerRequests: any[];
}