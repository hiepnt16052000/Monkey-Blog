/** @format */

import { async } from "@firebase/util";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import AuthorBox from "../components/author/AuthorBox";
import Layout from "../components/layout/Layout";
import { db } from "../firebase-app/firebase-config";
import PostCategory from "../module/post/PostCategory";
import PostImage from "../module/post/PostImage";
import PostMeta from "../module/post/PostMeta";
import PostRelated from "../module/post/PostRelated";
import PageNotFound from "./NotFoundPage";
import parse from "html-react-parser";

const PostDetailPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 800px;
      margin: 80px auto;
    }
  }

  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
`;

const PostDetailPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfo.title) return null;
  console.log("postInfo:", postInfo);
  const { user } = postInfo;
  return (
    <PostDetailPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              className="post-feature"
              url={postInfo.image}
            ></PostImage>
            <div className="post-info">
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostCategory className="mb-4" to={postInfo.category?.slug}>
                {postInfo.category?.name}
              </PostCategory>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div
              className="entry-content"
              // Prevent XSS Attack recommen from React Docs
              dangerouslySetInnerHTML={{
                __html: postInfo.content || "",
              }}
            ></div>
            <AuthorBox userId={user.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailPageStyles>
  );
};

export default PostDetailPage;
