import React from 'react';
import ErrorBoundary from './ErrorBoundary';
const PaymentsApp = React.lazy(() => import('payments/App'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Payments 
      </header>
      <ErrorBoundary>
        <PaymentsApp/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
