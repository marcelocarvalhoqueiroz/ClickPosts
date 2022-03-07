import React from "react";
import { FlatList } from "react-native";
import { PostItem } from "./PostItem";

export interface Post {
  userId: number;
  id: number;
  body: string;
  tittle: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string
}
interface PostListProps {
  posts: Post[],
  users: User[]
}

export function PostList({posts, users}: PostListProps){
  const postsOrder = posts.sort(function(a, b){
    return a.id - b.id
  })
  return(
    <FlatList
      data={postsOrder}
      extraData={posts}
      renderItem={( { item }) => 
      <PostItem 
      users={users} 
      body={item.body} 
      tittle={item.tittle}
      userId={item.userId} 
      id={item.id}/>}
    />
  )
}
