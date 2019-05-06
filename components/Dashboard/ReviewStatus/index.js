import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Platform,
  StyleSheet,
  View
} from 'react-native'
import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome'

import { createStyles, maxWidth } from 'react-native-media-queries'

import { MonoText } from '../../StyledText'

@inject('store')
@observer
export default class ReviewStatus extends React.Component {
  render () {
    const { summaryReviews } = this.props.store

    return (
      <View style={styles.reviewStatusList}>
        <View style={[styles.reviewStatusItem, styles.nextReview]}>
          <MonoText style={styles.itemContent}>{summaryReviews ? summaryReviews.nextReview : 'Unknown'}</MonoText>
          <MonoText style={styles.itemExplain}>
            <FontAwesome type={IconTypes.FAR} style={styles.fontAwesome}>{Icons.clock}</FontAwesome>
            Next Review
          </MonoText>
        </View>

        <View style={[styles.reviewStatusItem, styles.nextHour]}>
          <MonoText style={styles.itemContent}>{summaryReviews ? summaryReviews.nextHour : 0}</MonoText>
          <MonoText style={styles.itemExplain}>
            <FontAwesome style={styles.fontAwesome}>{Icons.inbox}</FontAwesome>
            Next Hour
          </MonoText>
        </View>

        <View style={[styles.reviewStatusItem, styles.nextDay]}>
          <MonoText style={styles.itemContent}>{summaryReviews ? summaryReviews.nextDay : 0}</MonoText>
          <MonoText style={styles.itemExplain}>
            <FontAwesome style={styles.fontAwesome}>{Icons.inbox}</FontAwesome>
            Next Day
          </MonoText>
        </View>
      </View>
    )
  }
}

const styles = createStyles(
  {
    reviewStatusList: {
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
    reviewStatusItem: {
      padding: 22.5,
      justifyContent: 'center',
      width: 'auto',
      flex: 1,
      borderRightWidth: 1,
      borderRightColor: '#d5d5d5',
      borderLeftWidth: 1,
      borderLeftColor: '#fff',
      ...Platform.select({
        web: {
          borderRightStyle: 'solid',
          borderLeftStyle: 'solid'
        }
      })
    },
    nextReview: {
      borderLeftWidth: 0
    },
    nextHour: {},
    nextDay: {
      borderRightWidth: 0
    },
    itemContent: {
      fontSize: 36,
      fontFamily: 'ubuntu-bold',
      textAlign: 'center',
      marginBottom: 14,
      textShadowColor: 'rgba(255, 255, 255, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2
    },
    itemExplain: {
      textAlign: 'center',
      fontSize: 16,
      textShadowColor: 'rgba(255, 255, 255, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2
    },
    fontAwesomeContainer: {
      display: 'flex',
      marginRight: 4
    },
    fontAwesome: {
      // display: 'flex',
      marginRight: 4,
      fontSize: 15
    }
  },
  maxWidth(980, {
    reviewStatusList: {
      flexWrap: 'wrap'
    },
    reviewStatusItem: {
      flexGrow: 1,
      flexBasis: '50%'
    },
    nextReview: {
      flexBasis: '100%',
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#d5d5d5'
    },
    nextHour: {
      borderLeftWidth: 0,
      borderTopWidth: 1,
      borderTopColor: '#fff'
    },
    nextDay: {
      borderTopWidth: 1,
      borderTopColor: '#fff'
    }
  })
)
