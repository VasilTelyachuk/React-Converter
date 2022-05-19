import React from "react";
import "./ExchangeRateItem.css";

const ExchangeRateItem = (props) => {
  return (
    <li className="header_item">
      <span className="header_text">{`${props.title} : ${props.value}`}</span>
    </li>
  );
};

export default ExchangeRateItem;
