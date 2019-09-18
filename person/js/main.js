import { LitElement, html } from '../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as QP from '../../vendor/beaker-app-stdlib/js/query-params.js'
import mainCSS from '../css/main.css.js'
import './com/nav.js'
import '../../vendor/beaker-app-stdlib/js/com/status/feed.js'
import './views/social-graph.js'
import './views/bookmarks.js'
import './views/dats.js'

export class PersonViewer extends LitElement {
  static get properties() {
    return {
      currentView: {type: String},
      user: {type: Object},
      info: {type: Object}
    }
  }

  static get styles () {
    return mainCSS
  }

  constructor () {
    super()
    this.currentView = QP.getParam('view', 'statuses')
    this.user = undefined
    this.info = undefined
    this.load()
  }

  async load () {
    if (!this.user) {
      this.user = await UwG.profiles.me()
    }
    var archive = new DatArchive(location)
    this.info = await archive.getInfo()
    this.libraryEntry = (await UwG.library.list({key: this.info.key, isSaved: true}))[0]
    this.isUserFollowing = !!(await UwG.follows.get(this.user.url, this.info.url))
    
    await this.requestUpdate()
    try {
      await this.shadowRoot.querySelector('[the-current-view]').load()
    } catch (e) {
      console.debug(e)
    }
  }

  // rendering
  // =

  render () {
    if (!this.info) return html``
    return html`
      <link rel="stylesheet" href="beaker://assets/font-awesome.css">
      <div class="banner">
        <div class="banner-inner">
          <img src="/thumb">
          <h1>${this.info && this.info.title || 'Anonymous'}</h1>
          <div class="banner-ctrls">
            ${this.info.url === this.user.url ? html`
              <span class="label">This is me</span>
              <div class="btn-group">
                <button class="big" @click=${this.onEditProfile}><span class="fas fa-fw fa-pencil-alt"></span> Edit Profile</button>
              </div>
            ` : this.info.isOwner ? html`
                <span class="label">My user</span>
                <div class="btn-group">
                  ${this.renderFollowBtn()}
                  <button class="big" @click=${this.onEditProfile}><span class="fas fa-fw fa-pencil-alt"></span> Edit Profile</button>
                </div>
              ` : html`
                <div class="btn-group">
                  ${this.renderFollowBtn()}
                  ${this.renderSaveBtn()}
                </div>
              `
          }
          </div>
        </div>
      </div>
      <div class="toolbar">
        <div class="toolbar-inner">
          <div class="description">
            ${this.info && this.info.description}
          </div>
        </div>
      </div>
      <div class="layout">
        <person-viewer-nav
          currentView=${this.currentView}
          @change-view=${this.onChangeView}
        ></person-viewer-nav>
        <main>
          ${this.renderView()}
        </main>
      </div>
    `    
  }

  renderFollowBtn () {
    return html`
      <button class="big" @click=${this.onToggleFollowing}>
        ${this.isUserFollowing ? html`
          <span class="fas fa-fw fa-check"></span> Following
        ` : html`
          <span class="fas fa-fw fa-rss"></span> Follow
        `}
      </button>
    `
  }

  renderSaveBtn () {
    return html`
      <button class="big" @click=${this.onToggleSaved}>
        ${!!this.libraryEntry ? html`
          <span class="fas fa-fw fa-save"></span> Saved
        ` : html`
          <span class="fas fa-fw fa-save"></span> Save
        `}
      </button>
    `
  }

  renderView () {
    switch (this.currentView) {
      case 'bookmarks':
        return html`
          <bookmarks-view
            the-current-view
            .user=${this.user}
            .info=${this.info}
          ></bookmarks-view>
        `
      case 'social-graph':
        return html`
          <social-graph-view
            the-current-view
            .user=${this.user}
            .info=${this.info}
          ></social-graph-view>
        `
      case 'websites':
        return html`
          <dats-view
            the-current-view
            .user=${this.user}
            .info=${this.info}
          ></dats-view>
        `
      default:
        return html`
          <beaker-status-feed
            the-current-view
            .user=${this.user}
            author=${window.location.origin}
          ></beaker-status-feed>
        `
    }
  }

  // events
  // =

  onChangeView (e) {
    this.currentView = e.detail.view
    QP.setParams({view: this.currentView})
    this.load()
  }

  async onEditProfile (e) {
    await UwG.profiles.editProfileDialog(this.info.url)
    this.load()
  }

  async onToggleFollowing (e) {
    if (this.isUserFollowing) {
      await UwG.follows.remove(this.info.url)
    } else {
      await UwG.follows.add(this.info.url)
    }
    this.load()
  }

  async onToggleSaved (e) {
    if (this.libraryEntry) {
      await UwG.library.configure(this.info.url, {isSaved: false})
    } else {
      await UwG.library.configure(this.info.url, {isSaved: true})
    }
    this.load()
  }
}

customElements.define('person-viewer', PersonViewer)