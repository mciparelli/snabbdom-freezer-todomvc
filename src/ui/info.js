import h from 'snabbdom/h';

export default () =>
  h('footer.info', [
    h('p', 'Double-click to edit a todo'),
    h('p', [
      'Created by ',
      h('a', {
        props: {
          href: 'http://github.com/mciparelli'
        }
      }, 'Martín Ciparelli')
    ]),
    h('p', [
      'Part of ',
      h('a', {
        props: {
          href: 'http://todomvc.com'
        }
      }, 'TodoMVC')
    ])
  ]);
