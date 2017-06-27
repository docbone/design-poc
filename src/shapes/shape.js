import './shape.css'

export default {
  props: {
    node: {
      required: true
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    borderWidth: {
      type: Number
    },
    borderColor: {
      type: String
    },
    backgroundColor: {
      type: String
    }
  },
  computed: {
    transform () {
      const { width, height } = this
      if (width > height) {
        return `scale(${width / height}, 1)`
      } else {
        return `scale(1, ${height / width})`
      }
    }
  }
}
