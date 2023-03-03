import React from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import VerificationModal from "../components/VerificationModal";
import { setUserVerified } from "../context/auth-context";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { updatePasswordDefault, verificationCode } from "../utils/requests";
export default class ActivateAccount extends React.Component {
    state = { modalError: null, error: null, success: false }
    componentDidMount() {
        window.$('#verificationModal').modal({ backdrop: 'static', keyboard: false })
        window.$('#verificationModal').modal('show')
    }
    verifyCode(code) {
        verificationCode(code)
            .then((isValid) => isValid ? window.$('#verificationModal').modal("hide") : this.setState({ modalError: "Wrong code!" }))
    }
    handleSubmit(e) {
        e.preventDefault();
        let form = e.target;
        if (form.password.value !== form.password1.value) {
            return this.setState({ error: "Passwords donot match" })
        }
        updatePasswordDefault(form.password0.vale, form.password.value).then(() => {
            setUserVerified(true)
            this.setState({success: true})
        }).catch((e) => this.setState({ error: e.message }))
    }
    render() {
        return (
            <React.Fragment>
                <VerificationModal onSubmit={this.verifyCode.bind(this)} error={this.state.modalError} />
                {
                    this.state.success && (
                        <Navigate to="/" replace={true}/>
                    )
                }
                <AlignedCenterLayout>
                    <form className="align-self-center flex-form" onSubmit={this.handleSubmit.bind(this)}>
                        <Alert message={this.state.error} />
                        <div className="mb-3">
                            <label htmlFor="password-field">Current Password</label>
                            <input name="password0" type="password" className="form-control" id="password-field" />
                        </div>
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