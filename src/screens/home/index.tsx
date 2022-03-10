import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, Text } from "react-native";

import { Header } from "../../components/Header";
import { PostAdd } from "../../components/PostAdd";
import { PostList } from "../../components/PostList";

import api from "../../services/api";
import { Body } from "../../style/home";

interface PostData {
  userId: number;
  id: number;
  tittle: string;
  body: string
}

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string
}

interface Post {
  postId: number;
  userId: number;
  username: string;
  post: string
}

export type ArgsAdd = {
  post: string,
  username: string
}

export function Home(){
  const [ postsData, setPostsData ] = useState<PostData[]>([])
  const [ userData, setUserData ] = useState<UserData[]>([])
  const [ userId, setUserId ] = useState(0)
  const [ postList, setPostList] = useState<Post[]>([])

  const postsOrder = postList.sort(function(a, b){
    return a.postId - b.postId
  })

  function handleAddNewPost(postBody: string, username: string){
    const hasUser = userData.find((user) => user.username === username)
    for(let i = 0; i < userData.length; i++){
      if(userData[i].username == username){
        setUserId(userData[i].id)
      }
    }
    if(postBody !== '' && username !== ''){
      const postData = {
        postId: PostList.length,
        userId: userId,
        username: username,
        post: postBody
      }
      setPostList(oldState => [...oldState, postData])
      api.post('/posts', {
        userId: userId,
        title: String(new Date().getTime()),
        body: postBody
      }).then(() => {
      Alert.alert(
        `Sucess, ${username}!`,
        "Post Created",
        [
          {
            text: "OK"
          }
        ]
      )
    })
    }else{
      Alert.alert(
        'Need post and username.',
        'Something are missing',
        [
          {
            text: "OK"
          }
        ]
      )
    }

  }

  function handleEditPost(){
    console.log('Editar Post')
  }

  function handleRemovePost(id: number){
    Alert.alert('Remove Post', 'Are you sure?', [
      {
        text: 'No',
        style: 'cancel'
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          api.delete(`/posts/${id}`).then((res) => {
            console.log(res.data)
          })
          setPostList(oldState => oldState.filter(
            post => post.postId !== id
          ))
        }
      }
    ])
  }

  function getApiData() {
    api.get('/posts').then((response) => {
      setPostsData(response.data)
    })
    api.get('/users').then((res) => {
      setUserData(res.data)
    })
    // for(let i = 0; i < postsData.length; i++){
    //   for( let x = 0; x < userData.length; x++){
    //     if(userId == userData[x].id){
    //       const postData = {
    //         postId: postsData[i].id,
    //         userId: postsData[i].userId, 
    //         username: userData[x].username,
    //         post: postsData[i].body     
    //       }
    //       setPostList(oldState => [...oldState, postData])
    //     }
    //   }
    // }
  }
  useEffect( () => {
    getApiData()

  }, [])

  return(
    <Body>
      <Header />
      <TouchableOpacity
      onPress={getApiData}>
        <Text>Get Api Data</Text>
      </TouchableOpacity>
      <PostAdd addPost={handleAddNewPost}/>
      <PostList posts={postsOrder} removePost={handleRemovePost} editPost={handleEditPost}/>
    </Body>
  )
}


/*
function submitEdit(newPost: string){
  if(newPost !== ''){
    axios.put(`/posts/${id}`, {
      id: id,
      tittle: tittle,
      body: newPost,
      userId: userId
    })
    setEditing(false)
  }else{
    Alert.alert(
      `Error`,
      `Need post's body`,
      [
        {
          text: "OK"
        }
      ]
    )
  }
  setNewPost('')
}





*/