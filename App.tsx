import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import Main from './components/Main'
import AsyncStorage from '@react-native-async-storage/async-storage'
import debounce from './util/debounce.js'

const STORAGE_KEY = 'chicken-stock-storage-key'
const INIT_DATA = [
  { value: 'Chicken Stock', key: Math.random().toString(), have: 1, total: 1 }
]
const storeData = debounce(data => {
  if (data !== INIT_DATA) {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
})

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [data, setData] = useState(INIT_DATA)

  // once, on-load => load state data from local storage
  useEffect(() => {
    if (data === INIT_DATA) {
      // load from storage
      AsyncStorage.getItem(STORAGE_KEY).then(storedData => {
        if (!storedData) return
        try {
          const parsed = JSON.parse(storedData)
          setData(parsed)
        } catch (e) {
          console.error(`Error: ${e}. Couldn't parse JSON: ${storedData}`)
        }
      })
    }
  }, [])

  useEffect(() => {
    // This runs on each render, BUT storeData is debounced
    // So this only saves after no new data/renders for 250ms
    storeData(data)
  })

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
  )
}
