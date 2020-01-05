import React, { Component } from "react";
import "../Styles/Profile.css";
import Cards from "./Card.jsx";
import CardCompany from "./CardCompany.jsx";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        {this.props.role === "engineer" ? (
          <Cards
            nama={this.props.nama}
            description={this.props.description}
            skills={this.props.skills}
            role={this.props.role}
            idengineer={this.props.idengineer}
          />
        ) : (
          <CardCompany
            nama={this.props.nama}
            description={this.props.description}
            location={this.props.location}
          />
        )}
      </div>
    );
  }
}
export default Profile;
