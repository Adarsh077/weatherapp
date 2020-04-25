import React from "react";

interface Props {
  time: string;
  image: string;
  temp: number;
  isDark?: Boolean;
}

const iconBase =
  "https://ionicassets.s3.ap-south-1.amazonaws.com/weatherappicons/";

export default (props: Props) => {
  let iconUrl = iconBase + props.image.split(" ").join("+");
  iconUrl += props.isDark ? ".svg" : "-dark.svg";
  console.log(iconUrl);

  return (
    <div className={`weather-card ${props.isDark && "weather-card-dark"}`}>
      <div className="time">
        <small>{props.time}</small>
      </div>
      <img src={iconUrl} alt={props.image} />
      <div className="degree">{props.temp}&#730;</div>
    </div>
  );
};
