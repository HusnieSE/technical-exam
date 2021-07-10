import styled, { css, keyframes } from "styled-components";

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
  background-color: #00ffca;

  ${(props) => Circles(props.itemCount)}
`;

const DashboardScreen = () => {
  const itemCount = 4;
  return (
    <div className="main-container">
      <div className="dashboard-container">
        <CircleContainer>
          {Array.from(Array(itemCount).keys()).map((r) => (
            <Circle itemCount={itemCount} />
          ))}
        </CircleContainer>
      </div>
    </div>
  );
};

export default DashboardScreen;
