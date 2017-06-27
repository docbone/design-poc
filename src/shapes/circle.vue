<template>
  <div class="shape-node"
    :style="{
      left: left ? left + 'px' : '',
      top: top ? top + 'px' : ''
    }">
    <svg viewBox="0 0 1024 1024"
      :transform="transform"
      :width="width" :height="height"
      :stroke-width="borderWidth" :stroke="borderColor"
      :fill="backgroundColor">
      <path d="M840.177 183.822c-83.987-83.987-200.017-135.935-328.178-135.935-128.161 0-244.189 51.948-328.177 135.935-83.987 83.988-135.934 200.017-135.934 328.178s51.947 244.19 135.934 328.177c83.987 83.987 200.016 135.935 328.177 135.935 128.161 0 244.191-51.948 328.178-135.935s135.935-200.016 135.935-328.177-51.948-244.19-135.935-328.178z"></path>
    </svg>
  </div>
</template>

<script>
  import Shape from './shape.js'

export default {
    mixins: [Shape]
  }
</script>
