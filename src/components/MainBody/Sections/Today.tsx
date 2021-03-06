import React, { Component } from "react";
import { IonSlides, IonSlide } from "@ionic/react";

import HourlyTemp from "../../../models/Hourly";
import WeatherCard from "../Components/WeatherCard";
import {
  MetaCardContainer,
  MetaCardLeft,
  MetaCardRight,
  MetaCardText,
  MetaCardTitle,
} from "../Components/MetaCard";

interface Props {
  hourly: Array<HourlyTemp>;
  sunrise: number;
  sunset: number;
}

interface State {
  activeIndex: number;
}

const options = {
  slidesPerView: 4,
};

const getDate = (milliseconds: number) => {
  const date = new Date(milliseconds * 1000);
  return date.getHours() + ":" + `0${date.getMinutes()}`.slice(-2);
};

class Today extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  changeActiveIndex = (idx: number) => {
    this.setState({ activeIndex: idx });
  };

  render() {
    const { hourly, sunrise, sunset } = this.props;
    const { activeIndex } = this.state;

    return (
      <div>
        <IonSlides options={options} className="px-3">
          {hourly.map(({ weather, temp, dt }, index) => {
            temp = Math.round(temp);

            return (
              <IonSlide key={index + 100}>
                <WeatherCard
                  icon={weather[0].icon}
                  temp={temp}
                  time={getDate(dt)}
                  isDark={index === activeIndex}
                  changeActiveIndex={(e) => this.changeActiveIndex(index)}
                />
              </IonSlide>
            );
          })}
        </IonSlides>

        <div className="meta-data px-3">
          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Sunrise</MetaCardTitle>
              <MetaCardText> {"0" + getDate(sunrise)} </MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Sunset</MetaCardTitle>
              <MetaCardText> {getDate(sunset)} </MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>

          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Feels Like</MetaCardTitle>
              <MetaCardText>
                {hourly[activeIndex].feels_like}&#730;
              </MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Pressure</MetaCardTitle>
              <MetaCardText>
                {hourly[activeIndex].pressure} <small>hPa</small>
              </MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>

          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Humidity</MetaCardTitle>
              <MetaCardText>{hourly[activeIndex].humidity}%</MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Dew Point</MetaCardTitle>
              <MetaCardText>{hourly[activeIndex].dew_point}&#730;</MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>

          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Wind Degree</MetaCardTitle>
              <MetaCardText>{hourly[activeIndex].wind_deg}&#730;</MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Wind Speed</MetaCardTitle>
              <MetaCardText>
                {hourly[activeIndex].dew_point} <small>m/sec</small>
              </MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>
        </div>
      </div>
    );
  }
}

export default Today;
