<template>
  <div style="min-width: 1200px; height: 100%;">
    <div class="simple-editor">
      <div class="se-toolbar">
        <button class="se-btn"
          @click="modelEditor.undo()"
          :disabled="!modelEditor.undoable"><i class="se-iconfont se-icon-undo"></i></button>
        <button class="se-btn"
          @click="modelEditor.redo()"
          :disabled="!modelEditor.redoable"><i class="se-iconfont se-icon-redo"></i></button>
        <div class="se-space"></div>
        <button class="se-btn" @click="modelEditor.removeNode(modelEditor.currentNode)"
          :disabled="!modelEditor.currentNode"><i class="se-iconfont se-icon-delete"></i></button>
        <button class="se-btn" @click="save"
          :disabled="!modelEditor.undoable"><i class="se-iconfont se-icon-save"></i></button>
        <a class="se-btn" target="_blank" href="/#/simple/preview"><i class="se-iconfont se-icon-preview"></i></a>
        <div class="se-space"></div>
        <button class="se-btn" @click="selectedType = null"
          :class="{
            'se-btn--active': !selectedType
          }"><i class="se-iconfont se-icon-mouse"></i></button>
        <button class="se-btn"
          :class="{
            'se-btn--active': selectedType === 'star'
          }"
          @click="selectedType = 'star'"><i class="se-iconfont se-icon-star"></i></button>
        <button class="se-btn"
          :class="{
            'se-btn--active': selectedType === 'arrow'
          }"
          @click="selectedType = 'arrow'"><i class="se-iconfont se-icon-arrow"></i></button>
        <button class="se-btn"
          :class="{
            'se-btn--active': selectedType === 'circle'
          }"
          @click="selectedType = 'circle'"><i class="se-iconfont se-icon-circle"></i></button>
        <button class="se-btn"
          :class="{
            'se-btn--active': selectedType === 'triangle'
          }"
          @click="selectedType = 'triangle'"><i class="se-iconfont se-icon-triangle"></i></button>
        <button class="se-btn"
          :class="{
            'se-btn--active': selectedType === 'rect'
          }"
          @click="selectedType = 'rect'"><i class="se-iconfont se-icon-rect"></i></button>
        <button class="se-btn"
          :class="{
            'se-btn--active': selectedType === 'rounded-rect'
          }"
          @click="selectedType = 'rounded-rect'"><i class="se-iconfont se-icon-rounded-rect"></i></button>
      </div>
      <div class="se-editor-wrapper">
        <div ref="editor" class="se-document-editor">
          <component v-for="node in modelEditor.root.children" key="$index"
            :is="node.tagName + '-decorator'"
            decorated
            :decorator-selected="modelEditor.currentNode === node"
            decorator-selectable
            :model-editor="modelEditor"
            :node="node"></component>
        </div>
      </div>
      <div class="se-attrs-wrapper">
        <attrs-editor
          v-if="modelEditor.currentNode"
          :schema="schema"
          :node="modelEditor.currentNode"
          @prop-change="handlePropChange">
        </attrs-editor>
      </div>
    </div>
  </div>
</template>

<style>
  .simple-editor {
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: #B3B3B3;
  }

  .se-header {
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    padding-left: 25px;
    background: #EDEDEE;
    border-bottom: 1px solid #ccc;
  }

  .se-toolbar {
    box-sizing: border-box;
    width: 100px;
    padding: 80px 0 80px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
  }

  .se-btn {
    display: block;
    border: none;
    background-color: rgba(242,242,242,0.98);
    border-radius: 50%;
    box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);
    width: 2.7rem;
    height: 2.7rem;
    min-height: 2.7rem;
    margin: 0.2rem 0;
    pointer-events: auto;
    color: #333;
    position: relative;
    text-decoration: none;
    line-height: 2.5rem;
    padding: 2px 6px;
    box-sizing: border-box;
  }

  .se-btn:not([disabled]):active {
    background: #666;
    color: #f0f0f0;
  }

  .se-btn:focus {
    outline: none;
  }

  .se-btn > i {
    font-size: 20px;
  }

  .se-btn[disabled] {
    color: #ccc;
  }

  .se-btn--active {
    background: #333;
    color: #fff;
  }

  .se-space {
    display: block;
    padding-top: 1rem;
  }

  .se-editor-wrapper {
    flex: 1;
    position: relative;
    overflow: scroll;
  }

  .se-document-editor {
    position: absolute;
    width: 590px;
    height: 800px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .se-attrs-wrapper {
    width: 240px;
    background: #EDEDEE;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
  }

  .rr-content > .shape-node {
    position: static;
  }

  .rr-resizer {
    border-color: transparent;
  }
</style>

<script>
  import 'docbone/dist/docbone.css'
  import ModelEditor from './model-editor'
  import {
    StarDecorator,
    ArrowDecorator,
    RectDecorator,
    CircleDecorator,
    RoundedRectDecorator,
    TriangleDecorator,
    ImageDecorator,
    CustomDecorator,
    TextDecorator
  } from './decorators'

  import AttrsEditor from './attrs-editor'
  import { utils } from 'docbone'
  import storage from './storage'
  require('./assets/iconfont.css')

  export default {
    name: 'app',

    components: {
      StarDecorator,
      ArrowDecorator,
      RectDecorator,
      CircleDecorator,
      RoundedRectDecorator,
      TriangleDecorator,
      ImageDecorator,
      CustomDecorator,
      TextDecorator,
      AttrsEditor
    },

    created () {
      this.modelEditor.load(storage.get())
    },

    mounted () {
      utils.rectSelect(this.$refs.editor, ({ left, top, width, height }) => {
        const { selectedType, modelEditor } = this
        if (!selectedType) return

        const node = modelEditor.createElement(selectedType, {
          width, height, left, top
        })
        modelEditor.appendNode(node, modelEditor.root)
      })
    },

    methods: {
      handlePropChange (node, prop, val) {
        this.modelEditor.setAttr(node, {
          [prop]: val
        })
      },
      save () {
        storage.set(this.modelEditor.serialize())
      }
    },

    watch: {
      'modelEditor.currentNode' (val) {
        this.schema = val ? this.modelEditor.getElementSchema(val.tagName) : null
      }
    },

    data () {
      const modelEditor = new ModelEditor()

      return {
        modelEditor,
        schema: null,
        selectedType: null
      }
    }
  }
</script>
