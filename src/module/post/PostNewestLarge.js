/** @format */

import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  console.log("data:", data);
  const date = data?.createAt?.seconds
    ? new Date(data.createAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data.id) return null;
  return (
    <PostNewestLargeStyles>
      <PostImage
        url={data?.image}
        alt="unslash"
        className="post-image"
        to={data?.slug}
      ></PostImage>
      <PostCategory className="post-category">
        {data?.category.name}
      </PostCategory>
      <PostTitle to={data?.slug} size="big">
        {data?.title}
      </PostTitle>
      <PostMeta
        className="post-info"
        authorName={data.user?.fullname}
        to={slugify(data.user?.fullname || "", { lower: true })}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
