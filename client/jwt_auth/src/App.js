import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  console.log(user)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
