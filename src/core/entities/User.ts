import {  TodoId } from "./ToDo";

export type UserId = string;

export class User {
    constructor(
      public readonly id: UserId,
      public readonly authId: string,
      public readonly todos: TodoId[],
    ) {}
  }

export interface NewUser{
    authId:string,
    todos?:TodoId[]
} 