import { Navbar, NavDropdown, Form, Button, Table } from "react-bootstrap";
import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "../Styles/Home.css";
import Arka from "../Images/arka.png";
import Avatar from "../Images/Avatar.png";
import Chat from "../Images/chat.png";
import Bell from "../Images/bell.png";
import { Link } from "react-router-dom";
import Cards from "./Card.jsx";
import Profile from "./Profile.jsx";
import axios from "axios";
import { connect } from "react-redux";
import { getAllEngineer } from "../Redux/Actions/user";
import { getCompany } from "../Redux/Actions/company";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      nama:'',
      description:'',
      location:'',
      engineersBeta: [],
      role: '',
      companyBeta: '',
      toggleProfile: "1",
      token: "",
      valueName: "",
      valueSkills: "",
      valueLimit: 6,
      currentPage: "",
      valuePage: "1",
      totalPage: "",
      link: "",
      projects: []
    };
  }

  logout = e => {
    localStorage.removeItem("token :");
    this.setState({
      engineersBeta: []
    });
    this.props.history.push("/login");
  };
  toggleProfileFun = toggle => {
    this.setState({
      toggleProfile: toggle
    });
  };
  getAllengineer = async () => {
    let usernameLocal = localStorage.getItem("username :");
    let token = localStorage.getItem("token :");
    let role = localStorage.getItem("role :");
    let Page = this.state.totalPage || 1;

    if (!token) {
      this.props.history.push("/login");
    }

    const url = [
      "https://hiring-channel-app.herokuapp.com/api/" + role + "/get/" + usernameLocal,
      "https://hiring-channel-app.herokuapp.com/api/projects"
    ];

    let config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal }
    };

    await this.props.dispatch(getCompany(config, usernameLocal));
    const companyBeta = await this.props.company.companyBeta;
    this.setState({
      role:role,
      companyBeta: companyBeta
    })
    console.log('Company Beta : ', companyBeta);

    config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal },
      params: {
        searchName: this.state.valueName,
        orting: "ASC",
        searchSkills: this.state.valueSkills,
        Limit: this.state.valueLimit,
        Page: Page
      }
    };

    await this.props.dispatch(getAllEngineer(config));
    const engineersBeta = await this.props.Home.engineersBeta;
    const totalPage = await this.props.Home.totalPage;
    const currentPage = await this.props.Home.currentPage;

    console.log(engineersBeta);
    console.log(totalPage);
    console.log(currentPage);
    this.setState({
      engineersBeta: engineersBeta,
      totalPage: totalPage,
      currentPage: currentPage
    });

    await axios
      .get(url[1], { params: { id_company: this.state.companyBeta.id } })
      .then(res => {
        this.setState({
          projects: res.data.data
        });
      })
      .catch(err => console.log(err));
  };
  searching = async (Name, Skill) => {
    let usernameLocal = localStorage.getItem("username :");
    let token = localStorage.getItem("token :");
    let searchName = Name || "";
    let searchSkill = Skill || "";

    const config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal },
      params: {
        searchName: searchName,
        sorting: "ASC",
        searchSkills: searchSkill,
        Limit: this.state.valueLimit,
        Page: this.state.valuePage
      }
    };

    await this.props.dispatch(getAllEngineer(config));
    const engineersBeta = await this.props.Home.engineersBeta;
    const totalPage = await this.props.Home.totalPage;
    const currentPage = await this.props.Home.currentPage;

    console.log(engineersBeta);
    console.log(totalPage);
    console.log(currentPage);
    this.setState({
      nama: engineersBeta[0].Name,
      title: engineersBeta[0].Title,
      location: engineersBeta[0].Location,
      engineersBeta: engineersBeta,
      currentPage: currentPage
    });
  };

  pagination = async textPage => {
    let usernameLocal = localStorage.getItem("username :");
    let token = localStorage.getItem("token :");
    let Page = 1;
    if (textPage === "Left") {
      Page = parseInt(this.state.currentPage) - 1;
    } else if (textPage === "Right") {
      Page = parseInt(this.state.currentPage) + 1;
    }

    if (Page > this.state.totalPage) {
      Page = parseInt(this.state.totalPage);
    }
    if (Page <= 0) {
      Page = 1;
    }

    let config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal },
      params: {
        searchName: this.state.valueName,
        sorting: "ASC",
        searchSkills: this.state.valueSkills,
        Limit: this.state.valueLimit,
        Page: Page
      }
    };

    await this.props.dispatch(getAllEngineer(config));
    const engineersBeta = await this.props.Home.engineersBeta;
    const totalPage = await this.props.Home.totalPage;
    const currentPage = await this.props.Home.currentPage;

    console.log(engineersBeta);
    console.log(totalPage);
    console.log(currentPage);
    this.setState({
      engineersBeta: engineersBeta,
      currentPage: currentPage
    });
  };
  patchCompany = async () => {
    let usernameLocal = localStorage.getItem("username :");
    let token = localStorage.getItem("token :");
    const url =
      "https://hiring-channel-app.herokuapp.com/api/company/" +
      parseInt(this.state.companyBeta.id);
    let data = {
      Name: this.state.nama,
      Description: this.state.description,
      Location: this.state.location
    };
    console.log(data)
    let headers = { Authorization: "Bearer " + token, username: usernameLocal };
    await axios
      .patch(url, null, {
        headers: headers,
        params: data
      })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile Updated"
        });
        this.getAllengineer();
      })
      .catch(err =>
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Update Failed"
        })
      );
  };

  componentDidMount() {
    console.log("Did Mount");
    this.getAllengineer();
  }

  render() {
    const { role } = this.state;
    const { id, Name, Description, Location } = this.state.companyBeta;
    console.log("Render");

    if (role === "engineer") {
      this.logout();
    }
    return (
      <div className="container-home">
        <Navbar className="navbar-style">
          <Navbar.Brand>
            <img alt="Arka" src={Arka} />
          </Navbar.Brand>
          <input
            className="navbar-search"
            type="text"
            name="search"
            placeholder="Search.."
            onKeyPress={({ key, target }) => {
              if (key === "Enter") {
                this.searching(target.value);
              }
            }}
          ></input>
          <Link to="/home">
            <Navbar.Text
              id="nav-text"
              onClick={e => this.toggleProfileFun("1")}
            >
              Home
            </Navbar.Text>
          </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar" />

          <NavDropdown title={Name || "Name"} id="nav-dropdown">
            <NavDropdown.Item onClick={e => this.toggleProfileFun("2")}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={e => this.toggleProfileFun("3")}>
              Project Status
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={e => {
                this.logout(e);
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>

          <div className="border-vertical"></div>
          <img src={Chat} alt="Chat" className="nav-chat" />
          <img src={Bell} alt="Bell" className="nav-bell" />
        </Navbar>
        {this.state.toggleProfile === "1" && role === "company" ? (
          <div className="searching-type">
            <input
              className="navbar-search-skill"
              type="text"
              name="search"
              placeholder="Search Skills"
              onKeyPress={({ key, target }) => {
                let _ = "";
                if (key === "Enter") {
                  this.searching(_, target.value);
                }
              }}
            ></input>
            <Form.Control
              className="select-page"
              as="select"
              onChange={e => this.setState({ valueLimit: e.target.value })}
            >
              <option>6</option>
              <option>12</option>
              <option>18</option>
            </Form.Control>
            <Button
              variant="outline-secondary"
              className="button-apply1"
              size="sm"
              onClick={e => {
                this.setState({ sorting: "&sorting=ASC&" });
              }}
            >
              Asc
            </Button>
            <Button
              variant="outline-secondary"
              className="button-apply2"
              size="sm"
              onClick={e => {
                this.setState({ sorting: "&sorting=DESC&" });
              }}
            >
              Desc
            </Button>
            <Button
              variant="outline-secondary"
              className="button-apply3"
              size="sm"
              active
              onClick={e => {
                this.searching(this.state.valueName, this.state.valueSkills);
              }}
            >
              Apply
            </Button>
          </div>
        ) : (
          <div className="searching-type"></div>
        )}
        <div className="card-container">
          {this.state.toggleProfile === "1" ? (
            this.state.engineersBeta.map((_, idx) => (
              <Cards
                key={idx}
                idcompany={id}
                idengineer={this.state.engineersBeta[idx].id}
                nama={this.state.engineersBeta[idx].Name}
                skills={this.state.engineersBeta[idx].Skills}
                title={this.state.engineersBeta[idx].Title}
                role={role}
              />
            ))
          ) : this.state.toggleProfile === "2" ||
            this.state.toggleProfile === "3" ? (
            <Profile
              nama={Name}
              description={Description}
              role={role}
              location={Location}
            />
          ) : null}
          {this.state.toggleProfile === "2" ? (
            <div className="crud-engineer">
              <div>
                <Form.Label className="update-company-text">
                  Company Profile
                </Form.Label>
              </div>
              <Form.Label className="update-name-text">Name</Form.Label>
              <Form.Control
                className="update-name-control"
                type="text"
                defaultValue={Name}
                onChange={e => {
                  this.setState({ nama: e.target.value });
                  console.log(e.target.value);
                }}
              />
              <Form.Label className="update-description-text">
                Description
              </Form.Label>
              <Form.Control
                className="update-description-control"
                as="textarea"
                rows="3"
                defaultValue={Description}
                onChange={e => {
                  this.setState({ title: e.target.value });
                  console.log(e.target.value);
                }}
              />
              <Form.Label className="update-location-text">Location</Form.Label>
              <Form.Control
                className="update-location-control"
                type="text"
                defaultValue={Location}
                onChange={e => {
                  this.setState({ location: e.target.value });
                  console.log(e.target.value);
                }}
              />
              <Button
                variant="success"
                className="update-button"
                active
                onClick={e => {
                  this.patchCompany();
                }}
              >
                Update
              </Button>
            </div>
          ) : this.state.toggleProfile === "3" ? (
            <div className="crud-engineer-projectlist">
              <p className="project-list"> Project List </p>
              <Table striped bordered hover size="sm" responsive>
                <thead className="table-projectlist">
                  <tr>
                    <th>Engineer</th>
                    <th>Project</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.projects.map((_, idx) => (
                    <tr key={idx}>
                      <td>{this.state.projects[idx].EngineerName}</td>
                      <td>{this.state.projects[idx].name_project}</td>
                      <td>{this.state.projects[idx].status_project}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : null}
        </div>
        {this.state.toggleProfile === "1" ? (
          <div className="page-section">
            <Button
              className="button-page"
              onClick={e => {
                this.pagination("Left");
              }}
            >
              &laquo;
            </Button>
            <p className="text-page">
              {this.state.currentPage} of {this.state.totalPage}
            </p>
            <Button
              className="button-page"
              onClick={e => {
                this.pagination("Right");
              }}
            >
              &raquo;
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Home: state.user,
    company: state.company
  };
};

export default connect(mapStateToProps)(Home);
