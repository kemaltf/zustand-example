import { create } from 'zustand';

// store just an arrow function that takes in a set as a parameter
// a state set up for the whole store
// and it will return an object (contain everything we have in our store)
// inside this, basically globalized our tasks
const store = (set) => ({
  tasks: [{ title: 'TestTask', state: 'PLANNED' }],
});

// ask to chat gpt when we export this it will be like what?
export const useStore = create(store);
