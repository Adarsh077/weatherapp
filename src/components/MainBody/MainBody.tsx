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
    const { hourly } = this.props.data;

    return (
      <div className="main-body bg-white">
        <Segments
          selectedTab={selectedTab}
          handleSegmentSwitch={this.handleSegmentSwitch}
        />

        <IonSlides
          className="slider"
          ref={this.sliderRef}
          onIonSlideDidChange={this.handleTabSwitch}
        >
          <IonSlide>
            <Today hourly={hourly} />
          </IonSlide>
          <IonSlide>
            <Tomorrow />
          </IonSlide>
          <IonSlide>
            <Next7Day />
          </IonSlide>
        </IonSlides>
      </div>
    );
  }
}
