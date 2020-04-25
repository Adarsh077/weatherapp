import React, { Component } from "react";
import "./Hero.css";

import Menu from "../../assets/icons/menu.svg";
import Search from "../../assets/icons/search.svg";

import CurrentTemp from "../../models/Current";

interface Props {
  timezone: string;
  current: CurrentTemp;
}

const getDate = (date: any): string => {
  date = new Date(date).toDateString().split("");
  date.splice(10, 5);
  return date.join("");
};

export default class Hero extends Component<Props> {
  render() {
    const { timezone, current } = this.props;

    return (
      <div className="temprature">
        {/* Header */}
        <div className="header ion-padding sticky-top">
          <img src={Menu} alt="menu" className="img-fluid" />
          <div>{timezone}</div>
          <div>
            <img src={Search} alt="search" />
          </div>
        </div>

        {/* Hero Main */}

        <div className="hero-data h-100">
          <div className="degree">81&#730;</div>
          <div className="meta-data">
            <p>{current.weather[0].main}</p>
            <p className="date">{getDate(current.dt)}</p>
          </div>
        </div>
      </div>
    );
  }
}
