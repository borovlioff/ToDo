export class Todo {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly completed: boolean
          ) {}
  }

  
export interface NewTodo {
    title: string;
    completed: boolean;
  }