import React, { Fragment, useState, useEffect } from "react";
import ExchangeRatesList from "./components/ExchangeRatesList";
import ConverterInput from "./components/ConverterInput";
import "./App.css";

function App() {
  const [rates, setRates] = useState([]);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch("https://cdn.cur.su/api/latest.json");
      const responseData = await response.json();
      setRates(responseData.rates);
    };
    fetchRates();
    setInterval(() => {
      fetchRates();
    }, 9000000);
    return () => {
      clearInterval(fetchRates);
    };
  }, []);

  useEffect(() => {
    if (rates) {
      onAmountChangeHandler(1);
    }
  }, [rates]);

  let onAmountChangeHandler = (fromAmount) => {
    setToAmount(
      ((fromAmount * rates[toCurrency]) / rates[fromCurrency]).toFixed(2)
    );
    setFromAmount(fromAmount);
  };

  const toAmountChangeHandler = (toAmount) => {
    setFromAmount(
      ((toAmount * rates[fromCurrency]) / rates[toCurrency]).toFixed(2)
    );
    setToAmount(toAmount);
  };

  const onCurrencyChangeHandler = (fromCurrency) => {
    setToAmount(
      ((fromAmount * rates[toCurrency]) / rates[fromCurrency]).toFixed(2)
    );
    setFromCurrency(fromCurrency);
  };

  const toCurrencyChangeHandler = (toCurrency) => {
    setFromAmount(
      ((toAmount * rates[fromCurrency]) / rates[toCurrency]).toFixed(2)
    );
    setToCurrency(toCurrency);
  };

  return (
    <Fragment>
      <header>
        <ExchangeRatesList currenciesList={rates} />
      </header>
      <main>
        <h2 className="main_title">Конвертер валют</h2>
        <ConverterInput
          currencies={Object.keys(rates)}
          amount={fromAmount}
          currency={fromCurrency}
          onAmountChange={onAmountChangeHandler}
          onCurrencyChange={onCurrencyChangeHandler}
        />
        <ConverterInput
          currencies={Object.keys(rates)}
          amount={toAmount}
          currency={toCurrency}
          onAmountChange={toAmountChangeHandler}
          onCurrencyChange={toCurrencyChangeHandler}
        />
      </main>
    </Fragment>
  );
}

export default App;
