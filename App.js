import React from 'react'
import { observer, Provider } from 'mobx-react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import Navigation from './components/Navigation'
import AppNavigator from './navigation/AppNavigator'
import Store from './store'

// TODO: Setup responsive tyling
// https://github.com/kristerkari/react-native-css-modules/blob/master/docs/setup-responsive.md

@observer
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  render () {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'web' && <Navigation />}
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <Provider store={Store} summary={Store.summary}>
            <AppNavigator />
          </Provider>
        </View>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/footer-dash.gif')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'source-sans-pro': require('./assets/fonts/sourcesanspro-regular.ttf'),
        'ubuntu-regular': require('./assets/fonts/Ubuntu-R.ttf'),
        'ubuntu-bold': require('./assets/fonts/Ubuntu-B.ttf'),
        'fa_regular_400': require('./assets/fonts/fa-regular-400.ttf'),
        'fa_solid_900': require('./assets/fonts/fa-solid-900.ttf'),
        'FontAwesome5FreeRegular': require('./assets/fonts/fa-regular-400.ttf'),
        'FontAwesome5FreeSolid': require('./assets/fonts/fa-solid-900.ttf')
      })
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
