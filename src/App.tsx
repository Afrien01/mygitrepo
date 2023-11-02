import React, { useEffect, useRef, useState, Fragment } from "react";
import "./styles.scss";
import AWS from "aws-sdk";
import Webcam from "react-webcam";
import beep from "./assets/beep-02.mp3";
import HeaderComponent from "./Components/Header/HeaderComponent";
import DriverActivitesComponent from "./Components/DriverActivites/DriverActivitesComponent";

// Set region
AWS.config.update({ region: "ap-south-1" });
var interval = 1;

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [parsedData, setParseData] = useState({
    SeatBelt: "false",
    MobilePhone: "false",
    Smoking: "false",
    Drinking: "false",
    url: "",
  });
  const [status, setstatus] = useState("");
  let [loading, setLoading] = useState(false);
  // const [initconnection, setinitconnection] = useState(false);
  // const [playVideo, setPlayVideo] = useState(false);
  const [livestream, setlivestream] = useState(true);
  const [parsedDataname, setParseDataname] = useState({
    name: "Guest",
    url: "",
  });

  //Webcampart
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  //convertToblobfile
  var DROWSY_COUNTER = 0
  function b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data); // window.atob(b64Data)
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  function myDisplayer() {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      if (imageSrc !== null) {
        var block = imageSrc.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1]; // In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];
        // Convert it to a blob to upload
        var blob = b64toBlob(realData, contentType, 512);
        var file = new File([blob], Date.now().toString() + ".jpg");
        
        // API TRIAL START
        // Activity Detect started
        const sendScreenshotToLambda = async () => { 
          // const sendTimestamp = new Date().getTime(); // Timestamp before sending
          try {
            const response = await fetch('https://b4bmz2rv97.execute-api.us-east-1.amazonaws.com/default/detect-api', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'image/jpeg',
              },
              body: file,
            });
            // const receiveTimestamp = new Date().getTime(); // Timestamp after receiving
            if (response.ok) {
              const data = await response.json();
              setParseData(data)
              // const requestDuration = receiveTimestamp - sendTimestamp;
              // console.log('Request duration for detect-api:', requestDuration, 'ms');
            } else {
              console.error('file send failed.');
            }
          } catch (error) {
            console.error('Error sending file:', error);
          }
        };
        // Activity Detect ended

        // Face Detect start
        const DetectFace = async () => {
          // const sendTimestamp = new Date().getTime(); // Timestamp before sending
          try {
            const response = await fetch('https://g60dds6joa.execute-api.us-east-1.amazonaws.com/default/face-detect-api', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'image/jpeg',
              },
              body: file,
            });
            // const receiveTimestamp = new Date().getTime(); // Timestamp after receiving
            if (response.ok) {
              const data = await response.json();
              setParseDataname(data); // Set the messages in state
              console.log("face-detect response", data)
              // const requestDuration = receiveTimestamp - sendTimestamp;
              // console.log('Request duration for face-detect-api:', requestDuration, 'ms');
            } else {
              console.error('file send failed.');
            }
          } catch (error) {
            console.error('Error sending file:', error);
          }
        };
        // Face Detect ended

        // Drowsiness Detect start
        const DetectDrowsiness = async () => {
          // const sendTimestamp = new Date().getTime(); // Timestamp before sending
          try {
            const response = await fetch('https://0bpjnium28.execute-api.us-east-1.amazonaws.com/default/DrowsinessContainerLambda-DrowsyDockerLambdaA27236-AZ2VAX74AxOW', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'image/jpeg',
              },
              body: file,
            });
            // const receiveTimestamp = new Date().getTime(); // Timestamp after receiving
            if (response.ok) {
              const data = await response.json();
              if(data.status === 'Drowsy'){
                DROWSY_COUNTER += 1;
              }
              else{
                DROWSY_COUNTER = 0;
                setstatus(data.status); // Set the messages in state
              }

              if (DROWSY_COUNTER >= 4){
                setstatus(data.status); // Set the messages in state
              }
              console.log("drowsiness-detect response", data.status, " Counter", DROWSY_COUNTER)
              // const requestDuration = receiveTimestamp - sendTimestamp;
              // console.log('Request duration for Drowsiness-detect-api:', requestDuration, 'ms');
            } else {
              console.error('file send failed.');
            }
          } catch (error) {
            console.error('Error sending file:', error);
          }
        };
        // Drowsiness Detect ended
        
        if (file != null) {
          sendScreenshotToLambda();
          DetectDrowsiness();
          DetectFace();
          console.log('called API function')
        }
        // API TRIAL END

      }
    }
  }


  const [img, setimg] = useState("");
  const capture = React.useCallback(() => {
    setInitialIconColor(false);
    setIconColor(true);
    // console.log("started capturing");
    interval = window.setInterval(() => myDisplayer(), 1000);
  }, [webcamRef, setImgSrc]);

  //webcampartend

  const [initialIconColor, setInitialIconColor] = useState(true);
  const [iconColor, setIconColor] = useState(false);
  // the configuration information is fetched from the .env file

  // function play() {
  //   var audio = new Audio(beep);
  //   audio.play();
  // }


  useEffect(() => {
    if (!loading) {
      setTimeout(() => setLoading(true), 10000);
    }
    // if (initconnection === false) {
    //   const client = new W3CWebSocket( 
    //     process.env.REACT_APP_WEBSOCKET_URL!
    //   );
    //   client.onopen = () => {
    //     console.log("WebSocket Client Connected");
    //     setinitconnection(true);
    //   };
    //   client.onmessage = (message: any) => {
    //     let parsedDataValue = JSON.parse(message.data.toString());
    //     console.log(parsedDataValue);
    //     if ("name" in parsedDataValue) {
    //       setParseDataname(parsedDataValue);
    //     } else if ("status" in parsedDataValue) {
    //       setstatus(parsedDataValue.status);
    //     } else {
    //       setParseData(parsedDataValue);
    //     }
    //     setPlayVideo(parsedDataValue);
    //   };
    // }
  }, [loading]);

  // if (status === "Drowsy") {
  //   play();
  // }

  return (
    <div className="container">
      <Fragment>
        <HeaderComponent
          parsedDataname={parsedDataname}
          parsedData={parsedData}
          livestream={livestream}
          initialIconColor={initialIconColor}
          iconColor={iconColor}
          img={img}
          statusData={status}
        >
        </HeaderComponent>
      </Fragment>
      <div className="dms_container">
        <div className="dms_container--1">

          <div className="card cd-1">
            <div className="container_left">
              <Webcam
                className="container_left--webcam"
                width="1600"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <div className="container_left--Livebtn">
                {livestream ? (
                  img !== "" ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setInitialIconColor(true);
                        setIconColor(false);
                        setimg("");
                        clearInterval(interval);
                      }}
                      className="btn btn-danger container_left--stopbtn"
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        setimg("setting");
                        e.preventDefault();
                        capture();
                      }}
                      className="btn btn-primary container_left--startbtn"
                    >
                      Go Live
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="card cd-2">
            <DriverActivitesComponent
              livestream={livestream}
              initialIconColor={initialIconColor}
              iconColor={iconColor}
              img={img}
              parsedDatapic={parsedDataname}
              parsedData={parsedData}
              parsedDataname={parsedDataname}
              statusData={status}
              liveStreamData={livestream}
              imgData={img}
            ></DriverActivitesComponent>
          </div>
        </div>
      </div>
    </div>
  );
};