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
      <path d="M510.196 16.598l118.661 353.236 355.932 9.609-282.593 227.894 101.309 359.189-293.309-212.404-293.281 212.404 101.311-359.189-282.594-227.894 355.931-9.609 118.634-353.236z" p-id="929">
      </path>
    </svg>
  </div>
</template>

<script>
  import Shape from './shape.js'

export default {
    mixins: [Shape]
  }
</script>
