import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
  providers: [TodoService]
})
export class TodoAppComponent {
  newTodo = '';
  constructor(
    private todoService: TodoService
  ) { }

  /**
   * add todo
   */
  addTodo(): void {
    if (!this.newTodo) {
      return alert('What do you need to write?');
    }
    this.todoService.addTodo(new Todo({
      value: this.newTodo
    }));
    this.newTodo = '';
  }

  /**
   * destroy todo
   */
  destroyTodo(todo: Todo): void {
    this.todoService.deleteTodoById(todo.id);
  }

/**
   * destroy done todo
   */
  destroyAllTodo(): void {
    if (!this.clearCount) {
      return;
    }
    if (!confirm('Do you need to delete the selected one?')) {
      return;
    }
    this.todoService.deleteAllTodos();
  }

  /**
   * toggle todo done
   */
  toggleDoneTodo(todo: Todo): void {
    this.todoService.toggleTodoDone(todo);
  }

  /**
   * toggle all todo done
   */
  toggleAllTodoDone(event: boolean): void {
    this.todos.forEach(item => item.done = event);
  }

  /**
   * editing todo
   */
  editingTodo(todo: Todo): void {
    if (!todo.done) {
      todo.edit = true;
    }
  }

  /**
   * cancel editing todo
   */
  cancelEditingTodo(todo: Todo): void {
    todo.edit = false;
  }

  /**
   * edited todo
   */
  editedTodo(todo: Todo, input: HTMLInputElement): void {
    todo.value = input.value;
    todo.edit = false;
  }

  /**
   * get todos
   */
  get todos(): Todo[] {
    return this.todoService.getAllTodos();
  }

  /**
   * get todos all done be get todos
   */
  get allDone(): boolean {
    const todos = this.todos;
    return todos.length && todos.filter(item => item.done).length === todos.length;
  }

  /**
   * get todos all not done number
   */
  get todoCount(): number {
    return this.todos.filter(item => !item.done).length;
  }

  /**
   * get todos all done number
   */
  get clearCount(): number {
    return this.todos.filter(item => item.done).length;
  }

}
