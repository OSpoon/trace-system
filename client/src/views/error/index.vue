<template>
  <div id="app" class="container">
    <div class="content">
      <div class="h5_content">
        <div class="error_label">
          <img src="@/assets/images/404.png">
        </div>
        <div class="error_info">
          <div class="error_title">Page Not Found</div>
          <div class="error_text">
            <p>The page you are looking for doesn’t seem to exist…</p>
          </div>
        </div>
        <div class="op_btn"><a @click="$router.replace('/')">GO HOME</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
#app.container {
  background-color: #f4f6fb;
  width: 100vw;
  height: 100vh;
}
#app .content {
  width: 100vw;
}
#app .h5_header {
  height: 22px;
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
#app .h5_content .error_label {
  position: absolute;
  transform: translate(17.6vw, 0);
  width: 82.4vw;
  top: 15.892vh;
  height: auto;
}
#app .h5_content .error_label img {
  border-width: 0;
  outline: none;
  width: 100%;
  height: auto;
}
#app .h5_content .error_info {
  position: absolute;
  top: 60.8vh;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  width: 6.933rem;
}
#app .h5_content .error_title {
  color: #302C48;
  font-size: .533rem;
}
#app .h5_content .error_text {
  color: #302C48;
  font-size: .4rem;
  padding: 0px 20px;
  font-weight: lighter;
  line-height: 0.666rem;
}
#app .h5_content .op_btn {
  position: absolute;
  top: 79.4vh;
  left: 50vw;
}
#app .h5_content .op_btn a {
  display: inline-block;
  width: 3.013rem;
  height: 1.27rem;
  font-size: .4rem;
  background-color: #6b92f2;
  border-radius: 1.5065rem;
  line-height: 1.27rem;
  text-align: center;
  color: #ffffff;
  font-weight: lighter;
  transform: translate(-50%, 0);
  box-shadow: 0 13px 25px 0 rgba(86, 123, 194, 0.17);
}
</style>
