import React from 'react'
import {
  ScrollView,
  // Platform,
  View
} from 'react-native'

import { createStyles, maxWidth } from 'react-native-media-queries'

// import styles from './ScrollContainer.css'

// console.log('styles', styles)

export default class ScrollContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      scrolled: false
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
          {this.props.children}
        </ScrollView>
      </View>
    )
  }
}

const styles = createStyles(
  {
    container: {
      flex: 1,
      backgroundColor: '#eee'
    },
    scrollContainer: {
      // height: '200vh',
      paddingTop: 10
    },
    contentContainer: {
      width: 1170,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  maxWidth(1260, {
    contentContainer: {
      width: 940,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }),
  maxWidth(980, {
    contentContainer: {
      width: 724,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }),
  maxWidth(765, {
    contentContainer: {
      width: 'auto',
      marginLeft: 10,
      marginRight: 10
    }
  })
)
