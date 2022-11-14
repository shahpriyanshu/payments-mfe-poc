import React from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Payments from './payments';


const configData = {
  "detail": {
    "customer_key": "c_l88rbb6t",
    "token": "tk_l88r9nep",
    "hub_id": 4,
    "city_id": 1,
    "source": "android",

    "order_charges": [
      {
        "key": "subtotal",
        "attribute": "Subtotal",
        "value": 516.5,
        "message": ""
      },
      {
        "key": "deliverycharge",
        "attribute": "Delivery Charge",
        "value": 39,
        "message": ""
      },
      {
        "key": "discount",
        "attribute": "Discount",
        "value": 0,
        "message": ""
      },
      {
        "key": "liciouswallet",
        "attribute": "Licious Wallet",
        "value": 0,
        "message": ""
      },
      {
        "key": "roundedofftotal",
        "attribute": "Rounded value",
        "value": -0.5,
        "message": ""
      },
      {
        "key": "total",
        "attribute": "Total",
        "value": 555,
        "message": ""
      }
    ]
  }
}

const App = () => {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.set('config', JSON.stringify(configData))
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/payments" exact element={<Payments />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <>Payments UI</>


export default App;
