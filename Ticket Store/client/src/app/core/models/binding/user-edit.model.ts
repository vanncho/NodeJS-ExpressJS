export class UserEditModel {

    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        public accountLocked: boolean
    ) {}
}
