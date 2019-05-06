import React, { Component } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { MonoText } from '../StyledText'

export default class Navigation extends Component {
  constructor () {
    super()
    this.state = {
      scrolled: false
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.onScroll.bind(this))
  }
  componentWillUnMount () {
    window.removeEventListener('scroll', this.onScroll.bind(this))
  }
  onScroll () {
    this.setState({ scrolled: window.scrollY > 62 })
  }
  render () {
    const { scrolled } = this.state
    let scrollStyle = [styles.navigationContainer]
    scrolled && scrollStyle.push(styles.navigationScrolled)
    return (
      <View style={styles.navigation}>
        {scrolled ? <View style={styles.padding} /> : null}
        <View style={scrollStyle}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigation: {
    zIndex: 1000,
    width: '100vw',
    position: 'relative',
    backgroundColor: '#eee'
  },
  padding: {
    position: 'relative',
    width: '100vw',
    height: '125px'
  },
  navigationContainer: {
    width: '100vw',
    minHeight: '125px',
    backgroundColor: '#fafafa',
    position: 'relative',
    ...Platform.select({
      web: {
        position: 'static',
        boxShadow: '0 1px 10px rgba(0,0,0,0.1)',
        backgroundImage: 'linear-gradient(to bottom, #fff, #f2f2f2)',
        backgroundRepeat: 'repeat-x'
      }
    })
  },
  navigationScrolled: {
    minHeight: '62px',
    position: 'relative',
    ...Platform.select({
      web: {
        position: 'fixed'
      }
    })
  },
  scrolledPadding: {
    height: '62px',
    position: 'relative',
    flex: 1
  }
})
