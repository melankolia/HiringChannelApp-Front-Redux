import { Form } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import arkWhite from "../Images/ark-white1.png";
import piclogin from "../Images/imageleftlogin.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import axios from "axios";
import "../Styles/Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      token: "",
      message: ""
    };
  }

  login = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    };

    axios
      .post("http://localhost:8000/auth/login", data)
      .then(res => {
        if (res.data.status === 200) {
          this.setState({
            message: "Login success",
            token: res.data.token
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Login Success"
          });
        } else if (res.data.status === "error") {
          this.setState({
            message: "Login Failed!"
          });
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Login Failed!"
          });
        }
      })
      .catch(err => {
        this.setState({
          message: "Login Failed!"
        });
      });
  };

  componentDidUpdate = res => {
    //dijalankan setelah ada data (state dan/atau props) yang berubah
    if (this.state.message === "Login success") {
      localStorage.setItem("username :", this.state.username);
      localStorage.setItem("token :", this.state.token);
      localStorage.setItem("role :", this.state.role);
      if (this.state.role === "company") {
        this.props.history.push("/home");
      } else if (this.state.role === "engineer") {
        this.props.history.push("/engineer");
      }
    }
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={7}>
          <div className="left">
            <img className="arkawhite" src={arkWhite} alt="arkwhite" />
            <img className="piclogin" src={piclogin} alt="piclogin" />
            <div className="description">
              <p className="description-header">
                Hire expert freelancers for any job, online
              </p>
              <p className="description-footer">
                Millions of small businesses use Freelancer to turn their ideas
                into reality.
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={5}>
          <div className="right">
            <p className="textlogin">Login</p>
            <div className="form">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="inputUsername">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="inputPassword">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label-role">Role</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => this.setState({ role: e.target.value })}
                  >
                    <option></option>
                    <option>engineer</option>
                    <option>company</option>
                  </Form.Control>
                </Form.Group>
                <p className="forget">Forgot Password ?</p>
                <button
                  className="button-login"
                  size="lg"
                  onClick={e => {
                    this.login(e);
                  }}
                >
                  Login
                </button>
                <button
                  className="button-register-form-login"
                  size="lg"
                  onClick={e => {
                    //login dulu trus navigasi
                    this.props.history.push("/register");
                  }}
                >
                  Register
                </button>
              </Form>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
