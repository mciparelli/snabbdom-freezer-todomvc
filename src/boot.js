import Reactions from './reactions';
import State from './state';
import Router from './router';
import App from './ui/index';
import Render from './render';

Reactions(State);

const render = Render(document.querySelector('.container'));

const run = () => {
  const state = State.get();
  const todosToSave = state.todos.map(todo => Object.assign({}, todo, { ui: {} }));
  localStorage.setItem('todos', JSON.stringify(todosToSave));
  localStorage.setItem('filter', state.ui.filter);
  render(App({
    state,
    trigger: State.trigger
  }));
};

State.on('update', run);

Router(State).init('/');
run();
