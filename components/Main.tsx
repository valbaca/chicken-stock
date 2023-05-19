import { FlatList, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AddInput from './AddInput'
import ListItem from './ListItem'

export default function Main({
  data,
  deleteItem,
  addItem,
  decItem,
  incItem,
  decTotalItem,
  incTotalItem,
  mode
}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AddInput addedHandler={addItem} />

      <FlatList
        data={data}
        ListHeaderComponent={() => <></>}
        ListEmptyComponent={() => <></>}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            decItem={decItem}
            incItem={incItem}
            decTotalItem={decTotalItem}
            incTotalItem={incTotalItem}
            mode={mode}
          />
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
