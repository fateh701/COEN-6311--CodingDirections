export interface singupModel{
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    password: string
}

export interface AuthResData{
    user_id?: string,
    email: string,
    first_name?: string,
    last_name?: string,
    username: string,
    token?: string,
    user_type?: string
}

export interface loginModel{
    email: string,
    password: string
}

export class User{
  constructor(
    public id: string | undefined,
    public email: string,
    public username: string,
    public first_name: string | undefined,
    public last_name: string | undefined,
    public token: string | undefined,
    public user_type: string | undefined
  ){}

}
