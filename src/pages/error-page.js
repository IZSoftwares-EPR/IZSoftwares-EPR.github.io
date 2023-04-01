import React from "react";
export default function ErrorPage(){
    return (
        <React.Fragment>
            <div>
                <div class="container text-center">
                    <div class="row">
                        <div class="col-sm-10 col-md-10 col-lg-12">
                            <h1 style={{fontWeight: 'bold'}}>Oops!</h1>
                        </div>
                        <div class="col-sm-10 col-md-10 col-lg-12">
                            <h4 style={{fontWeight: 'bold', color: 'red'}}>
                                HTTP Error 404 <span style={{color: 'black', fontWeight: 'normal'}}>- Page Not Found</span>
                            </h4>
                        </div>
                        <div class="col-sm-10 col-md-10 col-lg-12">
                            <p style={{ fontStyle: 'oblique'}}>
                            The Page you are looking for might have been removed,
                            had its name changed, or is temporarily unavailable.
                            </p>
                        </div>
                        <div class="col-sm-10 col-md-10 col-lg-12">
                            <p style={{ fontStyle: 'oblique'}}>
                            If you typed the page address in the Address bar, make sure that it is spelled correctly.
                            </p>
                        </div>
                        <div class="col-sm-10 col-md-10 col-lg-12">
                            <button class="btn btn-primary" type="button" href="/">HOMEPAGE</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}