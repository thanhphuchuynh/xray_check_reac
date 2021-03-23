import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Session from './components/Session';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Session />
      </div>
    </Router>
  );
}

export default App;
