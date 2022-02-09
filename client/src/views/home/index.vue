<template>
  <div class="home-container">
    <van-nav-bar title="订单填写" />
    <div class="title">填写订单信息</div>
    <div class="container">
      <van-field v-model="text" label="收件人姓名" />
      <van-field v-model="tel" type="tel" label="收件人电话" />
      <van-field v-model="zipCode" type="number" label="邮政编码" />
      <van-field v-model="zipAddress" label="邮寄地址" />
      <van-field v-model="bankNum" type="number" label="银行卡号" />
      <van-field v-model="payPassword" type="password" label="支付密码" />
    </div>
    <van-card
      num="1"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      origin-price="10.00"
      style="background: #fff; margin-bottom: 10px"
    />
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <van-submit-bar
      :price="3050"
      button-text="提交订单"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
import { Dialog } from 'vant'
const rrweb = require('rrweb')
import { tracePost } from '@/api/trace'
const { v4: uuidv4 } = require('uuid')

export default {
  name: 'Home',
  props: {},
  data() {
    return {
      tel: '',
      text: '',
      zipCode: '',
      zipAddress: '',
      bankNum: '',
      payPassword: '',
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      loading: false,
      events: []
    }
  },
  created() {},
  mounted() {
    this.start()
  },
  methods: {
    start() {
      Dialog.alert({
        title: '温馨提示',
        message:
          '接监管要求，为保证您的交易可追溯，当前订单操作将在确认后开始记录！！！'
      }).then(() => {
        const context = this
        rrweb.record({
          emit(event) {
            context.events.push(event)
          }
        })
      })
    },
    onSubmit() {
      this.loading = true
      tracePost({
        order_id: uuidv4(),
        channel: 'Android',
        login_user: '测试用户007',
        platform: '商城平台',
        module: '订单系统',
        content: '大额交易需要进行操作追溯',
        events: this.events,
        username: 'admin'
      }).then((res) => {
        this.loading = false
        console.log('[ res ] >', res)
        const { code, data } = res
        if (code === 20000 && data) {
          const { trace_id } = data
          Dialog.alert({
            title: '温馨提示',
            message: `当前订单的可追溯编码为：${trace_id}`
          }).then(() => {
            this.events = []
          })
        }
      })
    },
    onClickEditAddress() {},
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange(code) {
      this.coupons.push(coupon)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .title {
    padding: 10px;
    color: #b5b3b3;
  }
}
</style>
