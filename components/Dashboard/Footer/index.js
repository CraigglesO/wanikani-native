import React from 'react'
import {
  Image,
  View,
  Dimensions
} from 'react-native'

import { createStyles } from 'react-native-media-queries'

// import { MonoText } from '../../StyledText'

export default class Footer extends React.Component {
  render () {
    return (
      <View style={styles.footerContainer}>
        <Image
          style={styles.footerImage}
          source={require('../../../assets/images/footer-dash.gif')}
        />
      </View>
    )
  }
}

const win = Dimensions.get('window')
const width = win.width

const styles = createStyles(
  {
    footerContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: 'auto',
      marginTop: 60,
      marginBottom: 0,
      width: 0,
      height: 'auto'
    },
    footerImage: {
      flex: 1,
      width,
      height: 250,
      transform: [{ translateX: -(width / 2) }]
    }
  }
)
