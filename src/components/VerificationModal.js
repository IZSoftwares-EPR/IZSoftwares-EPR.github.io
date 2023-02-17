import { useState } from "react"
import Alert from "./Alert"

export default function VerificationModal({ onSubmit, error }) {
    const [code, setCode] = useState("")
    return (
        <div className="modal fade" id="verificationModal" tabIndex="-1" aria-labelledby="verificationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="verificationModalLabel">Verify Code</h1>
                    </div>
                    <div className="modal-body">
                        <Alert message={error}/>
                        A code has been sent to your email please verify your code.
                        <div className="mt-3">
                            <label htmlFor="code-input">Enter the Code</label>
                            <input type="text" id="code-input" className="form-control" value={code} onInput={(e) => setCode(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary w-100" onClick={() => onSubmit(code)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>)
}