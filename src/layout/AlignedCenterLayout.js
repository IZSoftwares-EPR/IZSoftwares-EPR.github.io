export default function AlignedCenterLayout({children}){
    return (
        <div className="container d-flex h-100 justify-content-center">
            {children}
        </div>
    )
}