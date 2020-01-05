import React, { Component } from "react";
import "../Styles/Cards.css";
import check from "../Images/check.png";
import star from "../Images/star.png";
import "sweetalert2/src/sweetalert2.scss";
import { Link } from "react-router-dom";
import axios from 'axios'

class Cards extends Component {
  constructor(){
    super()
    this.state = {
      totalProject: "0",
      totalSuccessRate: "0"
    };
  }
  getprojects = async () => {
    let url = ['http://localhost:8000/api/projects/' + this.props.idengineer]
    await axios
      .get(url[0])
      .then(res => {

        this.setState({
          totalProject: res.data.data.project,
          totalSuccessRate: res.data.data.successrate
        })
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getprojects()
  }
  render() {
    const {totalProject, totalSuccessRate} = this.state
    let Background = [
      require("../Images/yucel.png"),
      require("../Images/luis.png"),
      require("../Images/alina.png"),
      require("../Images/craig.png"),
      require("../Images/lucas.png"),
      require("../Images/jonathan.png")
    ];
    let randomBack = Math.floor(Math.random() * 6);

    return this.props.role === "company" ? (
      <Link
        to={{
          pathname: "/engineer/detail",
          state: {
            idengineer: this.props.idengineer,
            idcompany: this.props.idcompany
          }
        }}
      >
        <div
          className="card-style"
          style={{ backgroundImage: `url(${Background[randomBack]})` }}
        >
          <div className="overlay-card">
            <p className="text-card">{this.props.nama}</p>
            <div className="text-card-description">
              <p className="text-description">{this.props.description}</p>
              <div className="project-success">
                <img src={check} alt="check-ico" />
                <p className="text-project">{totalProject} Project</p>
                <img src={star} alt="star-ico" className="img-project" />
                <p className="text-success">{totalSuccessRate} Success Rate</p>
              </div>
            </div>

            <p className="text-card-skills">Skills: {this.props.skills}</p>
          </div>
        </div>
      </Link>
    ) : (
      <div
        className="card-style"
        style={{ backgroundImage: `url(${Background[randomBack]})` }}
      >
        <div className="overlay-card">
          <p className="text-card">{this.props.nama}</p>
          <div className="text-card-description">
            <p className="text-description">{this.props.description}</p>
            <div className="project-success">
              <img src={check} alt="check-ico" />
              <p className="text-project">{totalProject} Project</p>
              <img src={star} alt="star-ico" className="img-project" />
              <p className="text-success">{totalSuccessRate} Success Rate</p>
            </div>
          </div>

          <p className="text-card-skills">Skills: {this.props.skills}</p>
        </div>
      </div>
    );
  }
}

export default Cards;
