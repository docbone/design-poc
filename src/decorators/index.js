import {
  Star, Rect, Circle, RoundedRect, Triangle, Arrow, Custom
} from '../shapes'
import Image from '@/components/Image'
import { ResizeDecorator } from 'docbone'

const resizeOptions = {
  handleDragEnd (dragState) {
    const { node, modelEditor } = this

    modelEditor.setAttr(node, {
      left: dragState.left,
      top: dragState.top
    })
  },
  handleResizeStart () {
    const { width, height, left, top } = this.node.attrs
    this.beforeResizeProps = {
      width, height, left, top
    }
  },
  handleResize (dragState) {
    this.node.setAttr({
      width: dragState.width,
      height: dragState.height,
      left: dragState.left,
      top: dragState.top
    })
    this.updateFitMode && this.updateFitMode()
  },
  handleResizeEnd (dragState) {
    const { node, modelEditor } = this

    modelEditor.setAttr(node, {
      width: dragState.width,
      height: dragState.height,
      left: dragState.left,
      top: dragState.top
    }, this.beforeResizeProps)

    this.beforeResizeProps = null
  },
  getWrapperStyle () {
    const attrs = this.node.attrs

    return {
      left: attrs.left + 'px',
      top: attrs.top + 'px',
      width: attrs.width + 'px',
      height: attrs.height + 'px'
    }
  }
}

export const StarDecorator = ResizeDecorator(Star, resizeOptions)
export const RectDecorator = ResizeDecorator(Rect, resizeOptions)
export const CircleDecorator = ResizeDecorator(Circle, resizeOptions)
export const RoundedRectDecorator = ResizeDecorator(RoundedRect, resizeOptions)
export const TriangleDecorator = ResizeDecorator(Triangle, resizeOptions)
export const ArrowDecorator = ResizeDecorator(Arrow, resizeOptions)
export const CustomDecorator = ResizeDecorator(Custom, resizeOptions)
export const ImageDecorator = ResizeDecorator(Image, resizeOptions)
