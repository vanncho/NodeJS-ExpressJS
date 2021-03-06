import { Role } from './role.model';

export interface UserEditView {

    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: Role;
    roles: Role[];
}
