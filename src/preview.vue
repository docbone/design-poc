<template>
  <div class="se-preview-wrapper">
    <div class="se-document-preview">
      <component v-for="node in modelEditor.root.children" key="$index"
        :node="node"
        :width="node.attrs.width" :height="node.attrs.height"
        :left="node.attrs.left" :top="node.attrs.top"
        :borderWidth="node.attrs.borderWidth" :borderColor="node.attrs.borderColor"
        :backgroundColor="node.attrs.backgroundColor"
        :is="'se-' + node.tagName"></component>
    </div>
  </div>
</template>

<style>
  .se-preview-wrapper {
  }

  .se-document-preview {
    position: absolute;
    width: 800px;
    height: 600px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
</style>

<script>
  import ModelEditor from './model-editor'
import {
    Star,
    Arrow,
    Rect,
    Circle,
    RoundedRect,
    Triangle
  } from './shapes'

import storage from './storage'

export default {
    name: 'simple-preview',

    components: {
      SeStar: Star,
      SeArrow: Arrow,
      SeRect: Rect,
      SeCircle: Circle,
      SeRoundedRect: RoundedRect,
      SeTriangle: Triangle
    },

    created () {
      this.modelEditor.load(storage.get())
    },

    data () {
      return {
        modelEditor: new ModelEditor()
      }
    }
  }
</script>
