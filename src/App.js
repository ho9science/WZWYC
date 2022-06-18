import "./App.css";
import React from "react";
import styled from "@emotion/styled";
import Worldmap from "./view/Worldmap";
import country from "./country.json";
import section from "./section.json";
import world from "./world-110m2.json";

const Layout = styled.div({
  position: "absolute",
  width: "100%",
  height: "100%",
});

const Main = styled.div`
  max-width: 1600px,
  width: calc(100% - 16px),
  margin: 0 auto,
  display: flex
`;

const Title = styled.h1`
  padding: 10px 20px;
`;
const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  width: calc(100% + 24px);

  & path {
    stroke: white;
    stroke-width: 0.25px;
    fill: grey;
  }
  & .zone_label {
    font-weight: 900;
  }
  & .a:hover {
    fill: #ffa500;
    cursor: pointer;
    opacity: 0.5;
  }
  & .b:hover {
    fill: #ffd700;
    cursor: pointer;
    opacity: 0.5;
  }
  & .c:hover {
    fill: #e06f1f;
    cursor: pointer;
    opacity: 0.5;
  }
  & .d:hover {
    fill: #ff0000;
    cursor: pointer;
    opacity: 0.5;
  }
  & .e:hover {
    fill: #ff1a40;
    cursor: pointer;
    opacity: 0.5;
  }
  & .f:hover {
    fill: #ff00ff;
    cursor: pointer;
    opacity: 0.5;
  }
  & .g:hover {
    fill: #8a2be2;
    cursor: pointer;
    opacity: 0.5;
  }
  & .h:hover {
    fill: #0000ff;
    cursor: pointer;
    opacity: 0.5;
  }
  & .i:hover {
    fill: #00ff00;
    cursor: pointer;
    opacity: 0.5;
  }
  & .j:hover {
    fill: #454d66;
    cursor: pointer;
    opacity: 0.5;
  }
`;

const WorldMapLayout = styled.div`
  background-color: rgb(255, 255, 255);
  color: rgb(97, 97, 97);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  background-image: none;
  border-radius: 12px;
  overflow-y: auto;
  border: 1px solid rgba(144, 202, 249, 0.46);
`;
function App() {
  return (
    <>
      <Layout>
        <Main>
          <Content>
            <Title>
              다시 태어난다면
              <br />
              <span>— 어느 구역에서 태어나시겠습니까? </span>
              <span role="img" aria-label="Party popper emojis">
                🗺️
              </span>
            </Title>
            <WorldMapLayout>
              <Worldmap data={[country, section, world]} />
            </WorldMapLayout>
          </Content>
        </Main>
      </Layout>
    </>
  );
}

export default App;