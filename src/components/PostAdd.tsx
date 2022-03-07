import React, { useState } from "react";
import { View, Alert } from "react-native";

import Icon from 'react-native-vector-icons/Feather';
import api from "../services/api";

import { AddContainer, PostButton, UserInput, InputContainer } from '../style/postadd'

export function PostAdd(){
  const [ user, setUser] = useState('')
  const [ post, setPost] = useState('')

  function handleAddPost(post: string, user: string){
    if(post !== '' && user !== ''){
      api.post('/posts', {
        userId: (new Date().getTime()),
        title: String(new Date().getTime()),
        body: post
      }).then((res) => {
        Alert.alert(
          "Sucess!",
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
        "Need Post and User",
        "Some info are missing",
        [
          {
            text: "OK"
          }
        ]
      )
    }
  }
  return(
    <AddContainer>
      <InputContainer>   
        <UserInput 
        placeholder='User Name'
        value={ user }
        onChangeText={ setUser }
        >
        </UserInput>
        <UserInput
        multiline
        numberOfLines={2}
        placeholder='Post'
        value={ post }
        onChangeText= { setPost }
        >
        </UserInput>
      </InputContainer> 
      <PostButton
      onPress={() => handleAddPost(post, user)}
      >
        <Icon name="send" size={24} color='#50398b'/>
      </PostButton>
    </AddContainer>
  )
}
