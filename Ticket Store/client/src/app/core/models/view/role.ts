import { Deserializable } from '../deserialize';

export class Role implements Deserializable {

    id: number;
    role: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
