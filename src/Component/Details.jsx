import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "../Styles/Details.css";
import Arka from "../Images/arka.png";
import Avatar from "../Images/Avatar.png";
import Chat from "../Images/chat.png";
import Bell from "../Images/bell.png";
import { Link } from "react-router-dom";
import { Navbar, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Cards from "./Card.jsx";
import axios from "axios";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      Name: "",
      Description: "",
      Location: "",
      Skills: "",
      Showcase: "",
      DateofBirth: "",
      DateCreated: "",
      DateUpdated: "",
      Project: ""
    };
  }

  getEngineer = async () => {
    let url = [
      "https://hiring-channel-app.herokuapp.com/api/engineer/get/detail/" +
        this.props.location.state.idengineer
    ];
    await axios
      .get(url[0])
      .then(res => {
        console.log("ahoi", res);
        let DateofBirth = res.data[0].DateofBirth;
        DateofBirth = DateofBirth.split("T");
        DateofBirth = DateofBirth[0];

        let DateCreated = res.data[0].DateCreated;
        DateCreated = DateCreated.split("T");
        DateCreated[1] = DateCreated[1].slice(0, 8);
        DateCreated = DateCreated[0] + " " + DateCreated[1];

        let DateUpdated = res.data[0].DateUpdated;
        DateUpdated = DateUpdated.split("T");
        DateUpdated[1] = DateUpdated[1].slice(0, 8);
        DateUpdated = DateUpdated[0] + " " + DateUpdated[1];

        this.setState({
          Name: res.data[0].Name,
          Title: res.data[0].Title,
          Description: res.data[0].Description,
          Location: res.data[0].Location,
          Skills: res.data[0].Skills,
          Showcase: res.data[0].Showcase,
          DateofBirth: DateofBirth,
          DateCreated: DateCreated,
          DateUpdated: DateUpdated
        });
      })
      .catch(err => console.log(err));
    console.log(this.props.company.companyBeta.id);
  };
  handlingHireButton = () => {
    const url = "https://hiring-channel-app.herokuapp.com/api/projects";

    let data = {
      id_engineer: this.props.location.state.idengineer,
      id_company: this.props.location.state.idcompany,
      name_project: this.state.Project,
      status_project: "Sent",
      status_engineer: "Received"
    };
    console.log("DETAILS : ", data);
    axios
      .post(url, data)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Engineer Hired"
        });
      })
      .catch(err =>
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Something Went Wrong"
        })
      );
  };
  componentDidMount() {
    console.log("Did Mount");
    this.getEngineer();
  }
  render() {
    const {
      Name,
      Title,
      Description,
      Skills,
      Location,
      DateofBirth,
      Showcase,
      DateCreated,
      DateUpdated
    } = this.state;

    return (
      <div className="container-home">
        <Navbar className="navbar-style">
          <Navbar.Brand>
            <img alt="Arka" src={Arka} />
          </Navbar.Brand>
          <div className="spacer"></div>
          <Link to="/home">
            <Navbar.Text id="nav-text">Home</Navbar.Text>
          </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar" />
          <div className="border-vertical"></div>
          <img src={Chat} alt="Chat" className="nav-chat" />
          <img src={Bell} alt="Bell" className="nav-bell" />
        </Navbar>
        <div className="spacer-body">
          <p className="profile">Engineer Profile </p>
        </div>
        <div className="card-container-detail">
          <Cards
            idengineer={this.props.location.state.idengineer}
            nama={Name}
            title={Title}
            description={Description}
            skills={Skills}
          />

          <div className="crud-engineer-profile">
            <p className="update-name-text-engineer">Name</p>
            <p className="update-name-control-engineer">{Name || "-"}</p>
            <p className="update-description-text-engineer">Title</p>
            <p className="update-description-control-engineer">
              {Title || "-"}
            </p>
            <p className="update-description-text-engineer">Location</p>
            <p className="update-description-control-engineer">
              {Location || "-"}
            </p>
            <p className="update-description-text-engineer">Skills</p>
            <p className="update-description-control-engineer">
              {Skills || "-"}
            </p>
            <p className="update-description-text-engineer">Showcase</p>
            <p className="update-description-control-engineer">
              {Showcase || "-"}
            </p>
            <p className="update-birthdate-text-engineer">Date of Birth</p>
            <p>{DateofBirth || "-"}</p>
            <p className="update-birthdate-text-engineer">Date Created</p>
            <p>{DateCreated || "-"}</p>
            <p className="update-birthdate-text-engineer">Date Updated</p>
            <p>{DateUpdated || "-"}</p>
            <div className="button-hire">
              <Form.Control
                className="hire-form"
                placeholder="Insert Project Name"
                type="text"
                onChange={e => this.setState({ Project: e.target.value })}
              />
              <Button
                className="button-hire-engineer"
                variant="outline-success"
                active
                onClick={e => this.handlingHireButton()}
              >
                Hire
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: state.company
  };
};

export default connect(mapStateToProps)(Details);
