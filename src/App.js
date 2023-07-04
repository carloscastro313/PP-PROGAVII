import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Routes/Home';
import Detalle from './Routes/Detalle';
import Error from './Routes/Error';
import React, { useEffect } from 'react'
import AuthCheck from './helpers/AuthCheck';
import Login from './Routes/Login';
import Register from './Routes/Register';


function App() {


  return (
    <Router>
      <div>
        <IsLog />
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registro">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/detalle/:id">
            <Detalle />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


const IsLog = () => {
  let history = useHistory();

  useEffect(() => {
    AuthCheck(history);
  }, [])
  return (<></>)
}

export default App;
