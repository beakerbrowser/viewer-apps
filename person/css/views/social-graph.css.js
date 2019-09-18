import {css} from '../../../vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '../../../vendor/beaker-app-stdlib/css/colors.css.js'
import buttonsCSS from '../../../vendor/beaker-app-stdlib/css/buttons2.css.js'
import tooltipCSS from '../../../vendor/beaker-app-stdlib/css/tooltip.css.js'
import labelCSS from '../label.css.js'

const cssStr = css`
${colorsCSS}
${buttonsCSS}
${tooltipCSS}
${labelCSS}

:host {
  display: block;
}

a {
  color: var(--blue);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.empty {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
  color: gray;
}

nav {
  display: flex;
  margin-bottom: 10px;
}

nav a {
  cursor: pointer;
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 3px;
  margin-right: 5px;
  color: inherit;
}

nav a:hover {
  background: #eee;
  text-decoration: none;
}

nav a.current {
  background: #eee;
}

.item {
  display: flex;
  align-items: center;
  margin: 0 0 5px;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 600px;
  user-select: none;
}

.item .thumb {
  margin-right: 20px;
}

.item .thumb img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);
}

.item .details {

}

.item .title {
  font-size: 18px;
  margin-bottom: 4px;
}

.item .description {
  font-size: 14px;
  margin-bottom: 4px;
}

.item .bottom-line {
  margin-bottom: 4px;
}

.item .bottom-line button {
  font-size: 9px;
  padding: 4px 6px;
}

.item .followers {
  font-size: 11px;
  color: gray;
}

`
export default cssStr