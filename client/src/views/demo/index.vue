<template>
  <div>
    <button @click="start(true)">start(true)</button>

    <button @click="start()">start(false)</button>

    <button @click="stop(true)">stop(true)</button>

    <button @click="stop()">stop(false)</button>

    <input id="" type="text" name="">
  </div>
</template>

<script>
export default {
  name: 'Demo',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    start(bool) {
      if (bool) {
        const uid = window.rb.startRecord(true)
        console.log('[ uid true ] >', uid)
      } else {
        const uid = window.rb.startRecord(false)
        console.log('[ uid false ] >', uid)
      }
    },
    stop(bool) {
      if (bool) {
        window.rb.stopRecord(true)
      } else {
        window.rb.stopRecord(false)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
