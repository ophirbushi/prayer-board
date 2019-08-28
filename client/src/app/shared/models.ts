export interface Identifiable {
    _id: string;
}

export interface UserMetadata extends Identifiable {
    username: string;
}

export interface User extends UserMetadata {
    boards: Board[];
}

export interface Board extends Identifiable {
    name: string;
    adminUser: string;
    users: string[];
    prayerRequests: any[];
}