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
      <path d="M947.667 202.708v636.292c0 65.883-53.422 119.306-119.306 119.306h-636.292c-65.883 0-119.306-53.422-119.306-119.306v-636.292c0-65.883 53.422-119.306 119.306-119.306h636.292c65.883 0 119.306 53.422 119.306 119.306z"></path>
    </svg>
  </div>
</template>

<script>
  import Shape from './shape.js'

export default {
    mixins: [Shape]
  }
</script>
