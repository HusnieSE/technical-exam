import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route path="/dashboard">
          <DashboardScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
