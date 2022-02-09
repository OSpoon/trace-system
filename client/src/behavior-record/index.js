const rrweb = require('rrweb')
const { v4: uuidv4 } = require('uuid')
import { config } from './config'
import docCookies from './cookies'

// behavior-record
export class BehaviorRecord {
  events = [];
  stopFn = null;
  uid = null;
  timer = null;

  startRecord(first = false) {
    if (first) {
      this.uid = uuidv4()
      docCookies.setItem('behavior-record-uid', this.uid)
    } else {
      this.uid = docCookies.getItem('behavior-record-uid')
    }
    if (!this.uid) {
      throw new Error('Unable to get UID, refer to development documentation.')
    }
    const ctx = this
    this.stopFn && this.stopFn()
    this.stopFn = rrweb.record({
      emit(event) {
        ctx.events.push(event)
      }
    })
    this.timer = setInterval(() => {
      if (ctx.events.length > 0) {
        this._requestEvents(this.uid, ctx.events)
        ctx.events = []
      }
    }, config.INTERVAL_TIME)
    return this.uid
  }

  stopRecord(last = false) {
    if (!this.stopFn) {
      throw new Error(
        'No startup recording found, refer to development documentation.'
      )
    }
    this.stopFn()
    clearInterval(this.timer)
    this.timer = null
    if (this.events.length > 0) {
      this._requestEvents(this.uid, this.events)
      this.events = []
    }
    if (last) {
      if (docCookies.hasItem('behavior-record-uid')) {
        docCookies.removeItem('behavior-record-uid')
        this.uid = ''
      }
    }
  }

  _requestEvents(uid, events) {
    this._request('track/update', {
      uid,
      timestamp: events[0].timestamp,
      events,
      userAgent: navigator.userAgent
    })
  }

  report() {
    // 负责业务数据上报
  }

  async _request(action, data) {
    return await fetch(`${config.EVENT_API}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  // start() {
  //   const ctx = this
  //   const uid = uuidv4()
  //   this.stopFn = rrweb.record({
  //     emit(event) {
  //       ctx.events.push(event)
  //     }
  //   })

  //   setInterval(() => {
  //     if (ctx.events.length > 0) {
  //       this._request('track/update', {
  //         uid,
  //         events: ctx.events
  //       })
  //       ctx.events = []
  //     }
  //   }, config.INTERVAL_TIME)

  //   return uid
  // }

  // // 结束
  // async finish(uid, options) {
  //   this.stopFn && this.stopFn()
  //   return await this._request('track/finish', {
  //     uid,
  //     options
  //   })
  // }
}
