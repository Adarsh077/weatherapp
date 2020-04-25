import React, { PureComponent } from "react";
import { IonSlides, IonSlide } from "@ionic/react";

import Rain from "../../../assets/icons/rain.svg";
import RainDark from "../../../assets/icons/rain-dark.svg";

import HourlyTemp from "../../../models/Hourly";
import WeatherCard from "../Components/WeatherCard";
interface Props {
  hourly: Array<HourlyTemp>;
}

const options = {
  slidesPerView: 4,
};

class Today extends PureComponent<Props> {
  render() {
    const { hourly } = this.props;

    return (
      <div>
        <IonSlides options={options}>
          {hourly.map(({ weather, temp, dt }) => {
            console.log(dt);
            dt = new Date(dt).getHours();
            temp = Math.round(temp);

            return (
              <IonSlide>
                <WeatherCard
                  image={weather[0].description}
                  temp={temp}
                  time={`${dt}:00`}
                />
              </IonSlide>
            );
          })}
        </IonSlides>
      </div>
    );
  }
}

export default Today;
