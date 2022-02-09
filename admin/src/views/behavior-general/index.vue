<template>
  <div class="app-container">
    <div class="query-box">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="90px"
        size="small"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="回溯编号" label-width="90px" prop="trace_id">
              <el-input v-model="searchForm.trace_id" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="系统名称" label-width="90px" prop="order_id">
              <el-input v-model="searchForm.order_id" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="模块名称" label-width="90px" prop="channel">
              <el-input v-model="searchForm.channel" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="创建时间" label-width="90px" prop="login_user">
              <el-input v-model="searchForm.login_user" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="更新时间" label-width="90px" prop="platform">
              <el-input v-model="searchForm.platform" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label-width="90px">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="small"
                @click="query"
              >查询</el-button>
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
      <el-alert title="已关联系统相关名称的数据在普通行为分析列表展示！" show-icon type="info" :closable="false" />
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="数据加载中。。。"
        border
        style="width: 100%;margin-top: 10px;"
        height="650"
      >
        <el-table-column label="序号" width="65" align="center" fixed>
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="回溯编号" width="300" align="center" fixed>
          <template slot-scope="scope">{{ scope.row.uid }}</template>
        </el-table-column>
        <el-table-column label="系统名称" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.system_name }}</template>
        </el-table-column>
        <el-table-column label="模块名称" width="240" align="center">
          <template slot-scope="scope">{{ scope.row.module_name }}</template>
        </el-table-column>
        <el-table-column label="备注信息" width="350" align="center">
          <template slot-scope="scope">{{ scope.row.remark_info }}</template>
        </el-table-column>
        <el-table-column label="平台信息" width="300" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.platform_info }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="210" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.created_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="210" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleClick(scope.row)"
            >查看</el-button>
            <el-button
              type="success"
              size="small"
              @click="handleClick(scope.row)"
            >归档</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 可追溯详情查看组件 -->
    <!-- <player-dialog :show="isPreview" :events="events" @closed="onClosed" /> -->
  </div>
</template>
<script>
import { getGeneralList } from '@/api/track'
export default {
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
    getTableData(params) {
      this.listLoading = true
      getGeneralList(params)
        .then((response) => {
          this.list = response.data.items
          this.listLoading = false
        })
        .catch((err) => {
          console.log('[ err ] >', err)
          this.listLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
