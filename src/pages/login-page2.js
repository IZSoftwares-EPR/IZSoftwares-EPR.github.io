import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import { AuthContext, setJWT } from "../context/auth-context";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { authUser } from "../utils/requests";

function UserConnectedRedirect(){
    let authCtx = useContext(AuthContext);
    if (authCtx.isAdmin){
        return (<Navigate to="/questions-admin" replace={true} />)
    }
    return (<Navigate to="/" replace={true} />)
}

export default class LoginPage2 extends React.Component {
    state = { loggedIn: false, error: null, needsActivation: null }
    render() {
        return (
            <React.Fragment>
                {this.state.loggedIn && (
                    <UserConnectedRedirect/>
                )}
                {this.state.needsActivation && (
                    <Navigate to={"/auth/login/activate-account/" + this.state.needsActivation} replace={true} />
                )}
                <section class="vh-100">
                    <div class="container-fluid h-custom">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"  />
                            </div>
                            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <Alert message={this.state.error}/>
                                <div class="divider d-flex align-items-center my-4">
                                    <p class="text-center fw-bold mx-3 mb-0">IZ EPR Login</p>
                                </div>
          
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="input-email-address">Email Address: </label>
                                    <input name="email" type="email" id="input-email-address" required class="form-control form-control-lg" placeholder="Email Address received from the system" />
                                   
                                </div>
          
                                <div class="form-outline mb-3">
                                    <label class="form-label" for="input-password">Password</label>
                                    <input name="password" type="password" id="input-password" required class="form-control form-control-lg" placeholder="Password received from the system" />
                                </div>
          
                                {/*<div class="d-flex justify-content-between align-items-center">
                                    <div class="form-check mb-0">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label class="form-check-label" for="form2Example3">
                                        Remember me
                                        </label>
                                    </div>
                                    <a href="#!" class="text-body">Forgot password?</a>
                                </div>*/}
          
                            <div class="d-grid gap-2 col-12 mx-auto text-center text-lg-start">
                                <button type="submit" class="btn btn-primary ">Login</button>
                            </div>
          
                  </form>
                </div>
              </div>
            </div>
            <div
              class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          
              <div class="text-white mb-3 mb-md-0">
                Copyright © 2023. IZSoftwares EPR Service. All Rights Reserved.
              </div>
            </div>
          </section>
          </React.Fragment>
            )
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target;
        authUser(email.value, password.value).then((jwt) => {
            setJWT(jwt);
            this.setState({ loggedIn: true })
        }).catch(error => {
            if (error.code === 403){
                this.setState({needsActivation: email.value})
            }
            this.setState({error: error.message})
        })
    }
}