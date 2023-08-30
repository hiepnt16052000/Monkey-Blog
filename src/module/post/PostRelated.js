/** @format */

import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase-app/firebase-config";
import PostItem from "./PostItems";

const PostRelated = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId]);

  if (!categoryId || posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading className="">Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => {
          return <PostItem key={item.id} data={item}></PostItem>;
        })}
      </div>
    </div>
  );
};

export default PostRelated;
