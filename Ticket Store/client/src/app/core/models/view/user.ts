import { Role } from './role';
import { Deserializable } from '../deserialize';

export class User implements Deserializable {

    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    account_non_locked: number;
    role: Role;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.role = new Role().deserialize(input.role);
        return this;
    }
}
