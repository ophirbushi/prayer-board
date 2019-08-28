export type Reference<T> = string | T;

export interface Identifiable {
    _id: string;
}

export interface UserMetadata extends Identifiable {
    username: string;
    mailbox: UserMailbox;
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

export interface UserMailbox extends Identifiable {
    user: User;
    userNotifications: UserNotification[];
    unreadNotificationsCount: number;
}

export interface UserNotification {
    text: string;
    user: User;
}