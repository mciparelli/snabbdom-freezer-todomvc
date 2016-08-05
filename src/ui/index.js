import h from 'snabbdom/h';
import Header from './header';
import List from './list/index';
import Footer from './footer';
import Info from './info';

export default ({ state, trigger }) =>
  h('div', [
    h('section.todoapp', [
      Header({ state, trigger }),
      List({ todos: state.todos, filter: state.ui.filter, trigger }),
      Footer({ todos: state.todos, filter: state.ui.filter, trigger })
    ]),
    Info()
  ]);
