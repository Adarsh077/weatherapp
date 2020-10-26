import React, { Component } from "react";
import "./Hero.css";

import CurrentTemp from "../../models/Current";

interface Props {
  timezone: string;
  current: CurrentTemp;
}

const getDate = (date: any): string => {
  date = new Date(date * 1000).toDateString().split("");
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
          <div>{timezone}</div>
        </div>

        {/* Hero Main */}

        <div className="hero-data h-100">
          <div className="degree">{current.temp}&#730;</div>
          <div className="meta-data">
            <p>{current.weather[0].main}</p>
            <p className="date">{getDate(current.dt)}</p>
          </div>
        </div>
      </div>
    );
  }
}
