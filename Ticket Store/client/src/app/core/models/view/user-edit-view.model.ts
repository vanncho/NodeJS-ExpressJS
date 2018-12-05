import { RoleViewModel } from './role-view.model';

export class UserEditViewModel {

    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        public roles: Array<RoleViewModel>
    ) {}
}
