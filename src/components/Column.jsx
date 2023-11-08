import { useStore } from '../store';
import './Column.css';
import Task from './Task';
export default function Column({ state }) {
  // when we use contect in react every change to the whole context would update any consumer
  // even it doesn't consume the element that changed
  // so only when the task change -> component will rerun
  // important! filter method will create new array and new array means new value even its the same, so it will re-render so there are many way to make it not rerun.

  // 1. use memo (use built in function) => ask this to chat gpt
  // const tasks = useStore((store) => store.tasks);
  // const filtered = useMemo(
  //   () => tasks.filter((task) => task.state === state),
  //   [task, state]
  // );

  // 2. shallow (use built in function)
  // const tasks = useStore(
  //   (store) => store.tasks.filter((task) => task.state === state),
  //   shallow
  // );

  // 3. make your own function (use built in function)
  // const tasks = useStore(
  //   (store) => store.tasks.filter((task) => task.state === state),
  //   (prev, next) => {
  //     const longest = prev.length > next.length ? prev.length : next.length;
  //     for (let i = 0; i < longest; i++) {
  //       if (!prev[i] || !next[i]) return false;
  //       if (prev[i] !== next[i]) return false;
  //     }
  //     return true;
  //   }
  // );
  console.log(useStore);

  // remember only run filter map or whatever inside of a selector if you use either shalow or your own comparison function, if you don't do that maybe just stick to usememo.

  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state));
  const addTask = useStore((store) => store.addTask);
  console.log(addTask);
  return (
    <div className="column">
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            addTask('sabfgiosa' + state, state);
          }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title}></Task>
      ))}
    </div>
  );
}
