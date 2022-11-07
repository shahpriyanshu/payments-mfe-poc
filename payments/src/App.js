import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [configData, setData] = useState([]);
  const [paymentData, setPaymentData] = useState([])

  const customEventHandler =
    (e) => {
      console.log('detail', e);
    }

    useEffect(() => {
      if (configData?.token)
     fetchPaymentMethods(configData);
    }, [configData.token])

    const fetchPaymentMethods = async(dt) => {
      console.log('CALLED')
     
      try {
         const {customer_key, hub_id, city_id, token} = dt;
        const url = `${
          `https://l3-qa1.licious.app/payment/v7/fetchConfigforPaymentsAndCDAndMeatopia`
        }?customer_key=${customer_key}&source=mobilesite&hub_id=${hub_id}&city_id=${city_id}`;
        const data = await fetch(url, {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            source: "msite",
            customerkey: `${customer_key}`,
            hubid: `${hub_id}`,
            token: `${token}`,
            "access-token": `${token}`,
          },
        });
        const response = await data.json();
        console.log(response);
        setPaymentData(response?.data?.payments);
      } catch (error) {
        // logger("error", "API >> fetch-payments", error);
        return `{ "statusCode": "500", "message": "Oop's something went wrong!" }`;
      }
    }


  useEffect(() => {
    if (window.appConfig) {
      console.log('appConfig >>> ', window.appConfig);
      setData(JSON.parse(window.appConfig));
    }
  }, [window?.appConfig])

  useEffect(() => {
  //  window.customevent = new Event();
    window.addEventListener('customevent', (e) => {
       console.log('detail', e)
      const parsedData = typeof e.detail === "string" ? JSON.parse(e.detail) : e.detail;
      setData(parsedData) 
    })
    console.log('added event listener');
    return () =>
      window.removeEventListener('customevent', customEventHandler)
  }, []);

  const sendToNative = (message) => {
    if (window.webkit?.messageHandlers?.webpageResponseHandler) {
      window.webkit.messageHandlers.webpageResponseHandler.postMessage({
          "status": message
      });
  }
  }

  return (
    <div className="App">
      {
        paymentData?.length ? 
        <div>
        {paymentData.map((pm, idx) => {
            return <><input type='text' disabled={!pm.enabled} value={pm.display_name}/></>
        })}

        </div>
      : <span>payment methods Loading...</span>}
      {configData ?
        <div>
          <b>token</b> {configData.token}<br />
          <b>customer_key</b> {configData.customer_key}
          {configData?.order_charges?.map((attr,) => {
            return (<div>
              <span><b>{attr.attribute}</b></span>&nbsp; &nbsp;
              <span>{attr.value}</span>
            </div>)
          })
          }
          <div>
            <button onClick={(e) => sendToNative('pending')}>Pending</button>
            <button onClick={(e) => sendToNative('success')}>Success</button>
            <button onClick={(e) => sendToNative('failed')}>Failed</button>
            <button onClick={(e) => fetchPaymentMethods(configData)}>fetch pm</button>
          </div>
        </div> : <span>Loading....</span>}
    </div>
  );
}

export default App;