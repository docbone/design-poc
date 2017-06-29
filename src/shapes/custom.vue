<template>
  <div class="shape-node"
    :style="{
      left: left ? left + 'px' : '',
      top: top ? top + 'px' : ''
    }">
    <svg :viewBox="viewBox" v-html="content"
      :width="width" :height="height"
      :stroke-width="borderWidth" :stroke="borderColor"
      :fill="backgroundColor ? backgroundColor : 'none'">
    </svg>
  </div>
</template>

<script>
  import Shape from './shape.js'

  const getMatches = function (regex, source) {
    const result = []
    let temp
    while ((temp = regex.exec(source)) !== null) {
      result.push(temp)
    }
    return result
  }

  export default {
    mixins: [Shape],

    props: {
      url: {
        type: String
      }
    },

    data () {
      return {
        viewBox: null,
        content: null
      }
    },

    methods: {
      updateContent () {
        if (!this.url) return
        const xhr = new XMLHttpRequest()
        xhr.open('GET', this.url, true)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const content = xhr.responseText
            const svgMatches = getMatches(/<svg((?:.|\n)*?)>((?:.|\n)+?)<\/svg>/gm, content)

            if (svgMatches.length > 0) {
              const match = svgMatches[0]
              this.content = match[2]
              const propsString = match[1]
              const propsMatch = getMatches(/([^\s]+)=(?:"(.+?)"|([^"\s]+))/gm, propsString)
              const props = {}
              propsMatch.forEach((match) => {
                props[match[1]] = match[2] || match[3]
              })
              if (props['viewBox']) {
                this.viewBox = props['viewBox']
              } else if (props['width'] && props['height']) {
                this.viewBox = `0 0 ${props.width} ${props.height}`
              }
            }
          }
        }
        xhr.send()
      }
    },

    watch: {
      url (val) {
        this.updateContent()
      }
    },

    mounted () {
      this.updateContent()
    }
  }
</script>
