import { CliPort } from '../../ports/cliPort';
import { AddTodo, DeleteTodo, GetAllTodos, UpdateTodo } from '../../core/usecases';
import { Todo } from '../../core/entities';
import { GetByIdTodo } from '../../core/usecases/GetByIdTodo';

export class CliAdapter implements CliPort {
    constructor(private readonly addTodo: AddTodo,
        private readonly deleteTodo: DeleteTodo,
        private readonly getAllTodos: GetAllTodos,
        private readonly updateTodo: UpdateTodo,
        private readonly getByIdTodo: GetByIdTodo
    ) { }

    async run() {
        const command = process.argv[2];

        switch (command) {
            case 'add':
                const title = process.argv[3];
                await this.addTodo.execute({ title, completed: false });
                console.log(`Added new todo: ${title}`);
                break;

            case 'delete':
                const id = process.argv[3];
                await this.deleteTodo.execute(id);
                console.log(`Deleted todo with id: ${id}`);
                break;

            case 'list':
                const todos = await this.getAllTodos.execute();
                console.log('Todo List:');
                todos.forEach(todo => {
                    console.log(`${todo.id} - ${todo.title} [${todo.completed ? 'X' : ' '}]`);
                });
                break;

            case 'get':
                const findId = process.argv[3];
                const findTodo = await this.getByIdTodo.execute(findId);
                console.log(`Todo with id: ${findTodo.id} - ${findTodo.title} [${findTodo.completed ? 'X' : ' '}]`);
                break;

            case 'update':
                const idToUpdate = process.argv[3];
                const updatedTodo: Todo = {
                    id: idToUpdate,
                    title: process.argv[4],
                    completed: process.argv[5] === 'true',
                };
                await this.updateTodo.execute(updatedTodo);
                console.log(`Updated todo with id: ${idToUpdate}`);
                break;

            default:
                console.log('Invalid command');
                break;
        }

        process.exit(0);
    }
}