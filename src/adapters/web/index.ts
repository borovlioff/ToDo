import { WebPort } from '../../ports/webPort';
import express from 'express';
import { AddTodo, DeleteTodo, GetAllTodos, UpdateTodo } from '../../core/usecases';
import { GetByIdTodo } from '../../core/usecases/GetByIdTodo';

export class WebAdapter implements WebPort {
  constructor(
    private readonly addTodo: AddTodo,
    private readonly deleteTodo: DeleteTodo,
    private readonly getAllTodos: GetAllTodos,
    private readonly updateTodo: UpdateTodo,
    private readonly getByIdTodo: GetByIdTodo
  ) { }

  start(): void {
    const app = express();

    // Обработка запросов и вызов соответствующих use case'ов

    app.use(express.json());

    app.get('/todos', async (req, res) => {
      try {
        const todos = await this.getAllTodos.execute();
        res.json(todos);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/todos/:id', async (req, res) => {
      try {
        const todos = await this.getByIdTodo.execute(req.params.id);
        res.json(todos);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    });

    app.post('/todos', async (req, res) => {
      try {
        const todo = await this.addTodo.execute(req.body);
        res.json(todo);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    });

    app.put('/todos/:id', async (req, res) => {
      try {
        const todo = await this.updateTodo.execute({ id: req.params.id, ...req.body });
        res.json(todo);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    });

    app.delete('/todos/:id', async (req, res) => {
      try {
        await this.deleteTodo.execute(req.params.id);
        res.sendStatus(204);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    });

    app.listen(3000, () => console.log('App listening on port 3000'));
  }
}
