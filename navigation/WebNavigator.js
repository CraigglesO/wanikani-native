import { createSwitchNavigator } from '@react-navigation/core'
import { createBrowserApp } from '@react-navigation/web' // https://reactnavigation.org/docs/en/web-support.html#docsNav

import Dashboard from '../screens/Dashboard'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

const MyNavigator = createSwitchNavigator({
  Dashboard,
  LinksScreen,
  SettingsScreen
})

export default createBrowserApp(MyNavigator)
