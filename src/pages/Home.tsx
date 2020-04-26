import { IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import { Plugins, StatusBarStyle } from "@capacitor/core";

import "./Home.css";
import MainBody from "../components/MainBody/MainBody";
import Hero from "../components/Hero/Hero";
import TempMetaData from "../components/TempMetaData/TempMetaData";

import Data from "../components/Data";
import API from "../models/API";

const { StatusBar } = Plugins;

class Page extends Component<{}, { data: API }> {
  constructor(props: Readonly<{}>) {
    super(props);

    /* Filter Hourly Data till 23:00 and for tomorrow */
    let idx = Data.hourly.findIndex(
      (hr) => new Date(hr.dt * 1000).getHours() === 23
    );
    let tomorrow = Data.hourly.splice(idx + 1, Data.hourly.length);
    idx = tomorrow.findIndex((hr) => new Date(hr.dt * 1000).getHours() === 23);
    tomorrow.splice(idx + 1, tomorrow.length);

    Data.daily.shift();

    this.state = {
      data: { ...Data, tomorrow },
    };

    // Make status bar dark themed.
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
    StatusBar.setBackgroundColor({ color: "#0000" });
  }

  render() {
    const { timezone, current } = this.state.data;

    return (
      <IonPage>
        <IonContent>
          <div
            className="container-fluid p-0"
            style={{
              height: "100vh",
              position: "relative",
              backgroundColor: "#292b33",
            }}
          >
            <Hero timezone={timezone} current={current} />
            <TempMetaData
              clouds={current.clouds}
              humidity={current.humidity}
              uvi={current.uvi}
            />
            <MainBody data={this.state.data} />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Page;
