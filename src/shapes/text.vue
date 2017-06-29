<template>
  <div class="shape-node"
    :style="{
      left: left ? left + 'px' : '',
      top: top ? top + 'px' : '',
      width: width ? width + 'px' : '',
      height: height ? height + 'px' : '',
      borderWidth: borderWidth ? borderWidth + 'px' : '',
      borderColor: borderColor,
      backgroundColor: backgroundColor
    }">
    {{ text }}
  </div>
</template>

<script>
  import Shape from './shape.js'

export default {
    mixins: [Shape],

    props: {
      text: {
        type: String
      }
    }
  }
</script>
