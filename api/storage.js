// @flow $flow-disable-next-line
import { AsyncStorage, Platform } from 'react-native'
import Localforage from 'localforage'

class Storage {
  db: AsyncStorage | Localforage
  constructor () {
    if (Platform.OS === 'web') {
      this.db = Localforage.createInstance({ name: 'WanikaniDB_API_V2', storeName: 'wk_cache_2_0', version: 2.0 })
    } else this.db = AsyncStorage
  }

  getItem (key: string) {
    if (Platform.OS === 'web') return this.db.getItem(key)
    else return this.db.getItem(key).then(value => JSON.parse(value))
  }

  setItem (key: string, value: Object) {
    if (Platform.OS === 'web') return this.db.setItem(key, value)
    else return this.db.setItem(key, JSON.stringify(value))
  }

  mergeItem (key: string, value: Object) { // SUPER STRANGE BEHAVIOUR HERE... objects self destruct
    if (Platform.OS === 'web') {
      // get, merge, set
      return this.db.getItem(key)
        .then(originalValue => {
          // value = { ...originalValue, ...value }
          if (value.content.last_update) originalValue.content.last_update = value.content.last_update
          for (let key in value.content.data) { originalValue.content.data[key] = value.content.data[key] }
          return this.db.setItem(key, originalValue)
        })
    } else {
      return this.db.mergeItem(key, JSON.stringify(value))
    }
  }
}

export default new Storage()
