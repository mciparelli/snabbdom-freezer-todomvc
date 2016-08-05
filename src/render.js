import snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import attrsModule from 'snabbdom/modules/attributes';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import livePropsModule from '../lib/livePropsModule';

export default el => {
  let oldVDOM = el;
  const patch = snabbdom.init([
    classModule,
    attrsModule,
    propsModule,
    eventlistenersModule,
    livePropsModule
  ]);
  return newVDOM => {
    oldVDOM = patch(oldVDOM, newVDOM);
  };
};
