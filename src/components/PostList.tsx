import React, { useState } from "react";
import { FlatList } from "react-native";
import { PostItem } from "./PostItem";

export interface Post {
  postId: number;
  username: string;
  userId: number;
  post: string
}

interface PostListProps {
  posts: Post[],
  removePost: (id: number) => void,
  editPost: () => void
}

export function PostList({posts, editPost, removePost}: PostListProps){
  
  return(
    <FlatList
      data={posts}
      renderItem={( { item }) => 
      <PostItem 
      edit={editPost}
      remove={removePost}
      body={item.post}
      userName={item.username} 
      id={item.postId}
      />}
    />
  )
}
