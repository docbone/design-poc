<template>
  <div class="se-attrs-editor">
    <div v-for="descriptor in props" class="se-prop-editor">
      <label>{{ descriptor.label || descriptor.prop }}</label>
      <div class="se-prop-editor-content">
        <input :type="descriptor.type === 'number' ? 'number' : 'text'" @change="handleInput($event, descriptor)" :value="node.attrs[descriptor.prop]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .se-attrs-editor {
  }

  .se-prop-editor {
    line-height: 32px;
    margin-bottom: 6px;

    > label {
      font-size: 14px;
      box-sizing: border-box;
      color: #333;
      display: block;
      border-left: 4px solid #666;
      padding-left: 10px;
      margin-bottom: 6px;
    }

    &-content {
      > input {
        width: 100%;
        height: 28px;
      }
    }
  }
</style>

<script>
  export default {
    name: 'editor-panel',

    props: {
      node: {
        required: true
      },
      schema: {
        required: true
      }
    },

    methods: {
      handleInput (event, descriptor) {
        const { prop } = descriptor
        let value = event.target.value
        if (descriptor.type === 'number') {
          value = parseFloat(value)
        }
        this.$emit('prop-change', this.node, prop, value)
      }
    },

    computed: {
      props () {
        return this.schema ? this.schema.props : []
      }
    }
  }
</script>
