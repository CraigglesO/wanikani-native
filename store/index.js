// @flow
/** PACKAGES **/
import { observable, computed, toJS } from 'mobx'
import moment from 'moment'
/** MODULES **/
import WanikaniObject from './modules/WanikaniObject'

type srsStat = {
  radicals: number,
  kanji: number,
  vocabulary: number,
  total: number
}
type srsProgress = {
  apprentice: srsStat,
  guru: srsStat,
  master: srsStat,
  enlightened: srsStat,
  burned: srsStat
}

type LevelProgression = {
  level: number,
  items: {
    radical: Array<any>,
    radicalTotal: number,
    kanji: Array<any>,
    kanjiTotal: number
  }
}

moment.updateLocale('en', { relativeTime: { future: "~%s", past: "%s", s: 'a few seconds', ss: '%d seconds', m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } });

class Store { // $flow-disable-next-line
  // @observable apiKey: string = JSON.parse(window.localStorage.getItem('wanikani-api-key') || null)
  @observable apiKey: string = '1e0db235-1a03-496b-8890-587926e720fe'
  @observable loading: boolean = true
  assignments: WanikaniObject
  levelProgressions: WanikaniObject
  reviews: WanikaniObject
  reviewStatistics: WanikaniObject
  srsStages: WanikaniObject
  studyMatertials: WanikaniObject
  subjects: WanikaniObject
  summary: WanikaniObject
  summaryObject: any
  user: WanikaniObject
  constructor () {
    // TODO: summary only updates houry. So "refresh" if last update date is not within the same hour
    // TODO: studyMaterials should be checked less regularly
    // TODO: assuming reviews and assignments have not updated, then we know levelProgressions and reviewStatistics have not either...
    this.user = new WanikaniObject(this, 'user', true, false)
    this.summary = new WanikaniObject(this, 'summary', true)
    this.srsStages = new WanikaniObject(this, 'srsStages', true, false)
    this.assignments = new WanikaniObject(this, 'assignments')
    this.levelProgressions = new WanikaniObject(this, 'levelProgressions')
    this.reviews = new WanikaniObject(this, 'reviews')
    this.reviewStatistics = new WanikaniObject(this, 'reviewStatistics')
    this.studyMatertials = new WanikaniObject(this, 'studyMaterials')
    this.subjects = new WanikaniObject(this, 'subjects', true, false) // SUBJECTS are HUGE, do this last as it slows down the compute render
  }

  @computed get summaryReviews (): null | { nextReview: string, nextHour: number, nextDay: number } {
    try {
      let dayReviews = this.summary.object.content.data.data.reviews
      let nextReview = dayReviews.findIndex(review => review.subject_ids.length)
      if (nextReview === 0) nextReview = 'Available Now'
      else nextReview = moment(dayReviews[nextReview].available_at).toNow()
      let nextHour = dayReviews[1].subject_ids.length
      let nextDay = dayReviews.reduce((accum, review, index) => {
        if (index > 1) return accum + review.subject_ids.length
        else return accum
      }, 0)
      return { nextReview, nextHour, nextDay }
    } catch (_) {
      return null
    }
  }

  // TODO: We need to store '@wanikani:currentSrsProgress' so that this is much faster
  // if assignments change, we must also update 'currentSrsProgress'
  @computed get srsProgress (): null | srsProgress {
    try {
      let { data } = this.assignments.object.content
      let srsProgress: srsProgress = {
        apprentice: { radical: 0, kanji: 0, vocabulary: 0, total: 0 },
        guru: { radical: 0, kanji: 0, vocabulary: 0, total: 0 },
        master: { radical: 0, kanji: 0, vocabulary: 0, total: 0 },
        enlightened: { radical: 0, kanji: 0, vocabulary: 0, total: 0 },
        burned: { radical: 0, kanji: 0, vocabulary: 0, total: 0 }
      }
      for (let key in data) {
        let { srs_stage, subject_type } = data[key].data
        let stage
        if (srs_stage < 1) continue
        else if (srs_stage < 5) stage = 'apprentice'
        else if (srs_stage < 7) stage = 'guru'
        else if (srs_stage < 8) stage = 'master'
        else if (srs_stage < 9) stage = 'enlightened'
        else stage = 'burned'
        srsProgress[stage][subject_type]++
        srsProgress[stage]['total']++
      }
      return srsProgress
    } catch (_) {
      return null
    }
  }

  // TODO: We need to store '@wanikani:currentLevelProgression' so that this is much faster
  // if assignments change, we must also update 'currentLevelProgression'
  @computed get levelProgression (): null | LevelProgression {
    try {
      let { level } = this.user.object.content.data.data
      let { data } = this.assignments.object.content
      let items = { radical: [], radicalTotal: 0, kanji: [], kanjiTotal: 0 }
      for (let key in data) {
        let { srs_stage, subject_type, subject_id } = data[key].data
        if (subject_type !== 'vocabulary') {
          let subject = this.subjects.object.content.data[subject_id]
          if (subject.data.level === level) {
            items[`${subject_type}Total`]++
            if (srs_stage > 1 && srs_stage < 5) items[subject_type].push(subject)
          }
        }
      }
      return { level, items }
    } catch (_) {
      return null
    }
  }
}

export default new Store()
