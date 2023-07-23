export interface Todo {
  id: number,
  todoName: string
  state: 'completed' | 'deleted' | 'created'
  isEditing: boolean
}

// localStorage.clear()
const todosRef = localStorage.getItem('todos');
export const todos: Array<Todo> = todosRef === null 
  ? (_ => {
    localStorage.setItem('todos',JSON.stringify([]));
    return []
  })() 
  : JSON.parse(localStorage.getItem('todos')!);


export function completeTodo(id: Todo['id']) {
  const _todos: Array<Todo> = JSON.parse(localStorage.getItem('todos')!)
  .map((todo: Todo) => {
    if(todo.id === id) {
      return {
        ...todo,
        state: todo.state === 'created' ? 'completed' : 'created'
      }
    } else return todo;
  })!;

  localStorage.setItem('todos',JSON.stringify(_todos));
}

export function deleteTodo(id: Todo['id']) {
  let _todos: Array<Todo> = JSON.parse(localStorage.getItem('todos'));

  _todos = _todos.filter((todo: Todo) => todo.id !== id);

  localStorage.setItem('todos',JSON.stringify(_todos));
}

export function createTodo(todoName: Todo['todoName']) {
  const _todos: Array<Todo> = JSON.parse(localStorage.getItem('todos'));

  const todo = {
    id: parseInt(`123${_todos.length +1}`),
    todoName,
    state: 'created',
    isEditing: false
  } as Todo;
  _todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(_todos));

  return todo;
}