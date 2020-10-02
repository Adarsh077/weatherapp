import React from "react";

interface Props {
  time: string;
  icon: string;
  temp: number;
  isDark?: Boolean;
  changeActiveIndex: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const iconBase = "assets/icons/";

export default (props: Props) => {
  let iconUrl = iconBase + props.icon.slice(0, 2);
  iconUrl += props.isDark ? "d.svg" : "n.svg";

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
