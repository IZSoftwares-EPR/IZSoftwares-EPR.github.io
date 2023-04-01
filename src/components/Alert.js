export default function Alert({ message }) {
    return (
        <span>
            {
                message &&
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            }
        </span>
    )
}