<template>
  <div class="shape-node"
    :style="{
      left: left ? left + 'px' : '',
      top: top ? top + 'px' : ''
    }">
    <svg viewBox="0 0 1264 1024"
      :transform="transform"
      :width="width" :height="height"
      :stroke-width="borderWidth" :stroke="borderColor"
      :fill="backgroundColor">
      <path d="M1203.929 476.367l-427.103-430.012c-8.547-8.857-20.523-14.356-33.783-14.356s-25.235 5.499-33.77 14.343l-67.522 68.821c-8.682 8.828-14.042 20.948-14.042 34.319s5.36 25.491 14.049 34.326l231.291 232.193h-791.667c-27.303 0-49.382 21.458-49.382 47.999v95.997c0 26.541 22.079 47.999 49.41 47.999h789.013l-231.41 232.257c-8.68 8.845-14.038 20.977-14.038 34.361s5.358 25.516 14.046 34.369l67.529 68.828c18.55 18.917 48.846 18.917 67.565 0l429.814-432.637c8.601-8.897 13.901-21.031 13.901-34.403s-5.301-25.508-13.914-34.418z"></path>
    </svg>
  </div>
</template>

<script>
  import Shape from './shape.js'

export default {
    mixins: [Shape]
  }
</script>
