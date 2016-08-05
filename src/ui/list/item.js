import R from 'ramda';
import h from 'snabbdom/h';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default ({ todo, trigger, isEditing }) => {
  const saveOrDestroy = R.pipe(
    R.trim,
    R.ifElse(
      R.isEmpty,
      () => trigger('delete', todo),
      val => trigger('save', val, todo)
    )
  );

  return (
    h('li', {
      class: {
        completed: todo.completed,
        editing: isEditing
      },
      hook: {
        update: (oldVNode, newVNode) => {
          if (!isEditing) return;
          const editEl = newVNode.elm.querySelector('.edit');
          editEl.focus();
        }
      }
    }, [
      h('div.view', [
        h('input.toggle', {
          props: {
            type: 'checkbox',
            checked: todo.completed
          },
          on: {
            change: R.pipe(
              R.prop('currentTarget'),
              R.prop('checked'),
              checked => trigger('toggleCompleted', [todo], checked)
            )
          },
          class: {
            hidden: isEditing
          }
        }),
        h('label', {
          on: {
            dblclick: () => todo.ui.set('editing', true)
          },
          class: {
            hidden: isEditing
          }
        }, todo.value),
        h('button.destroy', {
          on: {
            click: () => trigger('delete', todo)
          }
        })
      ]),
      h('input.edit', {
        liveProps: {
          value: todo.value
        },
        on: {
          blur: ev => {
            if (!isEditing) return;
            saveOrDestroy(ev.currentTarget.value);
          },
          keydown: ev => {
            const isEnter = ev.keyCode === ENTER_KEY;
            const isEscape = ev.keyCode === ESCAPE_KEY;
            if (isEnter) {
              saveOrDestroy(ev.currentTarget.value);
              return;
            }
            if (isEscape) {
              todo.ui.set('editing', false);
              return;
            }
          }
        }
      })
    ])
  );
};
