import { Todo } from "./ToDo";

export class User {
    constructor(
      public readonly id: string,
      public readonly login: string,
      public readonly email: string,
      public readonly passwordHash: string,
      public readonly tasks: Todo[],
    ) {}
  }