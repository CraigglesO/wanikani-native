import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Platform,
  View
} from 'react-native'

import { createStyles, maxWidth } from 'react-native-media-queries'

import { MonoText } from '../../StyledText'

@inject('store')
@observer
export default class SrsProgress extends React.Component {
  render () {
    const { srsProgress } = this.props.store
    return (
      <View style={styles.srsProgressList}>
        <View style={[styles.srsProgressItem, styles.apprentice]}>
          <MonoText style={styles.itemContent}>{srsProgress ? srsProgress.apprentice.total : 0}</MonoText>
          <MonoText style={styles.itemExplain}>Apprentice</MonoText>
        </View>

        <View style={[styles.srsProgressItem, styles.guru]}>
          <MonoText style={styles.itemContent}>{srsProgress ? srsProgress.guru.total : 0}</MonoText>
          <MonoText style={styles.itemExplain}>Guru</MonoText>
        </View>

        <View style={[styles.srsProgressItem, styles.master]}>
          <MonoText style={styles.itemContent}>{srsProgress ? srsProgress.master.total : 0}</MonoText>
          <MonoText style={styles.itemExplain}>Master</MonoText>
        </View>

        <View style={[styles.srsProgressItem, styles.enlightened]}>
          <MonoText style={styles.itemContent}>{srsProgress ? srsProgress.enlightened.total : 0}</MonoText>
          <MonoText style={styles.itemExplain}>Enlightened</MonoText>
        </View>

        <View style={[styles.srsProgressItem, styles.burned]}>
          <MonoText style={styles.itemContent}>{srsProgress ? srsProgress.burned.total : 0}</MonoText>
          <MonoText style={styles.itemExplain}>Burned</MonoText>
        </View>
      </View>
    )
  }
}

const styles = createStyles(
  {
    srsProgressList: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      ...Platform.select({
        web: {
          cursor: 'default',
          userSelect: 'none'
        }
      })
    },
    srsProgressItem: {
      padding: 22.5,
      paddingTop: 30,
      justifyContent: 'center',
      width: 'auto',
      flex: 1,
      ...Platform.select({
        web: {
          boxShadow: 'inset 1px 10px 9px -6px rgba(0,0,0,0.3)'
        }
      })
    },
    itemContent: {
      fontSize: 24,
      fontFamily: 'ubuntu-bold',
      textAlign: 'center',
      color: '#fff',
      marginBottom: 8,
      textShadowColor: 'rgba(0, 0, 0, 0.55)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1
    },
    itemExplain: {
      textAlign: 'center',
      fontSize: 15,
      color: 'rgba(0,0,0,0.3)'
    },
    apprentice: {
      backgroundColor: '#dd0093',
      borderBottomLeftRadius: 5,
      ...Platform.select({
        web: {
          position: 'static',
          backgroundImage: 'linear-gradient(-45deg, #f0a, #dd0093)',
          backgroundRepeat: 'repeat-x'
        }
      })
    },
    guru: {
      backgroundColor: '#882d9e',
      ...Platform.select({
        web: {
          position: 'static',
          backgroundImage: 'linear-gradient(-45deg, #aa38c6, #882d9e)',
          backgroundRepeat: 'repeat-x'
        }
      })
    },
    master: {
      backgroundColor: '#294ddb',
      ...Platform.select({
        web: {
          position: 'static',
          backgroundImage: 'linear-gradient(-45deg, #5571e2, #294ddb)',
          backgroundRepeat: 'repeat-x'
        }
      })
    },
    enlightened: {
      backgroundColor: '#0093dd',
      ...Platform.select({
        web: {
          position: 'static',
          backgroundImage: 'linear-gradient(-45deg, #0af, #0093dd)',
          backgroundRepeat: 'repeat-x'
        }
      })
    },
    burned: {
      backgroundColor: '#434343',
      borderBottomRightRadius: 5,
      ...Platform.select({
        web: {
          position: 'static',
          backgroundImage: 'linear-gradient(-45deg, #555, #434343)',
          backgroundRepeat: 'repeat-x'
        }
      })
    }
  },
  maxWidth(765, {
    srsProgressList: {
      flexWrap: 'wrap'
    },
    srsProgressItem: {
      flexGrow: 1,
      flexBasis: '50%',
      ...Platform.select({
        web: {
          boxShadow: 'none'
        }
      })
    },
    apprentice: {
      ...Platform.select({
        web: {
          boxShadow: 'inset 1px 10px 9px -6px rgba(0,0,0,0.3)'
        }
      }),
      borderBottomLeftRadius: 0
    },
    guru: {
      ...Platform.select({
        web: {
          boxShadow: 'inset 1px 10px 9px -6px rgba(0,0,0,0.3)'
        }
      })
    },
    burned: {
      borderBottomLeftRadius: 5
    }
  })
)
