import './App.css';
import LandingPage from './landingpage'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './game';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path='/'>
       <LandingPage/>
       </Route>
       <Route exact path='/game'>
       <Game/>
       </Route>
      </Switch>

    </div>
    </Router>
    
  );
}

export default App;
