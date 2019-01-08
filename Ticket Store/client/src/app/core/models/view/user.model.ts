import { Role } from './role.model';

export interface User {

    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    account_non_locked: number;
    role: Role;
}
