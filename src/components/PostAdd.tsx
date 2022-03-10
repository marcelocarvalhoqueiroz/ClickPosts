import React, { useState } from "react";

import Icon from 'react-native-vector-icons/Feather';

import { AddContainer, PostButton, UserInput, InputContainer } from '../style/postadd'

interface PostAddProps {
  addPost: (postBody: string, username: string) => void
}

export function PostAdd({addPost} : PostAddProps){
  const [ user, setUser] = useState('')
  const [ post, setPost] = useState('')

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
      onPress={() => addPost(post, user)}
      >
        <Icon name="send" size={24} color='#50398b'/>
      </PostButton>
    </AddContainer>
  )
}
