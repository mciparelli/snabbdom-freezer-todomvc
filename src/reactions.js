import uuid from 'node-uuid';

export default State =>
  State.on('save', (value, todo) => {
    if (todo) {
      todo.pivot().set('value', value).ui.set('editing', false);
      return;
    }
    const state = State.get();
    state.todos.push({
      id: uuid.v1(),
      value,
      completed: false,
      ui: {
        editing: false
      }
    });
    state.ui.set('input', '');
  }).on('delete', ({ id }) => {
    const state = State.get();
    const newTodos = state.todos.filter(todo => todo.id !== id);
    state.set('todos', newTodos);
  }).on('toggleCompleted', (todos, completed) => {
    todos.forEach(todo => todo.set('completed', completed));
  }).on('clearCompleted', () => {
    const state = State.get();
    const newTodos = state.todos.filter(todo => !todo.completed);
    state.set('todos', newTodos);
  });
