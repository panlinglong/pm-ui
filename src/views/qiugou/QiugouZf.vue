<template>
    <div>
      <div>
        <el-input placeholder="请输入姓名进行搜索" prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initQiugouzfs"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initQiugouzfs">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddQiugouzfView">添加求租信息</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :cell-style="{background: '#fcfcfc',color: '#000'}"
          :data="Qiugouzfs"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="详细内容">
                  <span>{{ props.row.details }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            prop="workid">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="提交者"
            prop="upname">
          </el-table-column>
          <el-table-column
            label="概括"
            prop="summary">
          </el-table-column>
          <el-table-column
            width="200">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showQiugouzf(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteQiugouzf(scope.row,scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="Qiugouzf" :rules="rules" ref="QiugouzfForm">
            <el-row :gutter="1">
              <el-col :span="10">
                <el-form-item label="姓名：" prop="name">
                  <el-input  style="width:300px" placeholder="请输入姓名" v-model="Qiugouzf.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="1">
              <el-col :span="8">
                <el-form-item label="联系方式：" prop="phone">
                  <el-input  style="width:150px" placeholder="请输入联系方式" v-model="Qiugouzf.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="概括：" prop="summary">
                  <el-input  style="width:150px" placeholder="请简要概括" v-model="Qiugouzf.summary"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <span>详细信息</span>
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入具体需求" v-model="Qiugouzf.details"
              ></el-input>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddQiugouzf">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 200px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
  export default {
    name: 'QiugouzfBasic',
    data(){
      return{
        rowa:"",
        upnames:"",
        urls:[],
        user:JSON.parse(window.sessionStorage.getItem("user")),
        imgSrcs:[],
        uploadDisabled:false,
        dialogImageUrl: [],
        dialogImageVisible:false,
        dialogUploadVisible:false,
        title:'',
        inputDepName:'',
        allDeps:[],
        visible:false,
        dialogVisible:false,
        Qiugouzfs:[{
        }],
        imgpath:{
          workid:"",
          imagepath:"",
        },
        keyword:'',
        total:0,
        page:1,
        size:10,
        joblevels:[],
        positions:[],
        Qiugouzf:{
          name:"",
          phone:"",
          workid:"",
          upname:"",
          summary:"",
          details:"",
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          name:[{required:true,message:'请输入姓名',trigger:'blur'}],
          phone:[{required:true,message:'请输入联系方式',trigger:'blur'}],
          summary:[{required:true,message:'请输入需求概括',trigger:'blur'}],
        }

      }
    },


   mounted(){
      this.initQiugouzfs();
      // this.initData();
    },
    methods:{
      emptyQiugouzf(){
        this.Qiugouzf={
          name:"",
          phone:"",
          workid:"",
          upname:"",
          summary:"",
          details:"",
        }
      },
 doAddQiugouzf(){
        if (this.Qiugouzf.id){
          this.$refs['QiugouzfForm'].validate(valid=>{
            if (valid){
              this.putRequest("/qiugou/zufang/",this.Qiugouzf).then(res=>{
                this.dialogVisible = false;
                this.initQiugouzfs();
              })
            }
          })
        }else {
          this.$refs['QiugouzfForm'].validate(valid=>{
            if (valid){
              this.Qiugouzf.upname=this.user.name;
              this.postRequest("/qiugou/zufang/",this.Qiugouzf).then(res=>{
                this.dialogVisible = false;
                this.initQiugouzfs();
              })
            }
          })
        }
      },
  getMaxWorkID(){
        this.getRequest("/qiugou/zufang/maxWorkID").then(res=>{
          if (res){
            this.Qiugouzf.workid = res.object;
          }
        })
      },
      currentChange(currentPage){
        this.page = currentPage;
        this.initQiugouzfs();
      },
      sizeChange(currentSize){
        this.size = currentSize;
        this.initQiugouzfs();
      },
      initQiugouzfs(){
        this.getRequest("/qiugou/zufang/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.Qiugouzfs = res.data;
            this.total = res.total;
          }
        })
      },
      showAddQiugouzfView(){
        this.title="添加房源"
        if(this.$refs['QiugouzfForm']!=undefined){
          this.$refs['QiugouzfForm'].resetFields()
        }
        this.emptyQiugouzf();
        this.getMaxWorkID();
        this.dialogVisible=true;
      },
      deleteQiugouzf(row){
        console.log(this.user.name);
        console.log(row.upname);
        if (row.upname != this.user.name && this.user.name != "管理员" && this.user.name != "系统管理员") {
          this.$confirm("非上传者无法删除");
        } else {

          this.$confirm('此操作将永久删除【' + row.name + '】求租信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/qiugou/zufang/" + row.id).then(res => {
              if (res) {
                this.initQiugouzfs();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      showQiugouzf(row) {
        console.log(row.upname);
        console.log(this.user.name);
        if (row.upname == this.user.name || this.user.name == "管理员" || this.user.name == "系统管理员") {
          this.title = '编辑房源信息';
          this.Qiugouzf = row;
          this.dialogVisible = true;
        } else {
          this.$confirm("非上传者无法编辑");
        }
      }
    }
  }
</script>

<style scoped>

</style>
