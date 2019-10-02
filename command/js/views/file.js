import { LitElement, html } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { until } from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/until.js'
import fileCSS from '../../css/views/file.css.js'

export class FileView extends LitElement {
  static get styles () {
    return fileCSS
  }

  async readFile () {
    try {
      var archive = new DatArchive(location)
      return await archive.readFile(location.pathname, 'utf8')
    } catch (e) {
      return e.toString()
    }
  }

  // rendering
  // =

  render () {
    return html`
      <h4>${location.pathname}</h4>
      <div class="content">${until(this.readFile(), 'Loading...')}</div>`
  }
}

customElements.define('file-view', FileView)