import { create } from 'zustand';

// store just an arrow function that takes in a set as a parameter
// a state set up for the whole store
// and it will return an object (contain everything we have in our store)
// inside this, basically globalized our tasks
// set function in zustand accept prev value. If it need prev value we send callback to the function. if just set,  we can directly send object.
// Contoh 1: Bentuk Fungsi Biasa
// set({ count: 10 });

// Contoh 2: Bentuk Fungsi Callback
// set((prevState) => {
//   return { count: prevState.count + 1 };
// });
const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state) =>
    set((store) => ({
      tasks: [...store.tasks, { title, state }],
    })),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) => {
    console.log('-', title, state);
    set((store) => ({
      tasks: store.tasks.map((task) => (task.title == title ? { title, state } : task)),
    }));
  },
});

// ask to chat gpt when we export this it will be like what?
export const useStore = create(store);
