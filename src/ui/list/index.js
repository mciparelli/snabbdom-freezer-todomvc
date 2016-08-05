import R from 'ramda';
import h from 'snabbdom/h';
import Item from './item';

const shouldCheckAllCompleted = (todos, filter) => {
  if (filter === 'completed') return true;
  if (filter !== undefined) return false;
  return todos.filter(todo => todo.completed).length === todos.length;
};

const filterTodos = (todos, filter) => {
  if (filter === undefined) return todos;
  return todos.filter(todo => {
    const passesCompleted = filter === 'completed' && todo.completed;
    const passesActive = filter === 'active' && todo.completed === false;
    return passesCompleted || passesActive;
  });
};

export default ({ todos, filter, trigger }) => {
  const filteredTodos = filterTodos(todos, filter);
  return (
    h('section.main', {
      class: {
        hidden: todos.length === 0
      }
    }, [
      h('input.toggle-all', {
        props: {
          type: 'checkbox',
          checked: shouldCheckAllCompleted(filteredTodos, filter)
        },
        on: {
          change: R.pipe(
            R.prop('currentTarget'),
            R.prop('checked'),
            R.curryN(3, trigger)('toggleCompleted', filteredTodos)
          )
        }
      }),
      h('label', {
        attrs: {
          for: 'toggle-all'
        }
      }, 'Mark all as complete'),
      h('ul.todo-list', filteredTodos.map(todo =>
        Item({ todo, trigger, isEditing: todo.ui.editing })
      ))
    ])
  );
};
