import React from 'react'
import {
  // Image,
  Platform,
  // ScrollView,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View
} from 'react-native'
// import { WebBrowser } from 'expo'

// import { MonoText } from '../components/StyledText'
import ScrollContainer from '../components/ScrollContainer'
import { ReviewStatus, SrsProgress, Progression, Footer } from '../components/Dashboard'

export default class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount () {
    if (Platform.OS === 'web') document.title = 'Wanikani / Dashboard'
  }

  render () {
    return (
      <ScrollContainer style={styles.dashboard}>

        <View style={styles.break} />

        <ReviewStatus />

        <SrsProgress />

        <Progression />

        <Footer />

      </ScrollContainer>
    )
  }
}

const styles = StyleSheet.create({
  dashboard: {
    width: '100%'
  },
  break: {
    paddingTop: 35
  }
})
