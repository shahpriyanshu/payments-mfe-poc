import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ErrorBoundary from './ErrorBoundary';
const PaymentsApp = React.lazy(() => import('payments/App'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Payments ui
      </header>
      <Router>
        <Switch>
          <Route path="/payments">
          <ErrorBoundary>
            <PaymentsApp/>
          </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
