import { CliAdapter } from './adapters/cli';
import { AddTodo, DeleteTodo, GetAllTodos, UpdateTodo } from './core/usecases';
import { GetByIdTodo } from './core/usecases/GetByIdTodo';
import { JsonTodoRepository } from './infrastructure/JsonTodoRepository';

const todoRepository = new JsonTodoRepository("./todo.json");
const addTodo = new AddTodo(todoRepository);
const deleteTodo = new DeleteTodo(todoRepository);
const getAllTodos = new GetAllTodos(todoRepository);
const updateTodo = new UpdateTodo(todoRepository);
const getByIdTodo = new GetByIdTodo(todoRepository);

const cliAdapter = new CliAdapter(addTodo, deleteTodo, getAllTodos, updateTodo, getByIdTodo);

cliAdapter.run();