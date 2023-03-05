import React from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import { setJWT } from "../context/auth-context";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { authUser } from "../utils/requests";

export default class LoginPage extends React.Component {
    state = { loggedIn: false, error: null, needsActivation: null }
    render() {
        return (
            <React.Fragment>
                {this.state.loggedIn && (
                    <Navigate to="/" replace={true} />
                )}
                {this.state.needsActivation && (
                    <Navigate to={"/auth/login/activate-account/" + this.state.needsActivation} replace={true} />
                )}
                <AlignedCenterLayout>
                    <form onSubmit={this.handleSubmit.bind(this)} id="login-form" className="flex-form align-self-center">
                        <Alert message={this.state.error}/>
                        <div className="form-control-group mb-3">
                            <label htmlFor="input-email-address">Email Address</label>
                            <input name="email" type="email" className="form-control" id="input-email-address" required />
                        </div>
                        <div className="form-control-group mb-3">
                            <label htmlFor="input-password">Password</label>
                            <input name="password" type="password" className="form-control" id="input-password" required />
                        </div>
                        <button type="submit" className="btn w-100 btn-primary">Login</button>
                    </form>
                </AlignedCenterLayout>
            </React.Fragment>)
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