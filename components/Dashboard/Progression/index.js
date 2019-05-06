import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Platform,
  StyleSheet,
  View
} from 'react-native'

import ProgressDetails from './progressDetails'

@inject('store')
@observer
export default class Progression extends React.Component {
  render () {
    let { levelProgression } = this.props.store
    if (!levelProgression) levelProgression = {}
    const { level, items } = levelProgression

    return (
      <View style={styles.progressionContainer}>
        <ProgressDetails
          level={level || 0}
          type='Radicals'
          total={items ? items.radicalTotal : 0}
          radicals={items ? items.radical : []}
        />
        <View style={styles.progressBreak} />
        <ProgressDetails
          level={level || 0}
          type='Kanji'
          total={items ? items.kanjiTotal : 0}
          kanji={items ? items.kanji : 0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#d5d5d5',
    marginTop: 5,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    ...Platform.select({
      web: {
        cursor: 'default',
        userSelect: 'none'
      }
    })
  },
  progressBreak: {
    marginTop: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#bbbbbb',
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  }
})
