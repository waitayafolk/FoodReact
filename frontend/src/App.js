import './App.css';
import {
  BrowserRouter as Router ,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./component/Login"
import Leftmenu from "./component/Leftmenu"

function App() {
  return (
    <>
    <div>
      <Router>
        <Switch>
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
