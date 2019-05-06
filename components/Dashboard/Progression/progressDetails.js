import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'

import { MonoText } from '../../StyledText'

type State = {
  itemsOpen: boolean
}
type Props = {
  level: number,
  type: 'Radicals' | 'Kanji',
  total: number,
  radicals?: Array<any>,
  kanji?: Array<any>
}

export default class ProgressDetails extends Component<State, Props> {
  state: State
  props: Props
  constructor () {
    super()
    this.state = {
      itemsOpen: false
    }
    this.openCloseItems = this.openCloseItems.bind(this)
  }

  openCloseItems () {
    this.setState({ itemsOpen: !this.state.itemsOpen })
  }

  render () {
    const { itemsOpen } = this.state
    const { level, type, total, radicals, kanji } = this.props
    let items = type === 'Radicals' ? radicals : kanji
    let progressPercent = total === 0 ? '0%' : ((total - items.length) / total * 100) + '%'

    return (
      <View style={styles.progressContainer}>
        <MonoText style={styles.progressHeader}>Level {level} {type} Progression</MonoText>

        <View style={styles.progressBar}>
          <View style={styles.progressThresholdRight} />
          <View style={styles.progressThresholdLeft}>
            <MonoText style={styles.progressGoal}>Goal: 90%</MonoText>
          </View>
          <View style={[styles[`progressCompleted${type}`], { width: progressPercent }]} />
        </View>

        <View style={styles.progressNumbers}>
          <MonoText style={styles.progressNumber}>0</MonoText>
          <MonoText style={styles.progressNumber}>{total}</MonoText>
        </View>

        <View style={styles.itemLattice}>
          <MonoText onClick={this.openCloseItems} style={styles.itemLatticeText}>
            See Apprentice {type} Left
            {
              itemsOpen
                ? <FontAwesome style={styles.fontAwesome}>{Icons.chevronUp}</FontAwesome>
                : <FontAwesome style={styles.fontAwesome}>{Icons.chevronDown}</FontAwesome>
            }
          </MonoText>
          {
            itemsOpen
              ? (
                <View style={styles.itemsContainer}>
                  {
                    items.map((item, index) => {
                      return (
                        <View key={index} style={[styles.itemContainer, styles[`itemContainer${type}`]]}>
                          <MonoText style={styles.itemCharecters}>{item.data.characters}</MonoText>
                        </View>
                      )
                    })
                  }
                </View>
              )
              : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    ...Platform.select({
      web: {
        cursor: 'default',
        userSelect: 'none'
      }
    })
  },
  progressHeader: {
    fontSize: 18,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    height: 20,
    backgroundColor: '#c8c8c8',
    ...Platform.select({
      web: {
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
      }
    })
  },
  progressThresholdLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '90%',
    height: 20,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.1)'
  },
  progressThresholdRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '10%',
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.75)'
  },
  progressGoal: {
    color: '#999',
    paddingRight: 5,
    textAlign: 'right',
    fontSize: 13,
    lineHeight: 20,
    textShadowColor: 'rgba(255,255,255,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0
  },
  progressCompletedRadicals: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 20,
    backgroundColor: '#00a1f1',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(to bottom, #0af, #0093dd)',
        backgroundRepeat: 'repeat-x',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.15)',
      }
    })
  },
  progressCompletedKanji: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 20,
    backgroundColor: '#f100a1',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(to bottom, #f0a, #dd0093)',
        backgroundRepeat: 'repeat-x',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.15)',
      }
    })
  },
  progressNumbers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1
  },
  progressNumber: {
    color: '#999',
    fontSize: 15,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0
  },
  itemLattice: {
    marginTop: 15,
    marginBottom: 15
  },
  itemLatticeText: {
    paddingTop: 3,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 'auto',
    color: '#888888',
    lineHeight: 20,
    textTransform: 'uppercase',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'ubuntu-bold',
    ...Platform.select({
      web: {
        cursor: 'pointer'
      }
    })
  },
  fontAwesome: {
    marginLeft: 5
  },
  itemsContainer: {
    marginTop: 15,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  itemContainer: {
    height: 39,
    width: 39,
    borderRadius: 19.5,
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 0 rgba(0,0,0,0.2) inset',
        cursor: 'pointer'
      }
    })
  },
  itemContainerKanji: {
    backgroundColor: '#f0a'
  },
  itemContainerRadicals: {
    backgroundColor: '#00a1f1'
  },
  itemCharecters: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 39,
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0
  }
})
