import { useRef } from 'react'
import styled from 'styled-components'
import { Entypo } from '@expo/vector-icons'

export default function AddInput({ addedHandler }) {
  const inputRef = useRef(null)
  const onSubmitPress = () => {
    addedHandler({ name: inputRef.current?.value })
    inputRef.current.value = ''
    inputRef.current.clear()
  }
  return (
    <ComponentContainer>
      <InputContainer>
        <Input
          placeholder="Add Item..."
          clearButtonMode="while-editing"
          enterKeyHint="done"
          onSubmitEditing={onSubmitPress}
          ref={inputRef}
          onChangeText={s => (inputRef.current.value = s)}
        />
      </InputContainer>
      <SubmitButton onPress={onSubmitPress}>
        <Entypo name="add-to-list" size={24} color="midnightblue" />
      </SubmitButton>
    </ComponentContainer>
  )
}

const ComponentContainer = styled.View`
  flex-direction: row;
  margin-top: 60px;
`

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 250px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-right: 5px;
  margin-bottom: 20px;
  border-radius: 50px;
`
const WantModeSwitch = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 50px;
`
