import React from "react";
import "./TempMetaData.css";

interface Props {
  humidity: number;
  clouds: number;
  uvi: number;
}

const TempMetaData = (props: Props) => {
  const humidity: number = Math.ceil(props.humidity);
  const clouds: number = Math.ceil(props.clouds);
  const uvi: number = Math.ceil(props.uvi);

  return (
    <div className="temprature-metadata bg-primary">
      <div className="data">
        <div className="progress blue">
          <span className={`progress-left progress-left-${humidity}`}>
            <span className="progress-bar"></span>
          </span>
          <span className={`progress-right progress-right-${humidity}`}>
            <span className="progress-bar"></span>
          </span>
          <div className="progress-value">{humidity}%</div>
        </div>
        <div className="value">Humidity</div>
      </div>
      <div className="data">
        <div className="progress blue">
          <span className={`progress-left progress-left-${clouds}`}>
            <span className="progress-bar"></span>
          </span>
          <span className={`progress-right progress-right-${clouds}`}>
            <span className="progress-bar"></span>
          </span>
          <div className="progress-value">{clouds}%</div>
        </div>
        <div className="value">Clouds</div>
      </div>
      <div className="data">
        <div className="progress blue">
          <span className={`progress-left progress-left-100`}>
            <span className="progress-bar"></span>
          </span>
          <span className={`progress-right progress-right-100`}>
            <span className="progress-bar"></span>
          </span>
          <div className="progress-value">{uvi}</div>
        </div>
        <div className="value">UV Index</div>
      </div>
    </div>
  );
};

export default TempMetaData;
