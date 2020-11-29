<template>
    <div>
      <div>
        <el-input placeholder="请输入客户名进行搜索，可直接回车搜索..." prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initNews"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initNews">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddNewView">添加报备</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :data="news"
          stripe
          border
          style="width: 100%">
          <el-table-column
            fixed
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            prop="workid"
            label="编号"
            width="120">
          </el-table-column>
          <el-table-column
            fixed
            prop="name1"
            label="客户姓名"
            width="90">
          </el-table-column>
          <el-table-column
            fixed
            prop="name2"
            label="项目名称"
            width="200">
          </el-table-column>
          <el-table-column
            fixed
            prop="dates"
            label="时间"
            width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="people1"
            label="带看人"
            width="90">
          </el-table-column>
          <el-table-column
            fixed
            prop="people2"
            label="对接人"
            width="90">
          </el-table-column>
          <el-table-column
            fixed
            prop="mianji"
            label="面积"
            width="80">
          </el-table-column>

          <el-table-column
            prop="remarks"
            fixed
            label="备注"
            width="180">
          </el-table-column>
          <el-table-column
            fixed
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="getPhone1(scope.row)"
                type="text"
                size="small">
                查看联系方式
              </el-button>
              <el-button
                @click.native.prevent="showNew(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteNew(scope.row,scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: flex-end">
          <el-pagination
            background
            @current-change="currentChange"
            @size-change="sizeChange"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
          </el-pagination>
        </div>
      </div>


      <el-dialog
        :title="title"
        :visible.sync="dialogPhoneVisible"
        width="30%">
        <span>{{this.getPhone}}</span>
      </el-dialog>

      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="newinfo" :rules="rules" ref="newForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户姓名：" prop="name1">
                  <el-input  style="width:150px" placeholder="请输入客户姓名" v-model="newinfo.name1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目名称：" prop="name2">
                  <el-input  style="width:150px" placeholder="请输入项目名称" v-model="newinfo.name2"></el-input>
                </el-form-item>
              </el-col>
              <!--
              <el-col :span="8">
                <el-form-item label="性别：" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>  -->
              <el-col :span="8">
                <el-form-item label="时间：" prop="dates">
                  <el-date-picker
                    v-model="newinfo.dates"
                    type="date"
                    style="width:200px"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="面积：" prop="mianji">
                  <el-input  style="width:150px" placeholder="请输入面积" v-model="newinfo.mianji"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="带看人：" prop="people1">
                  <el-input  style="width:200px" placeholder="请输入带看人" v-model="newinfo.people1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="对接人：" prop="people2">
                  <el-input  style="width:200px" placeholder="请输入对接人" v-model="newinfo.people2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="电话（长号）：" prop="phone">
                    <el-input  style="width:150px" placeholder="请输入电话" v-model="newinfo.phone"></el-input>
                  </el-form-item>
                </el-col>
              <el-col :span="8">
                <el-form-item label="工号：" prop="workid">
                  <el-input  style="width:150px" v-model="newinfo.workid" disabled></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="8">
                  <el-form-item label="备注：" prop="remarks">
                    <el-input  style="width:200px" v-model="newinfo.remarks"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddNew">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'NewInf',
    data(){
      return{
        getPhone:"",
        dialogPhoneVisible:false,
        user:JSON.parse(window.sessionStorage.getItem("user")),
        title:'',
        inputDepName:'',
        allDeps:[],
        visible:false,
        dialogVisible:false,
        news:[],
        keyword:'',
        total:0,
        page:1,
        size:10,
        joblevels:[],
        positions:[],
        newinfo:{
          name1:"",
          name2:"",
          dates:"",
          people1:"",
          people2:"",
          mianji:"",
          phone:"",
          workid:"",
          remarks:"",
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          name1:[{required:true,message:'请输入客户姓名',trigger:'blur'}],
          name2:[{required:true,message:'请输入项目名称',trigger:'blur'}],
          dates:[{required:true,message:'请输入时间',trigger:'blur'}],
          people2:[{required:true,message:'请输入对接人',trigger:'blur'}],
          people1:[{required:true,message:'请输入带看人',trigger:'blur'}],
          mianji:[{required:true,message:'请输入面积',trigger:'blur'}],
          phone:[{required:true,message:'请输入电话',trigger:'blur'}],



        }
      }
    },
    mounted(){
      this.initNews();
      this.initData();
    },
    methods:{
      emptyNew(){
        this.newinfo={
          name1:"",
          name2:"",
          dates:"",
          people1:"",
          people2:"",
          mianji:"",
          phone:"",
          workid:"",
          remarks:"",
        }
      },
      doAddNew(){
        if (this.newinfo.id){
          this.$refs['newForm'].validate(valid=>{
            if (valid){
              this.putRequest("/newinfo/basic/",this.newinfo).then(res=>{
                this.dialogVisible = false;
                this.initNews();
              })
            }
          })
        }else {
          this.$refs['newForm'].validate(valid=>{
            if (valid){
              this.postRequest("/newinfo/basic/",this.newinfo).then(res=>{
                this.dialogVisible = false;
                this.initNews();
              })
            }
          })
        }
      },
      getMaxWorkID(){
        this.getRequest("/newinfo/basic/maxWorkID").then(res=>{
          if (res){
            this.newinfo.workid = res.object;
          }
        })
      },
      currentChange(currentPage){
        this.page = currentPage;
        this.initNews();
      },
      sizeChange(currentSize){
        this.size = currentSize;
        this.initNews();
      },
      initNews(){
        this.getRequest("/newinfo/basic/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.news = res.data;
            this.total = res.total;
          }
        })
      },
      getPhone1(row){
        if(this.user.roles[0].id=="6"||this.user.roles[0].id=="3"||this.user.roles[0].id=="1"){
          this.getPhone = row.phone;
          this.dialogPhoneVisible = true;
        }else{
          this.$confirm("无权查看");
        }
      },
      showAddNewView(){
        this.title="添加报备"
        if(this.$refs['newForm']!=undefined){
          this.$refs['newForm'].resetFields()
        }
        this.emptyNew();
        this.getMaxWorkID();
        this.dialogVisible=true;
      },
      deleteNew(row){
        this.$confirm('此操作将永久删除【'+row.name+'】报备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/newinfo/basic/"+row.id).then(res=>{
            if (res){
              this.initNews();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showNew(row){
        this.title='编辑报备信息';
        this.newinfo=row;
        this.dialogVisible=true;
      }
    }
  }
</script>

<style scoped>

</style>
