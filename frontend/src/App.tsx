import { Redirect, Route, Switch } from 'wouter';
import { AuthPageLayout } from './pages/login-actions/_layout';

function App() {
  return (
    <Switch>
      <Route path="/login-actions/:action" component={AuthPageLayout} />
      <Route component={() => <Redirect to="/login-actions/authenticate" />} />
    </Switch>
  );
}

export default App;
