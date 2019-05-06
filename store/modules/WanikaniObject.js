// @flow
import { observable } from 'mobx'
import Storage from '../../api/storage'
import { fetchReport, fetchCollection, fetchCollectionUpdatedAfter } from '../../api/wanikani'

class WanikaniObject {
  mainStore: any
  type: string
  report: boolean
  reportUpdate: boolean
  @observable object: any = null
  constructor (mainStore: any, type: string, report?: boolean = false, reportUpdate?: boolean = true) {
    this.mainStore = mainStore
    this.type = type
    this.report = report
    this.reportUpdate = reportUpdate
    this._getObjectStore()
  }

  _getObjectStore = () => {
    Storage.getItem(`@wanikani:${this.type}`)
      .then(item => {
        this.object = item
        if (this.mainStore.apiKey) {
          if (!this.object || (this.report && this.reportUpdate)) this._fetchObject()
          else if (!this.report) this._fetchCollectionUpdatedAfter()
        }
      })
      .catch(_ => {
        if ((!this.object || !Object.keys(this.object).length) && this.mainStore.apiKey) this._fetchObject()
      })
  }

  getObject (): null | any {
    return this.object
  }

  _fetchObject (): void {
    let fetchFunc = (this.report) ? fetchReport : fetchCollection
    fetchFunc(this.mainStore.apiKey, this.type)
      .then(object => {
        try {
          Storage.setItem(`@wanikani:${this.type}`, object)
        } catch (error) {}
        this.object = object
      })
  }

  _fetchCollectionUpdatedAfter (): void {
    fetchCollectionUpdatedAfter(this.mainStore.apiKey, this.type, this.object.content.last_update)
      .then(object => {
        try {
          Storage.mergeItem(`@wanikani:${this.type}`, object)
            .then(newObject => this.object = newObject)
        } catch (error) {}
      })
  }
}

export default WanikaniObject
