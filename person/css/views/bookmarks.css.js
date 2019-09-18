import {css} from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '../../../vendor/beaker-app-stdlib/css/colors.css.js'
import buttonsCSS from '../../../vendor/beaker-app-stdlib/css/buttons2.css.js'

const cssStr = css`
${colorsCSS}
${buttonsCSS}

:host {
  display: block;
}

.empty {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
  color: gray;
}

.bookmark {
  display: flex;
  align-items: center;
  padding: 10px;
  color: #555;
  user-select: none;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
}

.bookmark:first-child {
  border-top: 1px solid #ddd;
}

.bookmark:hover {
  background: #f5f5f5;
}

.bookmark > * {
  margin-right: 8px;
  white-space: nowrap;
}

.bookmark .href,
.bookmark .description,
.bookmark .tags {
  overflow: hidden;
  text-overflow: ellipsis;
}

.bookmark .favicon img {
  display: block;
  width: 16px;
  height: 16px;
  object-fit: cover;
}

.bookmark .title {
  font-weight: 500;
}

.bookmark .href {
  color: var(--blue);
}
`
export default cssStr