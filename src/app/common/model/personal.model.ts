export class MyModel {
  value: Date;
}

export class User {
  email?: any; // 可改
  gender?: any; // 可改
  address?: any; // 可改
  birthday?: any; // 可改
  telNumber?: any; // 可改
  deptName?: any;
  dutyName?: any;
  organizationName?: any;
  realName?: any;
  remark?: any;
}

export class UpdateUser {
  constructor(
    public email?: any, // 可改
    public gender?: any, // 可改
    public address?: any, // 可改
    public birthday?: any, // 可改
    public telNumber?: any, // 可改
    public id?: any,
    public remark?: any,
  ) {}
}
export class UpdatePassword {
  constructor(
    public oldPassword?: any,
    public newPassword?: any,
    public userName?: any,
  ) {}
}


