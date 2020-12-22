
import List from "./list";
import Add from "./add";
import NotFound from "./error/not_found";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={List}></Route>
        <Route path="/add" exact component={Add}></Route>
        <Route path="/edit/:id" component={Add}></Route>
        <Route path="/*" exact component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
