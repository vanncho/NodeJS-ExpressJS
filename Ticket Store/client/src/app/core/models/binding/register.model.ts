export class RegisterModel {

    constructor(
      public firstName: string,
      public lastName: string,
      public username: string,
      public email: string,
      public password: string,
      public confirmPassword?: string
    ) {}
  }

