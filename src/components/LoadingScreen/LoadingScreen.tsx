import React, { Component } from "react";

export default class LoadingScreen extends Component {
  render() {
    return (
      <div
        className="h-100 d-flex align-items-center w-100"
        style={{
          backgroundColor: "#292b33",
        }}
      >
        <img src="assets/icons/loading.svg" alt="loading" />
      </div>
    );
  }
}
