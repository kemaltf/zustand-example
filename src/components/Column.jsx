import { useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import classNames from 'classnames';
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

  // remember only run filter map or whatever inside of a selector if you use either shalow or your own comparison function, if you don't do that maybe just stick to usememo.
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state));
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        // drag over will read the position as long as dragged
        // in case drag and drop we need to do this
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        // drag over will read the position as long as dragged
        // in case drag and drop we need to do this
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title}></Task>
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text}></input>
            <button
              onClick={() => {
                addTask(text, state);
                setText('');
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
