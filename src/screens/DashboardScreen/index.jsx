import styled, { css } from "styled-components";

const Circles = (itemCount, circleSize) => {
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

const OnCircle = (itemCount, circleSize, itemSize) =>
  css`
    position: relative;
    width: ${circleSize}em;
    height: ${circleSize}em;
    padding: 0;
    border-radius: 50%;
    list-style: none;
  `;

const CircleContainer = styled("ul")`
  ${OnCircle((props) => props.itemCount, 20, 6)}
  margin: 5em auto 0;
  border: solid 5px tomato;
`;

const Circle = styled("li")`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6em;
  height: 6em;
  margin: -${6 / 2}em;
  border-radius: 100%;
  background-color: #00ffca;

  ${Circles(8, 20)}
`;

const DashboardScreen = () => {
  return (
    <div className="main-container">
      <div className="dashboard-container">
        <CircleContainer itemCount={8}>
          <Circle itemCount={8} />
          <Circle itemCount={8} />
          <Circle itemCount={8} />
          <Circle itemCount={8} />
          <Circle itemCount={8} />
          <Circle itemCount={8} />
          <Circle itemCount={8} />
          <Circle itemCount={8} />
        </CircleContainer>
      </div>
    </div>
  );
};

export default DashboardScreen;
