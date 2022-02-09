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
            <el-form-item label="账号" label-width="90px" prop="username">
              <el-input v-model="searchForm.username" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="姓名" label-width="90px" prop="nickname">
              <el-input v-model="searchForm.nickname" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="邮箱" label-width="90px" prop="email">
              <el-input v-model="searchForm.email" />
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
      <div class="action-bar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addUserFormVisible = true"
        >新增用户</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="handleDeleteUser"
        >删除用户</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="数据加载中。。。"
        border
        style="width: 100%; margin-top: 10px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="序号"
          width="55"
          align="center"
          fixed
          type="selection"
          :selectable="checkSelectable"
        />
        <el-table-column label="账号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="150" align="center" sortable>
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="邮箱" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">{{
            scope.row.status ? "禁用" : "启用"
          }}</template>
        </el-table-column>
        <el-table-column label="备注" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.introduction }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="210" align="center" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="210" align="center" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.updatedAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              :disabled="scope.row.username === 'admin'"
              @click="handleEnableUser(scope.row)"
            >启用</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="scope.row.username === 'admin'"
              @click="handleDisableUser(scope.row)"
            >禁用</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleModifyClick(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增用户 -->
    <el-dialog
      title="新增用户"
      :visible.sync="addUserFormVisible"
      width="480px"
      @close="onCancelAddUser('addUserForm')"
    >
      <el-form
        ref="addUserForm"
        :model="addUserForm"
        :rules="addUserRules"
        size="small"
        class="add-user-form-class"
      >
        <el-form-item label="用户姓名" label-width="90px" prop="nickname">
          <el-input
            v-model="addUserForm.nickname"
            placeholder="请输入您的真是姓名"
          />
        </el-form-item>
        <el-form-item label="用户邮箱" label-width="90px" prop="email">
          <el-input
            v-model="addUserForm.email"
            placeholder="请输入您的常用邮箱"
          />
        </el-form-item>
        <el-form-item label="登录工号" label-width="90px" prop="username">
          <el-input
            v-model="addUserForm.username"
            autocomplete="off"
            placeholder="请输入您的登录工号"
          />
        </el-form-item>
        <el-form-item label="登录密码" label-width="90px" prop="password">
          <el-input
            v-model="addUserForm.password"
            autocomplete="new-password"
            type="password"
            placeholder="请输入您的密码，避免使用常见组合"
          />
        </el-form-item>
        <el-form-item label="确认密码" label-width="90px" prop="affirmPassword">
          <el-input
            v-model="addUserForm.affirmPassword"
            type="password"
            placeholder="请再次确认您的密码"
          />
        </el-form-item>
        <el-form-item label="备注信息" label-width="90px" prop="introduction">
          <el-input
            v-model="addUserForm.introduction"
            type="textarea"
            :rows="3"
            placeholder="如您有备注信息可在此填写"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="addUserLoading"
          @click="confirmAddUser('addUserForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      :visible.sync="modifyUserFormVisible"
      width="480px"
      @close="onCancelAddUser('modifyUserForm')"
    >
      <el-form
        ref="modifyUserForm"
        :model="modifyUserForm"
        :rules="modifyUserRules"
        size="small"
        class="add-user-form-class"
      >
        <el-form-item label="用户姓名" label-width="90px" prop="nickname">
          <el-input
            v-model="modifyUserForm.nickname"
            placeholder="请输入您的真是姓名"
          />
        </el-form-item>
        <el-form-item label="用户邮箱" label-width="90px" prop="email">
          <el-input
            v-model="modifyUserForm.email"
            placeholder="请输入您的常用邮箱"
          />
        </el-form-item>
        <el-form-item label="备注信息" label-width="90px" prop="introduction">
          <el-input
            v-model="modifyUserForm.introduction"
            type="textarea"
            :rows="3"
            placeholder="如您有备注信息可在此填写"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyUserFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="modifyUserLoading"
          @click="confirmModifcyUser('modifyUserForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addUser,
  getUsers,
  delUser,
  enableUser,
  disableUser,
  modifyUser
} from '@/api/user'
export default {
  data() {
    return {
      // 查询相关
      searchForm: {
        username: '',
        nickname: '',
        email: ''
      },
      listLoading: false,
      list: null,
      // 操作相关
      events: [],
      multipleSelection: [],

      addUserFormVisible: false,
      addUserLoading: false,
      addUserForm: {
        username: '',
        email: '',
        nickname: '',
        password: '',
        affirmPassword: '',
        introduction: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入您的登录工号', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        nickname: [
          { required: true, message: '请输入您的真是姓名', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入您的常用邮箱', trigger: 'blur' },
          {
            min: 5,
            max: 25,
            message: '长度在 5 到 25 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入您的密码，避免使用常见组合',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        affirmPassword: [
          { required: true, message: '请再次确认您的密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.addUserForm.password) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },

      modifyUserFormVisible: false,
      modifyUserLoading: false,
      modifyUserForm: {
        id: '',
        username: '',
        email: '',
        nickname: '',
        password: '',
        affirmPassword: '',
        introduction: ''
      },
      modifyUserRules: {
        nickname: [
          { required: true, message: '请输入您的真是姓名', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入您的常用邮箱', trigger: 'blur' },
          {
            min: 5,
            max: 25,
            message: '长度在 5 到 25 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    checkSelectable(row, index) {
      return row.username !== 'admin'
    },
    query() {
      this.getTableData(this.searchForm)
    },
    reset(form) {
      form && this.$refs[form].resetFields()
      this.getTableData()
    },
    getTableData(params) {
      this.listLoading = true
      getUsers(params)
        .then((response) => {
          this.list = response.data.items
          this.listLoading = false
        })
        .catch((err) => {
          console.log('[ err ] >', err)
          this.listLoading = false
        })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDeleteUser() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请勾选要操作的用户',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: '目前尚不支持多选操作',
          type: 'warning'
        })
        return
      }
      const { id } = this.multipleSelection[0]
      this.$confirm('删除后此用户将无法登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser(id)
            .then((response) => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.getTableData()
            })
            .catch((err) => {
              console.log('[ err ] >', err)
              this.addUserLoading = false
            })
        })
        .catch(() => {})
    },
    handleEnableUser(data) {
      const { id } = data
      enableUser(id)
        .then((response) => {
          this.$message({
            message: response.data,
            type: 'success'
          })
          this.getTableData()
        })
        .catch((err) => {
          console.log('[ err ] >', err)
          this.addUserLoading = false
        })
    },
    handleDisableUser(data) {
      const { id } = data
      disableUser(id)
        .then((response) => {
          this.$message({
            message: response.data,
            type: 'success'
          })
          this.getTableData()
        })
        .catch((err) => {
          console.log('[ err ] >', err)
          this.addUserLoading = false
        })
    },
    handleModifyClick(data) {
      console.log('[ data ] >', data)
      this.modifyUserFormVisible = true
      this.modifyUserForm = {
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        introduction: data.introduction
      }
    },
    /**
     * 确认新增用户，通过校验后发送请求
     */
    confirmAddUser(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const request = { ...this.$refs[form].model }
          Reflect.deleteProperty(request, 'affirmPassword')
          this.requestAddUserService(request)
        } else {
          return false
        }
      })
    },

    requestAddUserService(data) {
      this.addUserLoading = true
      addUser(data)
        .then((response) => {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.addUserLoading = false
          this.addUserFormVisible = false
          this.getTableData()
        })
        .catch((err) => {
          console.log('[ err ] >', err)
          this.addUserLoading = false
        })
    },
    confirmModifcyUser(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const request = { ...this.$refs[form].model }
          this.requestModifyUserService(request)
        } else {
          return false
        }
      })
    },
    requestModifyUserService(data) {
      this.modifyUserLoading = true
      modifyUser(data)
        .then((response) => {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.modifyUserLoading = false
          this.modifyUserFormVisible = false
          this.getTableData()
        })
        .catch((err) => {
          console.log('[ err ] >', err)
          this.modifyUserLoading = false
        })
    },
    /**
     * 监听取消新增用户
     */
    onCancelAddUser(form) {
      form && this.$refs[form].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.add-user-form-class {
  margin: 0 30px 0 10px;
}
</style>
