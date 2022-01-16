<template>
  <el-dialog
    title="查看追溯详情"
    width="1024px"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <div ref="playerDialogVideo" style="overflow: hidden;" />
  </el-dialog>
</template>

<script>
import RRWebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'
export default {
  name: 'PlayerDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    events: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    mouseTail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    show(newValue) {
      this.dialogVisible = newValue
    }
  },
  methods: {
    handleOpened() {
      new RRWebPlayer({
        target: this.$refs.playerDialogVideo,
        // 配置项
        props: {
          events: this.events,
          autoPlay: this.autoPlay,
          showController: true,
          mouseTail: this.mouseTail
        }
      })
    },
    handleClosed() {
      this.$emit('closed')
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
