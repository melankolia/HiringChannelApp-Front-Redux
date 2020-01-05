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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nama: "",
      engineersBeta: [],
      companyBeta: "",
      toggleProfile: "1",
      description: "",
      skills: "",
      location: "",
      token: "",
      valueName: "",
      valueSkills: "",
      searchType: "searchName=",
      searchSkills: "searchSkills=",
      sorting: "&sorting=ASC&",
      limit: "&Limit=",
      valueLimit: "6",
      page: "&Page=",
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
      "http://localhost:8000/api/" + role + "/get/" + usernameLocal,
      `http://localhost:8000/api/engineer/search?${this.state.searchType}${this.state.valueName}${this.state.sorting}${this.state.searchSkills}${this.state.valueSkills}${this.state.limit}${this.state.valueLimit}${this.state.page}${Page}`,
      "http://localhost:8000/api/projects"
    ];

    const config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal }
    };

    await axios
      .get(url[0], config)

      .then(res => {
        this.setState({
          id: res.data[0].id,
          nama: res.data[0].Name,
          description: res.data[0].Description,
          location: res.data[0].Location,
          skills: res.data[0].Skills,
          role: role,
          currentPage: res.data[0].currentPage,
          companyBeta: res.data[0]
        });
      })

      .catch(err => console.log(err));

    // await axios
    //   .get(url[1], config)
    //   .then(res => {
    //     this.setState({
    //       engineersBeta: res.data.data.response,
    //       totalPage: res.data.data.totalpage,
    //       currentPage: res.data.data.currentPage
    //     });
    //   })
    //   .catch(err => console.log(err));
    await this.props.dispatch(getAllEngineer(config));
    const engineersBeta = await this.props.engineersBeta;
    console.log(engineersBeta)
    this.setState({
      engineersBeta: engineersBeta
    });

    await axios
      .get(url[2], { params: { id_company: this.state.id } })
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
    // let role = localStorage.getItem('role :')
    let searchName = Name || "";
    let searchSkill = Skill || "";

    console.log(
      `http://localhost:8000/api/engineer/search?${this.state.searchType}${searchName}${this.state.sorting}${this.state.searchSkills}${searchSkill}${this.state.limit}${this.state.valueLimit}${this.state.page}${this.state.valuePage}`
    );
    const url = [
      `http://localhost:8000/api/engineer/search?${this.state.searchType}${searchName}${this.state.sorting}${this.state.searchSkills}${searchSkill}${this.state.limit}${this.state.valueLimit}${this.state.page}${this.state.valuePage}`
    ];

    this.setState({
      valueName: searchName,
      valueSkills: searchSkill,
      link: url[0]
    });

    const config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal }
    };

    await axios
      .get(url[0], config)
      .then(res => {
        this.setState({
          engineersBeta: res.data.data.response,
          totalPage: res.data.data.totalpage,
          currentPage: res.data.data.currentPage
        });
      })
      .catch(err => console.log(err));
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
    const url = [
      `http://localhost:8000/api/engineer/search?${this.state.searchType}${this.state.valueName}${this.state.sorting}${this.state.searchSkills}${this.state.valueSkills}${this.state.limit}${this.state.valueLimit}${this.state.page}${Page}`
    ];
    const config = {
      headers: { Authorization: "Bearer " + token, username: usernameLocal }
    };

    await axios
      .get(url[0], config)
      .then(res => {
        this.setState({
          engineersBeta: res.data.data.response,
          currentPage: res.data.data.currentPage
        });
      })
      .catch(err => console.log(err));
  };
  patchCompany = async () => {
    let usernameLocal = localStorage.getItem("username :");
    let token = localStorage.getItem("token :");
    const url = "http://localhost:8000/api/company/" + parseInt(this.state.id);
    let data = {
      Name: this.state.nama,
      Description: this.state.description,
      Location: this.state.location
    };
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
    console.log(this.props.user)
  }

  render() {
    const { skills, role } = this.state;
    const { Name, Description, Location } = this.state.companyBeta;
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
                idcompany={this.state.id}
                idengineer={this.state.engineersBeta[idx].id}
                nama={this.state.engineersBeta[idx].Name}
                skills={this.state.engineersBeta[idx].Skills}
                description={this.state.engineersBeta[idx].Description}
                role={role}
              />
            ))

          ) : this.state.toggleProfile === "2" ||
            this.state.toggleProfile === "3" ? (
            <Profile
              nama={Name}
              description={Description}
              skills={skills}
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
                defaultValue={this.state.nama}
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
                defaultValue={this.state.description}
                onChange={e => {
                  this.setState({ description: e.target.value });
                  console.log(e.target.value);
                }}
              />
              <Form.Label className="update-location-text">Location</Form.Label>
              <Form.Control
                className="update-location-control"
                type="text"
                defaultValue={this.state.location}
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
    engineersBeta: state.user.engineersBeta
  };
};

export default connect(mapStateToProps)(Home);
