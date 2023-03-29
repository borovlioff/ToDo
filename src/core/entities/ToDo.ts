export type TodoId = string;

export class Todo {
    constructor(
        public readonly id: TodoId,
        public readonly title: string,
        public readonly completed: boolean
          ) {}
  }

  
export interface NewTodo {
    title: string;
    completed: boolean;
  }