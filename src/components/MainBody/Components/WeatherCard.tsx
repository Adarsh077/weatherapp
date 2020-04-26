import React from "react";

interface Props {
  time: string;
  icon: string;
  temp: number;
  isDark?: Boolean;
  changeActiveIndex: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const iconBase =
  "https://ionicassets.s3.ap-south-1.amazonaws.com/weatherappicons/";

export default (props: Props) => {
  let iconUrl = iconBase + props.icon.slice(0, 2);
  iconUrl += props.isDark ? "n.svg" : "d.svg";

  return (
    <div
      onClick={props.changeActiveIndex}
      className={`weather-card shadow-lg ${
        props.isDark && "weather-card-dark"
      }`}
    >
      <div className="time">
        <small>{props.time}</small>
      </div>
      <img src={iconUrl} alt={props.icon} />
      <div className="degree">{props.temp}&#730;</div>
    </div>
  );
};
