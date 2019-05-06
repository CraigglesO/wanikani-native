// @flow
import axios from 'axios'
import snakeCase from 'snake-case'

type Subscription = {
  active: boolean,
  type: 'free' | 'recurring' | 'lifetime',
  max_level_granted: number,
  period_ends_at: string // Date
}

type Preferences = {
  lessons_autoplay_audio: boolean,
  lessons_batch_size: number,
  lessons_presentation_order: 'ascending_level_then_subject' | 'shuffled' | 'ascending_level_then_shuffled' | 'ascending_level_then_subject',
  reviews_autoplay_audio: boolean,
  reviews_display_srs_indicator: boolean
}

export type UserData = {
  id: string,
  username: string,
  level: number,
  max_level_granted_by_subscription: number,
  profile_url: string,
  started_at: string, // Date
  subscribed: boolean,
  current_vacation_started_at: string, // Date
  subscription: Subscription,
  preferences: Preferences
}

export type User = {
  name: 'apiv2.user',
  content: {
    data: {
      data: UserData,
      data_updated_at: string, // Date
      object: 'user',
      url: string
    },
    last_update: string // Date
  }
}

export type Assignment = {
  id: number,
  object: string,
  url: string,
  data_updated_at: string, // Date
  data: {
    created_at: string, // Date
    subject_id: number,
    subject_type: "kanji",
    srs_stage: number,
    srs_stage_name: string,
    unlocked_at: null | string, // Date
    started_at: null | string, // Date
    passed_at: null | string, // Date
    burned_at: null | string, // Date
    available_at: null | string, // Date
    resurrected_at: null | string, // Date
    passed: boolean,
    resurrected: boolean,
    hidden: boolean
  }
}

export type Assignments = {
  name: 'apiv2.assignments',
  content: {
    data: {
      [string]: Assignment
    },
    last_update: string // Date
  }
}

export type Subject = {
  id: number,
  object: 'radical' | 'kanji' | 'vocabulary',
  url: string,
  data_updated_at: string, // Date
  data: {
    created_at: string, // Date
    level: number,
    slug: string, // The string that is used when generating the document URL for the subject.
    hidden_at: null | string, // Date
    document_url: string,
    characters: null | string,
    character_images: [{url: string, metadata: Object, content_type: string}],
    meanings: [{meaning: string, primary: boolean, accepted_answer: boolean}],
    meaning_mnemonic: string,
    auxiliary_meanings: [{meaning: string, type: 'blacklist' | 'whitelist'}],
    amalgamation_subject_ids: [number],
    lesson_position: number
  }
}

export type Subjects = {
  name: 'apiv2.subjects',
  content: {
    data: {
      [string]: Subject
    },
    last_update: string
  }
}

export type LevelProgression = {
  id: number,
  object: 'level_progression',
  url: string,
  'data_updated_at': string,
  data: {
    'created_at': string,
    'level': number,
    'unlocked_at': string,
    'started_at': string,
    'passed_at': null | string,
    'completed_at': null | string,
    'abandoned_at': null | string
  }
}

export type LevelProgressions = {
  name: 'apiv2.level_progressions',
  content: {
    data: {
      [string]: LevelProgression
    },
    last_update: string
  }
}

export type SrsStage = {

}

export type SrsStages = {
  name: "apiv2.srs_stages",
  content: {
    data: {
      data: SrsStage,
      data_updated_at: string, // Date
      object: 'report',
      url: string
    },
    last_update: "2019-05-05T02:46:56.163Z"
  }
}

/** COLLECTION **/
export function fetchCollection (apiKey: string, type: string): Promise<Subjects> {
  type = snakeCase(type)
  let res = {
    name: `apiv2.${type}`,
    content: {
      data: {},
      last_update: (new Date()).toJSON()
    }
  }
  let date = new Date(0)
  return wanikaniGet(apiKey, type, [], { key: 'updated_after', value: date.toJSON() })
    .then(typeData => {
      typeData.forEach(data => res.content.data[data.id] = data)
      return res
    })
    .catch(err => { return err })
}

export function fetchCollectionUpdatedAfter (apiKey: string, type: string, latestCachedDate: string) {
  type = snakeCase(type)
  let res = {
    name: `apiv2.${type}`,
    content: {
      data: {},
      last_update: (new Date()).toJSON()
    }
  }
  return wanikaniGet(apiKey, type, [], { key: 'updated_after', value: latestCachedDate })
    .then(typeData => {
      typeData.forEach(data => res.content.data[data.id] = data)
      return res
    })
    .catch(err => { return err })
}

/** SINGLE **/
export function fetchReport (apiKey: string, type: string): Promise<User> {
  type = snakeCase(type)
  let res = {
    name: `apiv2.${type}`,
    content: {
      data: {},
      last_update: (new Date()).toJSON()
    }
  }
  return wanikaniGet(apiKey, type, [])
    .then(data => {
      res.content.data = data
      return res
    })
    .catch(err => { return err })
}

/** WANIKANI_GET **/
function wanikaniGet (
  apiKey: string,
  endpoint: string,
  data: Array<null | Assignment>,
  ...variables: Array<{key: string, value: string}>
) {
  let vars: string = ''
  if (variables.length) {
    vars = '?' + variables.map(variable => `${variable.key}=${variable.value}`).join('&')
  }
  return axios
    .get(`https://api.wanikani.com/v2/${endpoint}${vars}`, {
      headers: {
        'Wanikani-Revision': '20170710',
        Authorization: 'Bearer ' + apiKey
      }
    })
    .then(res => {
      // console.log(res)
      if (res.data.object === 'collection') data = data.concat(res.data.data)
      else return res.data
      if (res.data.pages && res.data.pages.next_url) {
        variables = res.data.pages.next_url.split('?')[1].split('&').map(variable => {
          variable = variable.split('=')
          return { key: variable[0], value: variable[1] }
        })
        return wanikaniGet(apiKey, endpoint, data, ...variables)
      }
      return data
    })
    .catch(err => err)
}
