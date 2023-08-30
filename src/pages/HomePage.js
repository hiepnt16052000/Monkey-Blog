/** @format */

import React from "react";
import styled from "styled-components";
import Leyout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewst from "../module/home/HomeNewst";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Leyout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewst></HomeNewst>
      </Leyout>
    </HomePageStyles>
  );
};

export default HomePage;
