import React from "react";
import profile from '../../assets/profile.png';
import logo from '../../assets/logo.jpg';
import "./HeaderComponent.scss";
function HeaderComponent(props: any) {
    return (
        <div className="header">
            <div className="header_logo">
                <img src={logo} alt="Logo" />
            </div>
            {props.iconColor && (
            <div className="cd-3">
            <div className="cd-3_notifications">
                {props.parsedData.SeatBelt === "false" && props.livestream && props.img ? (
                    <h5>
                        {`Hi ${props.parsedDataname.name}, please wear a seatbelt.`}
                    </h5>
                ) : (
                    ""
                )}

                {props.parsedData.Drinking === "true" && props.livestream && props.img ? (
                    <h5>
                        {`Hi ${props.parsedDataname.name}, please do not drink while driving.`}
                    </h5>
                ) : (
                    ""
                )}

                {props.parsedData.MobilePhone === "true" && props.livestream && props.img ? (
                    <h5>
                        {`Hi ${props.parsedDataname.name}, please do not use phone while driving.`}
                    </h5>
                ) : (
                    ""
                )}

                {props.parsedData.Smoking === "true" && props.livestream && props.img ? (
                    <h5>
                        {`Hi ${props.parsedDataname.name}, please do not smoke while driving.`}
                    </h5>
                ) : (
                    ""
                )}
            </div>
            </div>
             )}
            <div className="header_profile">
                <div className="header_profile--greet">
                    Hi
                    <div className="header_profile--greetName">{props.parsedDataname.name}</div>
                </div>
                <div className="header_profile--img">
                    {props.parsedDataname.url === "" ? (
                        <img src={profile} width="40px" height="40px" alt="profile"></img>
                    ) : (
                        <img
                            src={props.parsedDataname.url}
                            width="40px"
                            height="40px"
                            alt="profile"
                        ></img>
                    )}
                </div>
            </div>
        </div>


    );
}
export default HeaderComponent