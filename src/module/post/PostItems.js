/** @format */

import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 200px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ type = "secondary", data }) => {
  const date = data?.createAt?.seconds
    ? new Date(data.createAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data) return null;

  return (
    <PostItemStyles>
      <PostImage
        url={data.image}
        alt="unslash"
        to={data.slug}
        className="post-image"
      ></PostImage>
      <PostCategory
        to={data.category?.slug}
        className="post-category"
        type="primary"
      >
        {data.category?.name}
      </PostCategory>
      <PostTitle size="big" to={data?.slug}>
        {data.title}
      </PostTitle>
      <PostMeta
        className="post-info"
        to={slugify(data.user?.username || "", { lower: true })}
        authorName={data.user?.fullname}
        data={formatDate}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
