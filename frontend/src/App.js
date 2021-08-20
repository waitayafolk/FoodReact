import './App.css';
import {
  BrowserRouter as Router ,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./component/Login"
import Leftmenu from "./component/Leftmenu"
import Orderfood from "./component/Orderfood"

function App() {
  return (
    <>
    <div>
      <Router>
        <Switch>
          <Route path="/orderFood">
            <Orderfood />
          </Route>
          <Route path="/users">
            <Leftmenu />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>

    </>
  );
}

export default App;
