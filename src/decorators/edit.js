import { decorate } from 'docbone'
import RotatableResizer from 'rotatable-resizer'
import 'rotatable-resizer/dist/resizer.css'
import QuillInlineEditor from 'quill-inline-editor'
import 'quill-inline-editor/dist/editor.css'

const createMixin = (options) => {
  return {
    props: {
      resizeOptions: {}
    },

    components: {
      RotatableResizer,
      QuillInlineEditor
    },

    data () {
      return {
        style: null
      }
    },

    methods: {
      handleDrag () {
        if (options.handleDrag) {
          options.handleDrag.apply(this, arguments)
        }
      },
      handleDragEnd () {
        if (options.handleDragEnd) {
          options.handleDragEnd.apply(this, arguments)
        }
      },
      handleResizeStart () {
        if (options.handleResizeStart) {
          options.handleResizeStart.apply(this, arguments)
        }
      },
      handleResize () {
        if (options.handleResize) {
          options.handleResize.apply(this, arguments)
        }
      },
      handleResizeEnd () {
        if (options.handleResizeEnd) {
          options.handleResizeEnd.apply(this, arguments)
        }
      },
      getWrapperStyle () {
        return options && options.getWrapperStyle ? options.getWrapperStyle.call(this) : {}
      }
    },

    mounted () {
      this.decoratorClasses = ['db-resizer']

      this.wrapperStyle = this.getWrapperStyle()

      this.node.on('change', () => {
        this.$nextTick(() => {
          this.wrapperStyle = this.getWrapperStyle()
        })
      })
    }
  }
}

export default function (Component, options) {
  return decorate(Component, [createMixin(options)], {
    render (h) {
      const node = this.node
      const self = this

      return h('rotatable-resizer', {
        props: {
          active: this.decoratorSelected,
          dragMode: 'border',
          ...node.attrs
        },
        style: this.getWrapperStyle(),
        on: {
          change (state) {
            self.handleResizeEnd.apply(self, arguments)
          },
          input (state) {
            self.handleResize.apply(self, arguments)
          },
          'before-input' (state) {
            self.handleResizeStart.apply(self, arguments)
          }
        }
      }, [
        h('quill-inline-editor', {
          props: {
            content: node.attrs.text
          }
        }, [h(Component, {
          nativeOn: {
            mousedown: this.handleMouseDown
          },
          props: {
            node,
            decorated: true,
            ...this.getComponentProps(),
            ...node.attrs
          }
        }, this.$slots.default)])
      ])
    }
  })
}
