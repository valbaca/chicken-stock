import { AntDesign } from '@expo/vector-icons'
import { useRef } from 'react';
import styled from 'styled-components'


export default function AddInput({submitHandler}) {
  const inputRef = useRef(null);
  return (    
  <ComponentContainer>
    <InputContainer>
      <Input 
      placeholder="Add Item..." 
      ref={inputRef}
      onChangeText={(s) => inputRef.current.value = s}/>
    </InputContainer>
    <SubmitButton
      onPress={() => submitHandler({name: inputRef.current?.value})}
    >
      <AntDesign name="plus" size={24} color="midnightblue" />
    </SubmitButton>
  </ComponentContainer>)
}

const ComponentContainer = styled.View`
  flex-direction: row;
  margin-top: 40px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;