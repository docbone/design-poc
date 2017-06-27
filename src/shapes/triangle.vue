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
      <path d="M512 39.049l481.252 801.942h-962.506l481.252-801.942z"></path>
    </svg>
  </div>
</template>

<script>
  import Shape from './shape.js'

export default {
    mixins: [Shape]
  }
</script>
