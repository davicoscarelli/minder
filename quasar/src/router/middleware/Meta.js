import {i18n} from 'src/boot/i18n.js'

export default {
  async metaMeddleware(to) {
    const {
      meta: { name }
    } = to

    const appName = 'Minder'
    const pageTitle = name
    // const pageTitle = i18n.t(`${name}.title` )
    const titleName = name ? `${pageTitle} | ${appName}` : appName
    const [title] = document.getElementsByTagName('title')
    title.innerHTML = titleName
  }
}
