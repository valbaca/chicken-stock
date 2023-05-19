import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Entypo } from '@expo/vector-icons'
import Main from './components/Main'

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [data, setData] = useState([
    { value: 'Beans', key: Math.random().toString(), have: 1, total: 1 }
  ])

  const deleteItem = key => {
    setData(prevData => prevData.filter(item => item.key != key))
  }

  const addItem = ({ name }) => {
    if (!name) return
    setData(prevData => [
      {
        value: name,
        key: Math.random().toString(), // https://xkcd.com/221/ also https://xkcd.com/1210/
        have: 1,
        total: 1
      },
      ...prevData
    ])
  }

  const incItem = key => {
    setData(prevData =>
      prevData.map(item => {
        if (item.key == key) {
          const newHave = item.have + 1
          const newTotal = Math.max(newHave, item.total)
          return {
            ...item,
            have: newHave,
            total: newTotal
          }
        } else {
          return item
        }
      })
    )
  }

  const decItem = key => {
    setData(prevData =>
      prevData.map(item => {
        if (item.key === key) {
          const newHave = Math.max(0, item.have - 1)
          return {
            ...item,
            have: newHave
          }
        } else {
          return item
        }
      })
    )
  }

  const decTotalItem = key => {
    setData(prevData =>
      prevData.map(item => {
        if (item.key === key) {
          const newTotal = Math.max(0, item.total - 1)
          return {
            ...item,
            total: newTotal
          }
        } else {
          return item
        }
      })
    )
  }
  const incTotalItem = key => {
    setData(prevData =>
      prevData.map(item => {
        if (item.key === key) {
          return {
            ...item,
            total: item.total + 1
          }
        } else {
          return item
        }
      })
    )
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Have"
            children={() => (
              <Main
                data={data}
                addItem={addItem}
                deleteItem={deleteItem}
                incItem={incItem}
                decItem={decItem}
                decTotalItem={decTotalItem}
                incTotalItem={incTotalItem}
                mode={'Have'}
              />
            )}
            options={{
              tabBarIcon: () => (
                <Entypo name="bowl" size={20} color="midnightblue" />
              )
            }}
          />
          <Tab.Screen
            name="Need"
            children={() => (
              <Main
                data={data}
                addItem={addItem}
                deleteItem={deleteItem}
                incItem={incItem}
                decItem={decItem}
                decTotalItem={decTotalItem}
                incTotalItem={incTotalItem}
                mode={'Need'}
              />
            )}
            options={{
              tabBarIcon: () => (
                <Entypo name="shopping-cart" size={20} color="midnightblue" />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  )
}
