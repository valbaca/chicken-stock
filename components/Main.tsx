import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import AddInput from './AddInput'
import TodoList from './TodoList'

export default function Main() {
  const [data, setData] = useState([
    { value: 'Beans', key: Math.random().toString(), have: 1, total: 1 }
  ])

  const deleteItem = key => {
    setData(prevData => prevData.filter(item => item.key != key))
  }

  const addedHandler = ({ name }) => {
    if (!name) return
    setData(prevData => [
      {
        value: name,
        key: Math.random().toString(),
        have: 1,
        total: 1
      },
      ...prevData
    ])
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AddInput addedHandler={addedHandler} />

      <FlatList
        data={data}
        ListHeaderComponent={() => <></>}
        ListEmptyComponent={() => <></>}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TodoList item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
