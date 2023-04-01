import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import VerificationModal from "../components/VerificationModal";
import { setJWT } from "../context/auth-context";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { updatePasswordDefault, verificationCode } from "../utils/requests";
class ActivateAccount extends React.Component {
    state = { modalError: null, error: null, success: false, email: this.props.params.email }
    componentDidMount() {
        window.$('#verificationModal').modal({ backdrop: 'static', keyboard: false })
        window.$('#verificationModal').modal('show')
    }
    verifyCode(code) {
        verificationCode(this.state.email, code)
            .then((isValid) => isValid ? window.$('#verificationModal').modal("hide") : this.setState({ modalError: "Wrong code!" }))
    }
    handleSubmit(e) {
        e.preventDefault();
        let form = e.target;
        if (form.password.value !== form.password1.value) {
            return this.setState({ error: "Confirm password doesn't match New password" })
        }
        updatePasswordDefault(this.state.email, form.password0.value, form.password.value).then((data) => {
            setJWT(data)
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
                            <label htmlFor="password-field">Default Password (Email)</label>
                            <input name="password0" type="password" className="form-control" id="password-field" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-field">New Password</label>
                            <input name="password" type="password" className="form-control" id="password-field" />
                        </div>
                        <div>
                            <label htmlFor="password-confirm-field">Confirm Password</label>
                            <input name="password1" type="password" className="form-control" id="password-confirm-field" />
                        </div>
                        <button type="submit" className="btn w-100 btn-primary mt-3">Change Password</button>
                    </form>
                </AlignedCenterLayout>
            </React.Fragment>
        )
    }
}
export default function Component() {
    let params = useParams()
    return (<ActivateAccount params={params}></ActivateAccount>)
}