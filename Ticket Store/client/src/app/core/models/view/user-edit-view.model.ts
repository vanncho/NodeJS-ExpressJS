import { Role } from './role';
import { Deserializable } from '../deserialize';

export class UserEditViewModel implements Deserializable {

    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: Role;
    roles: Array<Role>;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.role = new Role().deserialize(input.role);
        return this;
    }
}
