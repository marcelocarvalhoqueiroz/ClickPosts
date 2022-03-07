import styled from 'styled-components/native'

export const Post = styled.View`
  background-color: #f5f3fc;
  color: black;
  border-bottom-color: black;
  border-bottom-width: 1px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  margin-top: 8px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 6px;
`

export const PostButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const UserName = styled.Text`
  align-self: center;
  font-size: 24px;
  font-weight: bold;
  color: #50398b;
`
export const EditScreen = styled.View`
  background-color: #fff;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
`

export const EditBox = styled.TextInput`
  background-color: #f4f4f4;
  width: 300px;
  border: solid 2px;
  border-radius: 6px;
  padding: 10px;
`

export const EditButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
`

export const Submit = styled.TouchableOpacity`
  height: 40px;
  width: 80px;
  align-content: center;
`

export const Close = styled.TouchableOpacity`
  height: 40px;
  width: 80px;
  align-content: flex-end;
  padding-left: 42px;
`

export const CloseText = styled.Text`
  color: white;
  align-self: center;
`