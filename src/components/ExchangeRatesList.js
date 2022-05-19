import React, { Fragment } from "react";
import ExchangeRateItem from "./ExchangeRateItem";
import "./ExchangeRatesList.css";

const ExchangeRatesList = (props) => {
  let currencies = [];
  for (let key in props.currenciesList) {
    currencies.push({ title: key, value: props.currenciesList[key] });
  }
  let primaryCurrencies = currencies.filter(
    (item) =>
      item.title === "USD" || item.title === "EUR" || item.title === "UAH"
  );

  let rateEUR = (
    props.currenciesList["UAH"] / props.currenciesList["EUR"]
  ).toFixed(2);

  let rateUSD = (
    props.currenciesList["UAH"] / props.currenciesList["USD"]
  ).toFixed(2);

  primaryCurrencies.map((item) => {
    if (item.title === "USD") {
      return (item.value = rateUSD);
    } else if (item.title === "EUR") {
      return (item.value = rateEUR);
    } else {
      item.title = "RUB";
      item.value = "ПТН/ПНХ";
    }
  });

  return (
    <Fragment>
      <section className="header_conteiner">
        <span className="header_info">Курс Валют :</span>
        <ul className="header_list">
          {primaryCurrencies.map((primaryCurrency) => (
            <ExchangeRateItem
              key={Math.random().toString()}
              currencyList={props.currenciesList}
              title={primaryCurrency.title}
              value={primaryCurrency.value}
            />
          ))}
        </ul>
      </section>
    </Fragment>
  );
};

export default ExchangeRatesList;
