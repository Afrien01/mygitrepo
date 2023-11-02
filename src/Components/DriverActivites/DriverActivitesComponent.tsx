import React from "react";
import "./DriverActivitesComponent.scss";
// import seatbelt from "../../assets/seatbelt-icon.svg";
import seatbelt from "../../assets/seatbelt.svg";
import phone from "../../assets/phone.svg";
import drinking from "../../assets/drinking.svg";
import smoke from "../../assets/smoke.svg";
import drowsy from "../../assets/drowsy.svg";
import active from "../../assets/active.svg";
function DriverActivitesComponent(props: any) {
  return (
    <div className="container_right">

      {/* seatbelt */}
      {props.initialIconColor && (
        <div className="container_right--state">
          <h1>Seatbelt </h1>
          <img
            src={seatbelt}
            className={`container_right--img`}
            alt="seatbelt"
          ></img>{" "}
        </div>
      )}
      {props.iconColor && (
        <div className="container_right--state">
          <h1 margin-right="4vh">Seatbelt </h1>{" "}
          <img
            src={seatbelt}
            className={`container_right--img${props.parsedData.SeatBelt === "true" &&
              (!props.livestream || props.img)
              ? "--active"
              : "--notactive"
              }`}
            alt="seatbelt"
         
          ></img>{" "}
        </div>
      )}

      {props.initialIconColor && (
        <div className="container_right--state">
          <h1>Phone </h1>
           <img
            src={phone}
            className={`container_right--phoneimg`}
            alt="seatbelt"
          ></img>
        </div>
      )}
      {props.iconColor && (
        <div className="container_right--state">
          <h1 margin-right="">Phone </h1>
         
          <img
            src={phone}
            className={`container_right--phoneimg${props.parsedData.MobilePhone === "true" &&
              (!props.livestream || props.img)
              ? "--active"
              : "--notactive"
              }`}
            alt="phone"
         
          ></img>{" "}
        </div>
      )}

      {/* Smoking */}

      {props.initialIconColor && (
        <div className="container_right--state">
          <h1>Smoking </h1>
         
           <img
            src={smoke}
            className={`container_right--phoneimg`}
            alt="seatbelt"
          ></img>
        </div>
      )}
      {props.iconColor && (
        <div className="container_right--state">
          <h1>Smoking</h1>
         
           <img
            src={smoke}
            className={`container_right--phoneimg${props.parsedData.Smoking  === "true" &&
              (!props.livestream || props.img)
              ? "--active"
              : "--notactive"
              }`}
            alt="smoking"
         
          ></img>{" "}
        </div>
      )}

      {/* Drinking */}

      {props.initialIconColor && (
        <div className="container_right--state">
          <h1>Drinking </h1>
         
            <img
            src={drinking}
            className={`container_right--phoneimg`}
            alt="drinking"
          ></img>
        </div>
      )}
      {props.iconColor && (
        <div className="container_right--state">
          <h1>Drinking </h1>
         
             <img
            src={drinking}
            className={`container_right--phoneimg${props.parsedData.Drinking === "true" &&
              (!props.livestream || props.img)
              ? "--active"
              : "--notactive"
              }`}
            alt="drinking"
         
          ></img>
        </div>
      )}


      {/* Drowsiness */}

      {props.initialIconColor && (
        <div className="container_right--state">
          <h1>Drowsiness </h1>
          
          <img
            src={active}
            className={`container_right--img`}
            alt="drinking"
          ></img>
        </div>
  )
}

{
  props.iconColor && (
    <div className="container_right--state">
      {props.statusData === "Drowsy" && (!props.liveStreamData || props.imgData)
        ? <div className="container_right--state">
          <h1>Drowsy</h1>
           <img
            src={drowsy}
            className="container_right--drowsyimg--active"
            alt="drowsiness"
          ></img>
        </div>
        : <div className="container_right--state">
          <h1>Awake</h1>
           <img
            src={active}
            className="container_right--drowsyimg--notactive"
            alt="drowsiness"
         
          ></img>
        </div>
      }
    </div>
  )
}
    </div >
  );
}
export default DriverActivitesComponent;