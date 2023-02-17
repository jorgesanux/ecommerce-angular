import { User } from "src/model/user.model";

export type UserCreateDTO = Omit<User, 'id'>
