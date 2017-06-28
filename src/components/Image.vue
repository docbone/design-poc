<template>
  <div class="shape-node">
    <img
      key="image"
      @mousedown.prevent
      :class="{
        'fit-width': fitMode === 'width',
        'fit-height': fitMode === 'height'
      }"
      :src='src'
      @load="handleLoad" />
  </div>
</template>

<style scoped>
  img {
    user-select: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  img.fit-width {
    width: 100%;
  }

  img.fit-height {
    height: 100%;
  }
</style>

<script>
import Shape from '../shapes/shape'
export default {
  name: 'image',

  mixins: [Shape],

  props: {
    src: {}
  },

  methods: {
    handleLoad (event) {
      const img = event.target
      this.imageWidth = img.width
      this.imageHeight = img.height
      this.updateFitMode()
    },

    updateFitMode () {
      const { width, height, imageWidth, imageHeight } = this

      console.log('this.updateFitMode', width, height, imageWidth, imageHeight)

      if (imageWidth !== null) {
        this.fitMode = width / height > imageWidth / imageHeight ? 'width' : 'height'
      } else {
        this.fitMode = 'width'
      }
    }
  },

  data () {
    return {
      imageWidth: null,
      imageHeight: null,
      fitMode: 'width'
    }
  }
}
</script>
