import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
 
import Icon from 'react-native-vector-icons/Feather';
import api from "../services/api";

import { 
  Post, 
  PostButtons, 
  UserName, 
  EditScreen, 
  EditBox, 
  EditButtons, 
  Submit,
  Close,
  
 } 
  from "../style/postitem";


export interface User {
  id: number;
  name: string;
  username: string;
  email: string
}

interface PostItemProps {
  body: string;
  userId: number;
  id: number;
  tittle: string;
  users: User[]
}


export function PostItem({body, userId, users, tittle, id, ...rest}: PostItemProps){
  const [ userName, setUserName] = useState('User Name')
  const [ userTrueName, setUserTrueName ] = useState('')
  const [ userEmail, setUserEmail ] = useState('')
  const [ editing, setEditing ] = useState(false)
  const [ newPost, setNewPost ] = useState('')


  function showName(userName: string){
    Alert.alert(
      'User:', 
      `Name: ${userName} | Email: ${userEmail}`, [
      {
        text: 'OK',
        style: 'cancel'
      }
    ])
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
        }
      }
    ])
    
  }
  function handleEditPost(){
    setEditing(true)
    setNewPost(body)
  }
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

  useEffect(() => {
    for( let i = 0; i < users.length; i++){
      if(users[i].id == userId){
        setUserName(users[i].username)
        // setUserTrueName(users[i].name)
      }
    } 
    for( let i = 0; i < users.length; i++){
      if(users[i].id == userId){
        // setUserName(users[i].username)
        setUserTrueName(users[i].name)
      }
    } 
    for( let i = 0; i < users.length; i++){
      if(users[i].id == userId){
        setUserEmail(users[i].email)
      }
    }
  }, [])
  return(
    <View>
      <Post>
        <TouchableOpacity 
        onPress={ () => showName(userTrueName)}
        >
          <UserName>{userName}</UserName>
        </TouchableOpacity>
        <Text>{body}</Text>
        <PostButtons>
          <TouchableOpacity
          onPress={() => handleEditPost()}>
            <Icon name="edit" size={24} color="#50398b"/>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={ () => handleRemovePost(id)}>
            <Icon name="trash" size={24} color="#50398b"/>
          </TouchableOpacity>
        </PostButtons>
      </Post>
      <Modal
      animationType="fade"
      visible={editing}
      >
        <EditScreen>
          <EditBox
            multiline
            value={newPost}
            onChangeText={setNewPost}
            >          
          </EditBox>
          <EditButtons>
            <Submit
            onPress={ () => submitEdit(newPost)}
            >
              <Icon name="save" size={38} color="#50398b"/>
            </Submit>
            <Close
            onPress={ () => setEditing(false)}
            >
              <Icon name="x-circle" size={38} color="#50398b"/>
            </Close>
          </EditButtons>
        </EditScreen>
      </Modal>
    </View>
  )
}

