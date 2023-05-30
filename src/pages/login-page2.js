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
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"  />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <Alert message={this.state.error}/>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">IZ EPR Login</p>
                                </div>
          
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="input-email-address">Email Address: </label>
                                    <input name="email" type="email" id="input-email-address" required className="form-control form-control-lg" placeholder="Email Address received from the system" />
                                   
                                </div>
          
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="input-password">Password</label>
                                    <input name="password" type="password" id="input-password" required className="form-control form-control-lg" placeholder="Password received from the system" />
                                </div>
          
                                {/*<div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>*/}
          
                            <div className="d-grid gap-2 col-12 mx-auto text-center text-lg-start">
                                <button type="submit" className="btn btn-primary ">Login</button>
                            </div>
          
                  </form>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          
              <div className="text-white mb-3 mb-md-0">
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