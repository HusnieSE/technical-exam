import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

import { api } from "../../api/config";

const circleSize = 40;
const itemSize = 6;

const spinRight = keyframes`
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  `;

const Circles = (itemCount) => {
  let styles = "";

  let rot = 0;
  const angle = 360 / itemCount;

  for (let i = 1; i <= itemCount; i++) {
    styles += `
       &:nth-of-type(${i}) {
      transform: rotate(${rot * 1}deg) translate(${circleSize / 2}em)
        rotate(${rot * -1}deg);
    }
     `;
    rot = rot + angle;
  }

  return css`
    ${styles}
  `;
};

const OnCircle = () =>
  css`
    position: relative;
    width: ${circleSize}em;
    height: ${circleSize}em;
    padding: 0;
    border-radius: 50%;
    list-style: none;
  `;

const CircleContainer = styled("ul")`
  ${OnCircle()}
  margin: 5em auto 0;
  border: solid 5px tomato;
  -webkit-animation: ${spinRight} 20s linear infinite;
  animation: ${spinRight} 20s linear infinite;
`;

const Circle = styled("li")`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${itemSize}em;
  height: ${itemSize}em;
  margin: -${itemSize / 2}em;
  border-radius: 100%;
  background-color: #ffffff;

  ${(props) => Circles(props.itemCount)}
`;

const Base = styled("div")`
  background-color: tomato;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const Footer = styled("footer")`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 2rem;
  display: flex;
  justify-content: center;
  background-color: #00000070;
`;

const Button = styled("button")`
  padding: 0.5rem 1.5rem;
  text-transform: uppercase;
  border-radius: 0.2rem;
  border: 0;
  margin-left: 1.5rem;
  color: #000000;
  ${(props) =>
    props.logout &&
    css`
      background-color: #253337;
      color: #ffffff;
    `};
`;

const DashboardScreen = () => {
  // list of online devices
  const [onlineDevices, setDevices] = useState([]);

  //   react outer
  const history = useHistory();
  //   api call get all online device
  const getOnlineDevice = () => {
    api.get("/devices").then(({ data }) => {
      if (data?.devices) {
        setDevices(data.devices);
      }
    });
  };

  //   handle Log out
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      history.push("/");
    }
  };

  const handleNotify = () => {
    api
      .post(
        "/notify",
        {
          name: "Husnie Edres",
          email: "husniese@gmail.com",
          repoUrl: "https://github.com/HusnieSE/technical-exam",
          message: "Job Done!",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert(res?.data);
        console.log("yehey success: ", res);
      })
      .catch((err) => console.log(err));
  };

  //   useEffect
  useEffect(() => {
    //   check if user has token
    const token = sessionStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    //   get all online devices every 5 secs
    const intervalId = setInterval(getOnlineDevice, 5000);

    // clear intervalid
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Base>
      <div className="dashboard-container">
        <CircleContainer>
          {/* circle list */}
          {onlineDevices?.map((r, index) => (
            <Circle key={index} itemCount={onlineDevices.length} />
          ))}
        </CircleContainer>
        <div className="text-container">
          <h1> {onlineDevices.length} </h1>
          <h2>
            Device{onlineDevices.length > 1 ? "s" : ""} <br /> Online
          </h2>
        </div>
      </div>
      <Footer>
        <Button onClick={() => handleNotify()}>notify</Button>
        <Button logout onClick={() => handleLogout()}>
          log out
        </Button>
      </Footer>
    </Base>
  );
};

export default DashboardScreen;

// todo api connection
