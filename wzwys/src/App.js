import "./App.css";
import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import Worldmap from "./view/Worldmap";
import country from "./country.json";
import section from "./section.json";
import world from "./world-110m2.json";

const Layout = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%'
})
const Header = styled.header`
background-color: #24292e;
color: #fff;
    -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: static;
`
const HeaderRow = styled.div`
min-height: 64px;
`
const Main = styled.div`
  max-width: 1600px,
  width: calc(100% - 16px),
  margin: 0 auto,
  display: flex
`
  
const Title = styled.h1`
padding: 24px;
`
const Content = styled.div`
  // box-sizing: border-box;
  //   display: flex;
  //   flex-flow: row wrap;
  //   width: calc(100% + 24px);
`

const Map = styled.div`
  background-color: rgb(255, 255, 255);
  color: rgb(97, 97, 97);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  background-image: none;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(144, 202, 249, 0.46);
`
function App() {
  return (
    <>
      <Layout>
        <Header>
          <HeaderRow>
            <span className="mdl-layout-title">WZWYC</span>
          </HeaderRow>
        </Header>
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
            <Worldmap data={[country, section ,world]}/>
          </Content>
          </Main>
      </Layout>
    </>
  );
}

export default App;
