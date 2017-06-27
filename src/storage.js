import defaultDocument from './default-document'
const SIMPLE_EDITOR_SAVE_KEY = 'simple-editor-document'

export default {
  set (document) {
    if (typeof document === 'object') document = JSON.stringify(document)
    localStorage.setItem(SIMPLE_EDITOR_SAVE_KEY, document)
  },

  get () {
    try {
      const savedDoc = JSON.parse(localStorage.getItem(SIMPLE_EDITOR_SAVE_KEY))
      if (!savedDoc) throw new Error('go to default doc')
      return savedDoc
    } catch (e) {
      return defaultDocument
    }
  }
}
