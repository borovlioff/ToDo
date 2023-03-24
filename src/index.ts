// src/index.ts

import { CliAdapter } from './adapters/cli';
import { WebAdapter } from './adapters/web';
import { AddTodo, DeleteTodo, GetAllTodos, UpdateTodo } from './core/usecases';
import { TodoRepository } from './core/repositories';
import { JsonTodoRepository } from './infrastructure/JsonTodoRepository';
import { GetByIdTodo } from './core/usecases/GetByIdTodo';


const todoRepository: TodoRepository = new JsonTodoRepository("./todo.json");// инициализация репозитория

const addTodo = new AddTodo(todoRepository);
const deleteTodo = new DeleteTodo(todoRepository);
const getAllTodos = new GetAllTodos(todoRepository);
const updateTodo = new UpdateTodo(todoRepository);
const getByIdTodo = new GetByIdTodo(todoRepository);

const cliAdapter = new CliAdapter(addTodo, deleteTodo, getAllTodos, updateTodo,getByIdTodo);
const webAdapter = new WebAdapter(addTodo, deleteTodo, getAllTodos, updateTodo,getByIdTodo);

cliAdapter.run();
webAdapter.start();
