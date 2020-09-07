<template>
  <div>
      <div class="permissManaTool">
        <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="doAddRole">添加角色</el-button>
      </div>
      <div class="permissManaMain">
          <el-collapse  v-model="activeName"  accordion @change="change">
            <el-collapse-item :title="role.nameZh" :name="role.id" v-for="(role,index) in roles" :key="index">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>可访问的资源</span>
                  <el-button style="float: right; padding: 3px 0;color: #ff0e29" icon="el-icon-delete" type="text" @click="deleteRole(role)"></el-button>
                </div>
                <div >
                  <el-tree
                    :data="menus"
                    :props="defaultProps"
                    ref="tree"
                    :key="index"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="selectedMenus">
                  </el-tree>
                  <div style="display: flex;justify-content: flex-end">
                    <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                    <el-button size="mini" type="primary" @click="doUpdate(role.id,index)">确认修改</el-button>
                  </div>
                </div>
              </el-card>
            </el-collapse-item>
          </el-collapse>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            role:{
                name:'',
                nameZh:'',
            },
          roles:[],
          menus:[],
          activeName:-1,
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          selectedMenus:[]
        }
    },
  mounted(){
      this.initRoles()
  },
  methods:{
      change(rid){
        if (rid){
          this.initMenus()
          this.initSelectedMenus(rid);
        }
      },
      initSelectedMenus(rid){
        this.getRequest("/system/basic/role/mids/"+rid).then(res=>{
          console.log(res)
          this.selectedMenus = res;
        })
      },
      initMenus(){
        this.getRequest("/system/basic/role/menu").then(res=>{
          if (res){
            this.menus=res
          }
        })
      },
      initRoles(){
        this.getRequest("/system/basic/role/").then(res=>{
          if (res){
            this.roles = res;
          }
        })
      },
      doAddRole(){
        if (this.role.name&&this.role.nameZh){
          this.postRequest("/system/basic/role/",this.role).then(res=>{
            if (res){
              this.role.name='';
              this.role.nameZh='';
              this.initRoles();
            }
          })
        }else {
          this.$message.error("数据不可以为空！")
        }
      },
      deleteRole(role){
        this.$confirm('此操作将永久删除【'+role.nameZh+'】角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/system/basic/role/"+role.id).then(res=>{
            if (res){
              this.initRoles();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      doUpdate(rid,index){
        console.log("index"+index)
        let tree = this.$refs.tree[index]
        let selectedKeys = tree.getCheckedKeys(true);
        let url='/system/basic/role/?rid='+rid;
        selectedKeys.forEach(key=>{
          url+='&mids='+key;
        })
        this.putRequest(url).then(res=>{
          if (res){
            this.activeName=-1;
          }
        })
      },
    cancelUpdate(){
      this.activeName=-1;
    },
  }
}
</script>

<style>
    .permissManaTool .el-input{
        width: 300px;
    }
    .permissManaMain{
        margin-top: 10px;
        width: 700px;
    }
</style>
