import { IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import { Plugins, StatusBarStyle } from "@capacitor/core";
import Axios from "axios";

import "./Home.css";
import MainBody from "../components/MainBody/MainBody";
import Hero from "../components/Hero/Hero";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import TempMetaData from "../components/TempMetaData/TempMetaData";

import Data from "../components/Data";
import API from "../models/API";
import Hour from "../models/Hourly";

const { StatusBar, Geolocation, App, LocalNotifications } = Plugins;

interface State {
  isLoading: Boolean;
  data: API;
}

class Page extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    /* Filter Hourly Data till 23:00 and for tomorrow */
    let idx = Data.hourly.findIndex(
      (hr: Hour) => new Date(hr.dt * 1000).getHours() === 23
    );
    let tomorrow = Data.hourly.splice(idx + 1, Data.hourly.length);
    idx = tomorrow.findIndex(
      (hr: Hour) => new Date(hr.dt * 1000).getHours() === 23
    );
    tomorrow.splice(idx + 1, tomorrow.length);

    Data.daily.shift();
    this.state = {
      isLoading: true,
      data: { ...Data, tomorrow },
    };

    // Make status bar dark themed.
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
    StatusBar.setOverlaysWebView({
      overlay: true,
    }).catch((e) => {});
  }
  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        long: coordinates.coords.longitude,
        lat: coordinates.coords.latitude,
      };
    } catch (e) {
      if (e.message && e.message === "location unavailable") {
        alert("Please enable GPS :)");
        App.exitApp();
      } else if (e.message && e.message === "User denied location permission") {
        alert(
          "Please provide location permission. Enable it from Settings->Apps->WeatherApp->Permissions"
        );
        App.exitApp();
      } else {
        alert(JSON.stringify(e));
        App.exitApp();
      }
      return { long: 0, lat: 0 };
    }
  }

  async componentDidMount() {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Title",
          body: "Body",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          smallIcon: "file://icon/not.png",
        },
      ],
    });
    console.log("scheduled notifications", notifs);

    // const position = await this.getCurrentPosition();
    // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.long}&appid=b6c09e7b9410a1efbfb9dbe93b297cb5&units=metric`;
    // const { data } = await Axios.get(url);

    // /* Filter Hourly Data till 23:00 and for tomorrow */
    // let idx = data.hourly.findIndex(
    //   (hr: Hour) => new Date(hr.dt * 1000).getHours() === 23
    // );
    // let tomorrow = data.hourly.splice(idx + 1, data.hourly.length);
    // idx = tomorrow.findIndex(
    //   (hr: Hour) => new Date(hr.dt * 1000).getHours() === 23
    // );
    // tomorrow.splice(idx + 1, tomorrow.length);

    // data.daily.shift();

    // this.setState({ data: { ...data, tomorrow }, isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <IonPage>
        <IonContent>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div
              className="container-fluid p-0 pt-5"
              style={{
                height: "100vh",
                position: "relative",
                backgroundColor: "#292b33",
              }}
            >
              <Hero
                timezone={this.state.data.timezone}
                current={this.state.data.current}
              />
              <TempMetaData
                clouds={this.state.data.current.clouds}
                humidity={this.state.data.current.humidity}
                uvi={this.state.data.current.uvi}
              />
              <MainBody data={this.state.data} />
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  }
}

export default Page;
