import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
 
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
  body: string,
  userName: string,
  id: number,
  remove: (id: number) => void,
  edit: () => void
}

export function PostItem({body, userName, id, edit, remove}: PostItemProps){
  const [ userTrueName, setUserTrueName ] = useState('')
  const [ editing, setEditing ] = useState(false)
  const [ newPost, setNewPost ] = useState('')

  function turnEdit(){
    setEditing(true)
    setNewPost(body)
  }
  // function showName(userName: string){
  //   Alert.alert(
  //     'User:', 
  //     `Name: ${userName} | Email: ${userEmail}`, [
  //     {
  //       text: 'OK',
  //       style: 'cancel'
  //     }
  //   ])
  // }

  // function handleEditPost(){
  //   setEditing(true)
  //   setNewPost(body)
  // }

  // function submitEdit(newPost: string){
  //   if(newPost !== ''){
  //     axios.put(`/posts/${id}`, {
  //       id: id,
  //       tittle: tittle,
  //       body: newPost,
  //       userId: userId
  //     })
  //     setEditing(false)
  //   }else{
  //     Alert.alert(
  //       `Error`,
  //       `Need post's body`,
  //       [
  //         {
  //           text: "OK"
  //         }
  //       ]
  //     )
  //   }
  //   setNewPost('')
  // }
  
  return(
    <View>
      <Post>
        <TouchableOpacity>
          <UserName>{userName}</UserName>
        </TouchableOpacity>
        <Text>{body}</Text>
        <PostButtons>
          <TouchableOpacity
          onPress={() => turnEdit()}>
            <Icon name="edit" size={24} color="#50398b"/>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={ () => remove(id)}>
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
            onPress={ () => edit()}
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

