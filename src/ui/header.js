import h from 'snabbdom/h';
import R from 'ramda';

const ENTER_KEY = 13;

export default ({ state, trigger }) => {
  const updateInput = ev => state.ui.set('input', ev.currentTarget.value).now();

  return (
    h('header.header', [
      h('h1', 'todos'),
      h('input.new-todo', {
        props: {
          placeholder: 'What needs to be done?',
          autofocus: true,
          value: state.ui.input
        },
        on: {
          input: updateInput,
          keydown: R.when(
            R.propEq('keyCode', ENTER_KEY),
            R.pipe(
              R.prop('currentTarget'),
              R.prop('value'),
              R.trim,
              R.unless(
                R.isEmpty,
                val => trigger('save', val)
              )
            )
          )
        }
      })
    ])
  );
};
