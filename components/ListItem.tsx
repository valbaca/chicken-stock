import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

// https://stackoverflow.com/questions/75352416/how-do-i-use-a-useref-hook-in-a-text-input-field-in-react-native

export default function ListItem({
  item,
  deleteItem,
  decItem,
  incItem,
  decTotalItem,
  incTotalItem,
  mode
}) {
  if (mode === 'Need' && item.have === item.total) {
    return <></>
  }

  const [editModeState, setEditModeState] = useState(false)
  const onLongPress = () => {
    setEditModeState(prev => !prev)
  }

  const config = {
    Have: {
      icon: <Entypo name="minus" size={20} color="midnightblue" />,
      onPress: () => decItem(item.key)
    },
    Need: {
      icon: <Entypo name="plus" size={20} color="midnightblue" />,
      onPress: () => incItem(item.key)
    }
  }[mode]
  const $zero = mode === 'Have' && item.have === 0

  return (
    <ComponentContainer>
      <ListContainer
        onPress={() => !editModeState && config.onPress()}
        onLongPress={() => onLongPress()}
      >
        {!editModeState && <CircleContainer>{config.icon}</CircleContainer>}
        {editModeState && (
          <EditMinusContainer onPress={() => decTotalItem(item.key)}>
            <Entypo name="squared-minus" size={20} color="midnightblue" />
          </EditMinusContainer>
        )}
        {editModeState && (
          <EditPlusContainer onPress={() => incTotalItem(item.key)}>
            <Entypo name="squared-plus" size={20} color="midnightblue" />
          </EditPlusContainer>
        )}
        <View>
          <TextItem $zero={$zero}>{item.value}</TextItem>
          <TextUnder $zero={$zero}>
            Have: {item.have} Need: {item.total - item.have}
          </TextUnder>
        </View>
        <IconContainer onPress={() => deleteItem(item.key)}>
          <MaterialIcons name="delete" size={24} color="midnightblue" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  )
}

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`

const ListContainer = styled.Pressable`
  background-color: whitesmoke;
  height: auto;
  width: 380px;
  margin-bottom: 5px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`

const TextItem = styled.Text`
  color: ${props => (props.$zero ? 'grey' : 'black')};
  width: 240px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
`

const TextUnder = styled.Text`
  color: ${props => (props.$zero ? 'pink' : 'teal')};
  font-size: 12px;
  margin-right: 20px;

  border-radius: 10px;
`

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;
  height: 40px;
  border-radius: 10px;
`

const CircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`
const EditMinusContainer = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`

const EditPlusContainer = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`
