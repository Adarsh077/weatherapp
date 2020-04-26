import React, { Component } from "react";
import { IonSlides, IonSlide } from "@ionic/react";
import "./MainBody.css";
import Segments from "./Sections/Segments";
import Today from "./Sections/Today";
import Tomorrow from "./Sections/Tomorrow";
import Next7Day from "./Sections/Next7Day";
import API from "../../models/API";

interface Props {
  data: API;
}

export default class extends Component<Props, { selectedTab: number }> {
  sliderRef: React.RefObject<HTMLIonSlidesElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
    this.sliderRef = React.createRef();
  }

  handleTabSwitch = async (e: CustomEvent) => {
    this.sliderRef.current
      ?.getActiveIndex()
      .then((idx) => this.setState({ selectedTab: idx }));
  };

  handleSegmentSwitch = (idx: number) => {
    this.setState({ selectedTab: idx });
    this.sliderRef.current?.slideTo(idx);
  };

  render() {
    const { selectedTab } = this.state;
    const { hourly, current, tomorrow, daily } = this.props.data;

    return (
      <div className="main-body bg-white">
        <Segments
          selectedTab={selectedTab}
          handleSegmentSwitch={this.handleSegmentSwitch}
        />

        <IonSlides
          className="slider"
          ref={this.sliderRef}
          onIonSlideWillChange={this.handleTabSwitch}
        >
          <IonSlide>
            <Today
              hourly={hourly}
              sunrise={current.sunrise}
              sunset={current.sunset}
            />
          </IonSlide>
          <IonSlide>
            <Tomorrow
              tomorrow={tomorrow}
              sunrise={daily[0].sunrise}
              sunset={daily[0].sunset}
            />
          </IonSlide>
          <IonSlide>
            <Next7Day daily={daily} />
          </IonSlide>
        </IonSlides>
      </div>
    );
  }
}
