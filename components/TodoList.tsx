import { Entypo, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { View } from "react-native"
import styled from "styled-components"

// https://stackoverflow.com/questions/75352416/how-do-i-use-a-useref-hook-in-a-text-input-field-in-react-native

export default function TodoList({ item, deleteItem }) {
  return (
    <ComponentContainer>
      <ListContainer>
        <CircleContainer>
          <Entypo name="minus" size={20} color="midnightblue" />
        </CircleContainer>
        <View>
          <TextItem>{item.value}</TextItem>
          <TextUnder>Have: {item.have}  Need: {item.total - item.have}</TextUnder>
        </View>
        
        <IconContainer onPress={() => deleteItem(item.key)}>
          <MaterialIcons name="delete" size={24} color="midnightblue" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
`;

const TextUnder = styled.Text`
  color: teal;
  font-size: 12px;
  margin-right: 20px;

  border-radius: 10px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

const CircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;