import h from 'snabbdom/h';

const pluralizeWord = (word, count) => {
  if (count === 1) return word;
  return `${word}s`;
};

const renderClearCompleted = (todos, props) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  return h('button.clear-completed', Object.assign({
    class: {
      hidden: completedCount === 0
    }
  }, props), 'Clear completed');
};

const renderCount = todos => {
  const activeCount = todos.filter(todo => todo.completed === false).length;
  return h('span.todo-count', [
    h('strong', activeCount),
    ` ${pluralizeWord('item', activeCount)} left`
  ]);
};

export default ({ todos, filter, trigger }) => (
  h('footer.footer', {
    class: {
      hidden: todos.length === 0
    }
  }, [
    renderCount(todos),
    h('ul.filters', [
      h('li', [
        h('a', {
          class: {
            selected: filter === undefined
          },
          props: {
            href: '#/'
          }
        }, 'All')
      ]),
      h('li', [
        h('a', {
          class: {
            selected: filter === 'active'
          },
          props: {
            href: '#/active'
          }
        }, 'Active')
      ]),
      h('li', [
        h('a', {
          class: {
            selected: filter === 'completed'
          },
          props: {
            href: '#/completed'
          }
        }, 'Completed')
      ])
    ]),
    renderClearCompleted(todos, {
      on: {
        click: () => trigger('clearCompleted')
      }
    })
  ])
);
