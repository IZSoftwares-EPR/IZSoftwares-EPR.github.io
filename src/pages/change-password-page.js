import React from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { updatePassword } from "../utils/requests";
export default class ChangePasswordPage extends React.Component {
    state = { error: null, success: false }
    handleSubmit(e) {
        e.preventDefault();
        let form = e.target;
        if (form.password.value !== form.password1.value) {
            return this.setState({ error: "Passwords donot match" })
        }
        updatePassword(form.password.value).then(() => {
            this.setState({success: true})
        }).catch((e) => this.setState({ error: e.message }))
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.state.success && (
                        <Navigate to="/" replace={true}/>
                    )
                }
                <AlignedCenterLayout>
                    <form className="align-self-center flex-form" onSubmit={this.handleSubmit.bind(this)}>
                        <Alert message={this.state.error} />
                        <div className="mb-3">
                            <label htmlFor="password-field">Type new Password</label>
                            <input name="password" type="password" className="form-control" id="password-field" />
                        </div>
                        <div>
                            <label htmlFor="password-confirm-field">Confirm new Password</label>
                            <input name="password1" type="password" className="form-control" id="password-confirm-field" />
                        </div>
                        <button type="submit" className="btn w-100 btn-primary mt-3">Change Password</button>
                    </form>
                </AlignedCenterLayout>
            </React.Fragment>
        )
    }
}