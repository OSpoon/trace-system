<template>
  <div class="app-container">
    <el-button type="text" @click="startRecord">开始录制</el-button>
    <el-button type="text" @click="save">保存录制</el-button>
    <div class="query-box">
      <el-form ref="searchForm" :model="searchForm" label-width="90px" size="small">
        <el-row>
          <el-col :span="4">
            <el-form-item label="回溯编号" label-width="90px" prop="trace_id">
              <el-input v-model="searchForm.trace_id" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订单号" label-width="90px" prop="order_id">
              <el-input v-model="searchForm.order_id" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="渠道" label-width="90px" prop="channel">
              <el-input v-model="searchForm.channel" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="登录用户" label-width="90px" prop="login_user">
              <el-input v-model="searchForm.login_user" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="平台" label-width="90px" prop="platform">
              <el-input v-model="searchForm.platform" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="业务类型" label-width="90px" prop="module">
              <el-input v-model="searchForm.module" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="创建时间" label-width="90px" prop="creation_time">
              <el-input v-model="searchForm.creation_time" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="90px">
              <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh"
                @click="reset('searchForm')"
              >重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中。。。" border>
        <el-table-column label="序号" width="95" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="回溯编号" width="320" align="center">
          <template slot-scope="scope">{{ scope.row.trace_id }}</template>
        </el-table-column>
        <el-table-column label="订单号" width="240" align="center">
          <template slot-scope="scope">{{ scope.row.order_id }}</template>
        </el-table-column>
        <el-table-column label="渠道" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.channel }}</template>
        </el-table-column>
        <el-table-column label="登录用户" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.login_user }}</template>
        </el-table-column>
        <el-table-column label="平台" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.platform }}</template>
        </el-table-column>
        <el-table-column label="业务类型" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.module }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.creation_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 可追溯详情查看组件 -->
    <player-dialog :show="isPreview" :events="events" @closed="onClosed" />
  </div>
</template>

<script>
const rrweb = require('rrweb')
import PlayerDialog from '@/components/PlayerDialog/index.vue'
import { getTraceList } from '@/api/trace'
export default {
  components: {
    PlayerDialog
  },
  data() {
    return {
      // 查询相关
      searchForm: {
        trace_id: '',
        order_id: '',
        channel: '',
        login_user: '',
        platform: '',
        module: '',
        creation_time: ''
      },
      listLoading: false,
      list: null,
      // 操作相关
      events: [],
      isPreview: false
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    query() {
      this.getTableData(this.searchForm)
    },
    reset(form) {
      this.$refs[form].resetFields()
      this.getTableData()
    },
    handleClick(item) {
      this.events = item.events
      this.isPreview = true
    },
    getTableData(params) {
      this.listLoading = true
      getTraceList(params).then(response => {
        this.list = response.data.items
        this.listLoading = false
      }).catch((err) => {
        console.log('[ err ] >', err)
        this.listLoading = false
      })
    },
    onClosed() {
      this.events = []
      this.isPreview = false
    },
    startRecord() {
      const context = this
      rrweb.record({
        emit(event) {
          context.events.push(event)
        }
      })
    },
    save() {
      const body = JSON.stringify({ events: this.events })
      console.log('[ body ] >', body)
      this.events = []
      // fetch('http://YOUR_BACKEND_API', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body
      // })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

