import { NavigationContainer } from '@react-navigation/native'
import Main from './components/Main'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Have"
          component={Main}
          options={{
            tabBarIcon: () => (
              <Entypo name="bowl" size={20} color="midnightblue" />
            )
          }}
        />
        {/* <Tab.Screen
          name="Need"
          component={Main}
          options={{
            tabBarIcon: () => (
              <Entypo name="shopping-cart" size={20} color="midnightblue" />
            )
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}
