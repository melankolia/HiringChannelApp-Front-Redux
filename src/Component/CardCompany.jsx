import React, { Component } from "react";
import "../Styles/CardCompany.css";
import check from "../Images/check.png";

class CardCompany extends Component {
  state = {
    totalProject: "47",
    totalSuccessRate: "100%"
  };

  render() {
    let Background = [
      require("../Images/yucel.png"),
      require("../Images/luis.png"),
      require("../Images/alina.png"),
      require("../Images/craig.png"),
      require("../Images/lucas.png")
    ];
    let randomBack = Math.floor(Math.random() * 5);
    return (
      <div
        className="card-style-company"
        style={{ backgroundImage: `url(${Background[randomBack]})` }}
      >
        <div className="overlay-card-company">
          <p className="text-card-company">{this.props.nama}</p>
          <div className="text-card-description-company">
            <p className="text-description-company">{this.props.description}</p>
            <div className="project-success-company">
              <img src={check} alt="check-ico" />
              <p className="text-project-company">
                Location : {this.props.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardCompany;
