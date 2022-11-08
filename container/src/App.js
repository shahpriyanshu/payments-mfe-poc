import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Payments from './payments';


const App = () => {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/payments" exact element={<Payments/>}/>
          <Route path="/" exact element={<Home/>}/>
        </Routes>
    </div>
    </Router>
  );
}

const Home = () => <>Payments UI</>
  

export default App;
