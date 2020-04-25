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
    this.state = {
      data: Data,
    };

    // Make status bar dark themed.
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
  }

  render() {
    const { timezone, current } = this.state.data;

    return (
      <IonPage>
        <IonContent>
          <div
            className="container-fluid p-0 bg-dark"
            style={{ height: "100vh", position: "relative" }}
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
