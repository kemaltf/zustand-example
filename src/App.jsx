import Column from '../../components/Column';
import './App.css';

function App() {
  return (
    <div className="App">
      <Column state="PLANNED"></Column>
      <Column state="ONGOING"></Column>
      <Column state="DONE"></Column>
    </div>
  );
}

export default App;
