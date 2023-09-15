let todoIdx = 0;
export class TodoItemModel {
  id;
  name;
  isCompleted;
  constructor({ name, isCompleted }) {
    this.id = ++todoIdx;
    this.name = name;
    this.isCompleted = isCompleted;
  }
}
