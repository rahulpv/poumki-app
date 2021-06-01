export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
}
export interface UserResponse {
    status: string;
    data: User;
    message: string;
}
export interface Users {
    status: string;
    data: {
        limit: string
        page: string
        pages: string
        total: string,
        users:[User]
    };
    message: string;
}
