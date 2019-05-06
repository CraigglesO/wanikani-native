import React from 'react'
import { Text } from 'react-native'

export class MonoText extends React.Component {
  render () {
    return <Text {...this.props} style={[{ fontFamily: 'ubuntu-regular', fontSize: '16px', color: '#555' }, this.props.style]} />
  }
}
