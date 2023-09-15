export class TodoListModel {
  #items;
  constructor(items = []) {
    this.#items = items;
  }

  getTodoItems() {
    return this.#items;
  }

  addTodo(todoItem) {
    this.#items.push(todoItem);
  }

  deleteTodo(todoId) {
    this.#items = this.#items.filter(item => {
      return item.id !== todoId;
    })
  }

  changeIsCompleted(todoItem) {
    const item = this.#items.find((item) => item.id === todoItem.id);
    item.isCompleted = !todoItem.isCompleted;
  }

  updateTodo(id, updatedName) {
    const item = this.#items.find((item) => item.id === id)
    item.name = updatedName;
  }
}
