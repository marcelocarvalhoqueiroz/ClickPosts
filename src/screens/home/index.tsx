import React, { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { PostAdd } from "../../components/PostAdd";
import { PostList } from "../../components/PostList";

import api from "../../services/api";
import { Body } from "../../style/home";

interface Post {
  userId: number;
  id: number;
  tittle: string;
  body: string
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string
}

export function Home(){
  const [ postsData, setPostsData ] = useState<Post[]>([])
  const [ userData, setUserData ] = useState<User[]>([])

  function getApiData() {
    api.get('/posts').then((response) => {
      setPostsData(response.data)
    })
    api.get('/users').then((res) => {
      setUserData(res.data)
    })
  }
  useEffect( () => {
    getApiData()
  }, [])

  return(
    <Body>
      <Header />
      <PostAdd />
      <PostList posts={postsData} users={userData}/>
    </Body>
  )
}