import { LitElement, html } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import bookmarksViewCSS from '../../css/views/bookmarks.css.js'

export class BookmarksView extends LitElement {
  static get properties() {
    return {
      user: {type: Object},
      info: {type: Object},
      items: {type: Array}
    }
  }

  static get styles () {
    return bookmarksViewCSS
  }

  constructor () {
    super()
    this.user = undefined
    this.info = undefined
    this.items = []
    this.load()
  }

  async load () {
    if (!this.user) return

    var items = await UwG.bookmarks.list({
      author: [this.info.key],
      sortBy: 'createdAt',
      reverse: true
    })
    this.items = items
    console.log('loaded', this.items)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="beaker://assets/font-awesome.css">
      ${!this.items.length
        ? html`
          <div class="empty">
            ${this.info && this.info.title || 'Anonymous'} has not published any bookmarks.
          </div>`
        : ''}
      <div class="listing">
        ${repeat(this.items, item => this.renderItem(item))}
      </div>
    `    
  }

  renderItem (item) {
    return html`
      <a class="bookmark" href=${item.href}>
        <span class="favicon"><img src="asset:favicon:${item.href}"></span>
        <span class="title">${item.title}</span>
      </a>
    `
  }

  // events
  // =

}

customElements.define('bookmarks-view', BookmarksView)