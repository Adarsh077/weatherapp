import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const Segments = (props: any) => {
  const { selectedTab, handleSegmentSwitch } = props;
  return (
    <IonSegment
      defaultValue={selectedTab}
      onIonChange={(e) => handleSegmentSwitch(e.detail.value)}
      className="segment"
    >
      <IonSegmentButton
        mode="ios"
        value="0"
        className={`segment-button ${selectedTab === 0 && "active"}`}
      >
        <IonLabel>Today</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton
        mode="ios"
        value="1"
        className={`segment-button ${selectedTab === 1 && "active"}`}
      >
        <IonLabel>Tomorrow</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton
        mode="ios"
        value="2"
        className={`segment-button ${selectedTab === 2 && "active"}`}
      >
        <IonLabel>Next 7 days </IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default Segments;
