import { LitElement, html } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { repeat } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { joinPath } from '../../../vendor/beaker-app-stdlib/js/strings.js'
import { emit } from '../../../vendor/beaker-app-stdlib/js/dom.js'
import mainCSS from '../../css/com/file-grid.css.js'

export class FileGrid extends LitElement {
  static get properties() {
    return {
      items: {type: Array},
      info: {type: Object},
      selection: {type: Array}
    }
  }

  static get styles () {
    return mainCSS
  }

  constructor () {
    super()
    this.items = []
    this.selection = []
    this.addEventListener('click', this.onClickOutside.bind(this))
  }

  async load () {
  }

  get folders () {
    return this.items.filter(i => i.stat.isDirectory())
  }

  get files () {
    return this.items.filter(i => i.stat.isFile())
  }
  // rendering
  // =

  render () {
    var folders = this.folders
    var files = this.files

    return html`
      <link rel="stylesheet" href="beaker://assets/font-awesome.css">
      ${folders.length > 0 ? html`
        <h4>Folders</h4>
        <div class="grid">
          ${repeat(folders, this.renderItem.bind(this))}
        </div>
      ` : ''}
      ${files.length > 0 ? html`
        <h4>Files</h4>
        <div class="grid">
          ${repeat(files, this.renderItem.bind(this))}
        </div>
      ` : ''}
    `
  }

  renderItem (item) {
    var cls = classMap({
      item: true,
      folder: item.stat.isDirectory(),
      file: item.stat.isFile(),
      selected: this.selection.includes(item)
    })
    var icon = 'file'
    if (item.stat.isDirectory()) {
      icon = 'folder'
    }
    return html`
      <div
        class=${cls}
        @click=${e => this.onClick(e, item)}
        @dblclick=${e => this.onDblClick(e, item)}
      >
        <span class="fas fa-fw fa-${icon}"></span>
        ${item.stat.mount ? html`<span class="fas fa-external-link-square-alt"></span>` : ''}
        <span class="name">${item.name}</span>
      </div>
    `
  }

  // events
  // =

  onClickOutside (e) {
    emit(this, 'change-selection', {detail: {selection: []}})
  }

  onClick (e, item) {
    e.preventDefault()
    e.stopPropagation()
    
    var selection
    if (e.metaKey) {
      selection = this.selection.concat([item])
    } else {
      selection = [item]
    }
    emit(this, 'change-selection', {detail: {selection}})
  }

  onDblClick (e, item) {
    window.location = joinPath(window.location.toString(), item.name)
  }
}

customElements.define('file-grid', FileGrid)