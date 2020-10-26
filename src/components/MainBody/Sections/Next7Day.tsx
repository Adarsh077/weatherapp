import React, { Component } from "react";
import DailyTemp from "../../../models/Daily";
import { IonSlides, IonSlide } from "@ionic/react";
import WeatherCard from "../Components/WeatherCard";
import {
  MetaCardContainer,
  MetaCardLeft,
  MetaCardText,
  MetaCardTitle,
  MetaCardRight,
} from "../Components/MetaCard";

interface Props {
  daily: Array<DailyTemp>;
}

const options = {
  slidesPerView: 4,
};

interface State {
  activeIndex: number;
}

const getDay = (milliseconds: number) => {
  const date = new Date(milliseconds * 1000);
  return date.toDateString().split("").splice(4, 6).join("");
};

const getDate = (milliseconds: number) => {
  const date = new Date(milliseconds * 1000);
  return date.getHours() + ":" + `0${date.getMinutes()}`.slice(-2);
};

export default class extends Component<Props, State> {
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
    const { daily } = this.props;
    const { activeIndex } = this.state;

    return (
      <div>
        <IonSlides options={options} className="px-3">
          {daily.map(({ weather, temp, dt }, index) => {
            const maxTemp = Math.round(temp.max);

            return (
              <IonSlide key={index + 1000}>
                <WeatherCard
                  icon={weather[0].icon}
                  temp={maxTemp}
                  time={getDay(dt)}
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
              <MetaCardText>
                {"0" + getDate(daily[activeIndex].sunrise)}
              </MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Sunset</MetaCardTitle>
              <MetaCardText>{getDate(daily[activeIndex].sunset)}</MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>

          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Feels Like</MetaCardTitle>
              <MetaCardText>
                {daily[activeIndex].feels_like.day}&#730;
              </MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Pressure</MetaCardTitle>
              <MetaCardText>
                {daily[activeIndex].pressure} <small>hPa</small>
              </MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>

          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Humidity</MetaCardTitle>
              <MetaCardText>{daily[activeIndex].humidity}%</MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Dew Point</MetaCardTitle>
              <MetaCardText>{daily[activeIndex].dew_point}&#730;</MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>

          <MetaCardContainer>
            <MetaCardLeft>
              <MetaCardTitle>Wind Degree</MetaCardTitle>
              <MetaCardText>{daily[activeIndex].wind_deg}&#730;</MetaCardText>
            </MetaCardLeft>
            <MetaCardRight>
              <MetaCardTitle>Wind Speed</MetaCardTitle>
              <MetaCardText>
                {daily[activeIndex].dew_point} <small>m/sec</small>
              </MetaCardText>
            </MetaCardRight>
          </MetaCardContainer>
        </div>
      </div>
    );
  }
}
