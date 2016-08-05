const updateProps = (oldVnode, vnode) => {
  let cur;
  let old;
  const elm = vnode.elm;
  const props = vnode.data.liveProps || {};
  Object.keys(props).forEach(key => {
    cur = props[key];
    old = elm[key];
    if (old !== cur) elm[key] = cur;
  });
};

export default ({
  create: updateProps,
  update: updateProps
});
