/** @format */

import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase-app/firebase-config";
import PostItem from "../post/PostItems";
import PostNewestLarge from "../post/PostNewestLarge";
import PostNewsItem from "../post/PostNewsItem";

const HomeNewstStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;
    align-items: start;
  }

  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }

  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewst = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  const [first, ...other] = posts;

  return (
    <HomeNewstStyles className="home-block">
      <div className="container">
        <Heading>Newest Update</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {other.length > 0 &&
              other.map((item, index) => {
                return <PostNewsItem key={index} data={item}></PostNewsItem>;
              })}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          <PostItem type="primary"></PostItem>
          <PostItem type="primary"></PostItem>
          <PostItem type="primary"></PostItem>
          <PostItem type="primary"></PostItem>
        </div>
      </div>
    </HomeNewstStyles>
  );
};

export default HomeNewst;
