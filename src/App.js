import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";

export class App {
  #todoList = new TodoListModel();

  addTodo(inputElement) {
    if (!inputElement.value) {
      return
    }

    this.#todoList.addTodo(new TodoItemModel({ name: inputElement.value, isCompleted: false }));
    inputElement.value = "";
    this.change();
  }

  getTodoItems() {
    return this.#todoList.getTodoItems();
  }

  changeIsCompleted(todoItem) {
    this.#todoList.changeIsCompleted(todoItem);
    this.change();
  }

  updateTodo(id, updatedName) {
    if (!updatedName) {
      return
    }

    this.#todoList.updateTodo(id, updatedName);
    this.change();
  }

  deleteTodo(todoId) {
    this.#todoList.deleteTodo(todoId)
    this.change();
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTodo(inputElement)
    })
  }

  createTodoItemElement(todoItem) {
    const todoItemElement = document.createElement("li");
    todoItemElement.className = "p-2 border-bottom d-flex align-items-center";

    const checkboxElement = document.createElement("input");
    checkboxElement.setAttribute("type", "checkbox");
    checkboxElement.className = "checkbox me-2";

    const todo = document.createElement("div");
    todo.textContent = todoItem.name;
    todo.className = "todo-name"
    if (todoItem.isCompleted) {
      todo.classList.add("is-completed")
      checkboxElement.checked = true;
    }

    const btnContainer = document.createElement("div");
    btnContainer.className = "d-flex ml-auto"

    const editBtnElement = document.createElement("button");
    editBtnElement.className = "btn btn-secondary me-2 edit";
    editBtnElement.setAttribute("type", "button");
    editBtnElement.textContent = "編集"

    const deleteBtnElement = document.createElement("button");
    deleteBtnElement.className = "btn btn-danger delete";
    deleteBtnElement.setAttribute("type", "button");
    deleteBtnElement.textContent = "削除"


    btnContainer.appendChild(editBtnElement);
    btnContainer.appendChild(deleteBtnElement);
    todoItemElement.appendChild(checkboxElement);
    todoItemElement.appendChild(todo);
    todoItemElement.appendChild(btnContainer);
    return todoItemElement;
  }

  count(todoItems) {
    const countAllElement = document.querySelector('#js-count-all')
    countAllElement.textContent = todoItems.length

    const countCompletedElement = document.querySelector('#js-count-completed')
    const completedItems = todoItems.filter(item => {
      return item.isCompleted === true;
    })
    countCompletedElement.textContent = completedItems.length

    const countUncompletedElement = document.querySelector('#js-count-uncompleted')
    const unCompletedItems = todoItems.filter(item => {
      return item.isCompleted === false;
    })
    countUncompletedElement.textContent = unCompletedItems.length
  }

  change() {
    const todoItems = this.getTodoItems();
    this.count(todoItems);

    const todoListElement = document.querySelector("#js-todo-list")
    todoListElement.innerHTML = "";

    if (todoItems.length > 0) {
      todoListElement.className = "border";
    } else {
      todoListElement.classList.remove("border");
    }

    todoItems.forEach(todoItem => {
      const todoItemElement = this.createTodoItemElement(todoItem);
      todoListElement.appendChild(todoItemElement);

      const checkbox = todoItemElement.querySelector(".checkbox")
      checkbox.addEventListener("change", () => {
        this.changeIsCompleted(todoItem)
      })

      const editBtn = todoItemElement.querySelector(".edit")
      editBtn.addEventListener("click", () => {
        const oldName = todoItem.name
        const updateInputElement = document.createElement("input");
        updateInputElement.setAttribute("value", oldName);
        updateInputElement.setAttribute("type", "text");

        const todoOldElement = todoItemElement.querySelector(".todo-name")
        todoOldElement.before(updateInputElement);
        todoOldElement.remove();

        const editBtnElement = todoItemElement.querySelector(".edit");
        const deleteBtnElement = todoItemElement.querySelector(".delete");
        editBtnElement.remove();
        deleteBtnElement.remove();

        const saveBtnElement = document.createElement("button");
        saveBtnElement.className = "btn btn-primary";
        saveBtnElement.setAttribute("type", "button");
        saveBtnElement.textContent = "保存"
        todoItemElement.appendChild(saveBtnElement);

        saveBtnElement.addEventListener("click", () => {
          this.updateTodo(todoItem.id, updateInputElement.value);
        })
      })

      const deleteBtn = todoItemElement.querySelector(".delete")
      deleteBtn.addEventListener("click", () => {
        if (confirm('本当に削除してもよろしいですか？')) {
          this.deleteTodo(todoItem.id);
        }
      })
    })
  }
}
