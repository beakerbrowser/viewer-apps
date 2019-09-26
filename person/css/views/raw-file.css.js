import {css} from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

h3 {
  margin: 0 0 10px;
}

pre {
  max-width: 100%;
  overflow: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

img,
video,
audio {
  max-width: 100%;
}
`
export default cssStr