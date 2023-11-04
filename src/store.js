import { create } from 'zustand';

// store just an arrow function that takes in a set as a parameter
// a state set up for the whole store
// and it will return an object (contain everything we have in our store)
// inside this, basically globalized our tasks
const store = (set) => ({
  tasks: [
    { title: 'Test 1 Task', state: 'PLANNED' },
    { title: 'Test 2 Task', state: 'ONGOING' },
    { title: 'Test 3 Task', state: 'DONE' },
  ],
});

// ask to chat gpt when we export this it will be like what?
export const useStore = create(store);
