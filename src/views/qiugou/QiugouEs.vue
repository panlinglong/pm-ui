<template>
    <div>
      <div>
        <el-input placeholder="请输入姓名进行搜索" prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initQiugouess"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initQiugouess">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddQiugouesView">添加求购信息</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :cell-style="{background: '#fcfcfc',color: '#000'}"
          :data="Qiugouess"
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
                @click.native.prevent="showQiugoues(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteQiugoues(scope.row,scope.$index)"
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
          <el-form :model="Qiugoues" :rules="rules" ref="QiugouesForm">
            <el-row :gutter="1">
              <el-col :span="10">
                <el-form-item label="姓名：" prop="name">
                  <el-input  style="width:300px" placeholder="请输入姓名" v-model="Qiugoues.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="1">
              <el-col :span="8">
                <el-form-item label="联系方式：" prop="phone">
                  <el-input  style="width:150px" placeholder="请输入联系方式" v-model="Qiugoues.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="概括：" prop="summary">
                  <el-input  style="width:150px" placeholder="请简要概括" v-model="Qiugoues.summary"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <span>详细信息</span>
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入具体需求" v-model="Qiugoues.details"
              ></el-input>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddQiugoues">确 定</el-button>
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
    name: 'QiugouesBasic',
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
        Qiugouess:[{
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
        Qiugoues:{
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
      this.initQiugouess();
      // this.initData();
    },
    methods:{
      emptyQiugoues(){
        this.Qiugoues={
          name:"",
          phone:"",
          workid:"",
          upname:"",
          summary:"",
          details:"",
        }
      },
 doAddQiugoues(){
        if (this.Qiugoues.id){
          this.$refs['QiugouesForm'].validate(valid=>{
            if (valid){
              this.putRequest("/qiugou/ershou/",this.Qiugoues).then(res=>{
                this.dialogVisible = false;
                this.initQiugouess();
              })
            }
          })
        }else {
          this.$refs['QiugouesForm'].validate(valid=>{
            if (valid){
              this.Qiugoues.upname=this.user.name;
              this.postRequest("/qiugou/ershou/",this.Qiugoues).then(res=>{
                this.dialogVisible = false;
                this.initQiugouess();
              })
            }
          })
        }
      },
  getMaxWorkID(){
        this.getRequest("/qiugou/ershou/maxWorkID").then(res=>{
          if (res){
            this.Qiugoues.workid = res.object;
          }
        })
      },
      currentChange(currentPage){
        this.page = currentPage;
        this.initQiugouess();
      },
      sizeChange(currentSize){
        this.size = currentSize;
        this.initQiugouess();
      },
      initQiugouess(){
        this.getRequest("/qiugou/ershou/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.Qiugouess = res.data;
            this.total = res.total;
          }
        })
      },
      showAddQiugouesView(){
        this.title="添加房源"
        if(this.$refs['QiugouesForm']!=undefined){
          this.$refs['QiugouesForm'].resetFields()
        }
        this.emptyQiugoues();
        this.getMaxWorkID();
        this.dialogVisible=true;
      },
      deleteQiugoues(row){
        console.log(this.user.name);
        console.log(row.upname);
        if (row.upname != this.user.name && this.user.name != "管理员" && this.user.name != "系统管理员") {
          this.$confirm("非上传者无法删除");
        } else {

          this.$confirm('此操作将永久删除【' + row.name + '】求购信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/qiugou/ershou/" + row.id).then(res => {
              if (res) {
                this.initQiugouess();
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
      showQiugoues(row) {
        console.log(row.upname);
        console.log(this.user.name);
        if (row.upname == this.user.name || this.user.name == "管理员" || this.user.name == "系统管理员") {
          this.title = '编辑房源信息';
          this.Qiugoues = row;
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
