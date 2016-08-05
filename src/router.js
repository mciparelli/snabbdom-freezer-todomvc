import { Router } from 'director';

export default State => Router({
  '/(active|completed|)': filter => {
    const state = State.get();
    if (filter === '') return state.ui.remove('filter');
    return state.ui.set({ filter });
  }
});
