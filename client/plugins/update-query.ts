import Vue from 'vue'


Vue.mixin({
  methods: {
    updateQuery(key) {
      return value => {
        const v = Array.isArray(value) ? value.join(',') : String(value)
        if (this.$route.query[key] !== v) {
          this.$router.push({ path: this.$route.path, query: { ...this.$route.query, [key]: v } })
        }
      }
    },
  },
})
