let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: Array<() => void> = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
