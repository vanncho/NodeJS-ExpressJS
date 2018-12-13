export class UserEditModel {

    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public roleId: number,
        public roleName: string,
        public accountLocked: boolean
    ) {}
}
