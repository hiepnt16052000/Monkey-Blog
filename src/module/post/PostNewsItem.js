/** @format */

import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewsItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }

  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }

    &-category {
      margin-bottom: 8px;
    }
    &-content {
      flex: 1;
    }

    &-title {
      margin-bottom: 8px;
    }
  }

  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;

const PostNewsItem = ({ data }) => {
  console.log("data:", data);
  const date = data?.createAt?.seconds
    ? new Date(data.createAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data.id) return null;
  return (
    <PostNewsItemStyles>
      <PostImage
        url={data?.image}
        alt=""
        className="post-image"
        to={data?.slug}
      ></PostImage>
      <div className="post-content">
        <div className="post-top">
          <PostCategory className="post-category" type="secondary">
            {data.category?.name}
          </PostCategory>
          <PostMeta
            className="post-info"
            authorName={data.user?.fullname}
            to={slugify(data.user?.fullname || "", { lower: true })}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle size="normal">{data?.title}</PostTitle>
      </div>
    </PostNewsItemStyles>
  );
};

export default PostNewsItem;
