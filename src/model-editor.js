import { ModelEditor } from 'docbone'

const PROPS = [{
  prop: 'left',
  label: '横坐标',
  type: 'number',
  defaultValue: 0
}, {
  prop: 'top',
  label: '纵坐标',
  type: 'number',
  defaultValue: 0
}, {
  prop: 'width',
  label: '宽度',
  type: 'number',
  defaultValue: 100
}, {
  prop: 'height',
  label: '高度',
  type: 'number',
  defaultValue: 100
}, {
  prop: 'borderWidth',
  label: '边框宽度',
  type: 'number'
}, {
  prop: 'borderColor',
  label: '边框颜色',
  type: 'string'
}, {
  prop: 'backgroundColor',
  label: '背景颜色',
  type: 'string',
  defaultValue: '#ccc'
}]

const SHAPES = ['star', 'rect', 'rounded-rect', 'arrow', 'triangle', 'circle']

export default class extends ModelEditor {
  constructor () {
    super()
    SHAPES.forEach((shape) => {
      this.defineElement(shape, {
        type: shape,
        props: PROPS
      })
    })
  }
};
