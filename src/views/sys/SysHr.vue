<template>
    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="hr" :rules="rules" ref="hrForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="姓名：" prop="name">
                  <el-input  style="width:150px" placeholder="请输入姓名" v-model="hr.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系方式：" prop="phone">
                  <el-input  style="width:150px" placeholder="请输入联系方式" v-model="hr.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址：" prop="address">
                  <el-input  style="width:150px" placeholder="请输入地址" v-model="hr.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="用户名：" prop="username">
                  <el-input  style="width:150px" placeholder="请输入用户名" v-model="hr.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注：" prop="remark">
                  <el-input  style="width:150px" placeholder="请输入备注" v-model="hr.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddHr">确 定</el-button>
        </span>
      </el-dialog>
      <div style="margin-top: 10px;display: flex;justify-content: center">
        <el-input v-model="keywords" size="small" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search" style="width: 400px;margin-right: 10px" @keydown.enter.native="initHrs"></el-input>
        <el-button size="small" icon="el-icon-search" type="primary" @click="initHrs">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddHrView">添加员工</el-button>
      </div>
      <div class="hr-container">
        <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index">
          <div slot="header" class="clearfix">
            <span>{{hr.name}}</span>
            <el-button style="float: right; padding: 3px 0;color:#ff0e29" type="text" icon="el-icon-delete" @click="deleteHr(hr)"></el-button>
          </div>
          <div>
            <div class="hrinfo-container">
              <div>用户名：{{hr.name}}</div>
              <div>手机号码：{{hr.phone}}</div>
              <div>地址：{{hr.address}}</div>
              <div>用户状态：<el-switch
                v-model="hr.enabled"
                @change="enabledChange(hr)"
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
              </div>
              <div>用户角色：<el-tag type="success" style="margin-right: 4px" v-for="(role,index) in hr.roles" :key="index">{{role.nameZh}}</el-tag><el-popover
                placement="right"
                title="角色列表"
                width="200"
                @show="showPop(hr)"
                @hide="hidePop(hr)"
                trigger="click">
                <el-select v-model="selectedRoles" multiple  placeholder="请选择">
                  <el-option
                    v-for="(r,indexk) in allroles"
                    :key="indexk"
                    :label="r.nameZh"
                    :value="r.id">
                  </el-option>
                </el-select>
                <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
              </el-popover>
                </div>
              <div>备注：{{hr.remark}}</div>
                <el-button
                  @click="showHr(hr)"
                  type="primary">
                  编辑
                </el-button>
            </div>

          </div>

        </el-card>
      </div>
    </div>
</template>


<script>
  export default {
    name: 'SysHr',
    data(){
      return{
        title:'',
        keywords:'',
        hr: {
          name:"",
          phone:"",
          address:"",
          username:"",
          remark:"",
        },
        hrs:[{

        }],
        selectedRoles:[],
        allroles:[],
        visible:false,
        dialogVisible:false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        },
      }
    },
    mounted(){
      this.initHrs();
    },
    methods:{
      emptyHr(){
        this.hr={
          name:"",
          phone:"",
          address:"",
          username:"",
          remark:"",

        }
      },
      initHrs(){
        this.getRequest("/system/basic/hr/?keywords="+this.keywords).then(res=>{
          this.hrs = res;
        })
      },
      initRoles(){
        this.getRequest("/system/basic/hr/roles").then(res=>{
          if (res){
            this.allroles = res
          }
        })
      },
      showPop(hr){
        let roles=hr.roles;
        this.selectedRoles=[];
        roles.forEach(role=>{
          this.selectedRoles.push(role.id);
        })
        this.initRoles();
      },
      hidePop(hr){
        let url='/system/basic/hr/role?hrid='+hr.id;
        this.selectedRoles.forEach(sr=>{
          url+='&rids='+sr;
        })
        this.putRequest(url).then(res=>{
          if (res){
            this.initHrs();
          }
        })
      },
      doAddHr(){
        if (this.hr.id){
          this.$refs['hrForm'].validate(valid=>{
            if (valid){
              this.putRequest("/system/basic/hr/",this.hr).then(res=>{
                this.dialogVisible = false;
                this.initHrs();
              })
            }
          })
        }else {
          this.$refs['hrForm'].validate(valid=>{
            if (valid){
              this.postRequest("/system/basic/hr/",this.hr).then(res=>{
                this.dialogVisible = false;
                this.initHrs();
              })
            }
          })
        }
      },
      showAddHrView(){
        this.title="添加员工"
        if(this.$refs['hrForm']!=undefined){
          this.$refs['hrForm'].resetFields()
        }
        this.emptyHr();
        this.dialogVisible=true;
      },
      showHr(hr){
        console.log(hr)
        this.title='编辑员工信息';
        if(this.$refs['hrForm']!=undefined){
          this.$refs['hrForm'].resetFields()
        }
        this.hr=hr;
        this.dialogVisible=true;
      },
      enabledChange(hr){
        this.putRequest("/system/basic/hr/",hr).then(res=>{
          if (res){
            this.initHrs()
          }
        })
      },
      deleteHr(hr){
        this.$confirm('此操作将永久删除【'+hr.name+'】, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/system/basic/hr/"+hr.id).then(res=>{
            if (res){
              this.initHrs();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .hrinfo-container div{
    font-size: 12px;
    color: #3d75ff;
  }
  .hrinfo-container{
    margin-top: 20px;
  }
  .img-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .userface-img{
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }
  .hr-container{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .hr-card{
    width: 350px;
    margin-bottom: 20px;
  }
</style>
