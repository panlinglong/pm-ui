<template>
    <div>
      <div>
        <el-input placeholder="请输入房源名进行搜索，可直接回车搜索..." prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initEmps"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initEmps">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddEmpView">添加房源</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :data="emps"
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
            prop="name"
            label="姓名"
            width="90">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="60">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号"
            width="170">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="200">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话号码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="department.name"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="joblevel.name"
            label="职称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="position.name"
            label="职位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="begindate"
            label="入职日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="workid"
            label="工号"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showEmp(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteEmp(scope.row,scope.$index)"
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
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="emp" :rules="rules" ref="empForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="姓名：" prop="name">
                  <el-input  style="width:150px" placeholder="请输入员工姓名" v-model="emp.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期：" prop="birthday">
                  <el-date-picker
                    v-model="emp.birthday"
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
                <el-form-item label="身份证号码：" prop="idcard">
                  <el-input  style="width:200px" placeholder="请输入员工身份证号码" v-model="emp.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱：" prop="email">
                  <el-input  style="width:150px" placeholder="电子邮箱" v-model="emp.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码：" prop="phone">
                  <el-input  style="width:150px" placeholder="手机号码" v-model="emp.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="所属部门：" prop="departmentid">
                  <el-popover
                    placement="right"
                    title="请选择部门"
                    width="200"
                    trigger="manual"
                    v-model="visible">
                    <el-tree default-expand-all :data="allDeps" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    <div slot="reference" style="width: 200px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 35px;border-radius: 5px;
                  cursor: pointer;align-items: center;padding-left: 8px" @click="showDepView">{{inputDepName}}</div>
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职称：" prop="joblevelid">
                  <el-select v-model="emp.joblevelid" placeholder="请选择">
                    <el-option
                      v-for="item in joblevels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职位：" prop="posid">
                  <el-select v-model="emp.posid" placeholder="请选择">
                    <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="入职日期：" prop="begindate">
                  <el-date-picker
                    v-model="emp.begindate"
                    style="width: 200px"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工号：" prop="workid">
                  <el-input  style="width:150px" v-model="emp.workid" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddEmp">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'EmpBasic',
    data(){
      return{
        title:'',
        inputDepName:'',
        allDeps:[],
        visible:false,
        dialogVisible:false,
        emps:[],
        keyword:'',
        total:0,
        page:1,
        size:10,
        joblevels:[],
        positions:[],
        emp:{
          name:"",
          gender:"",
          birthday:"",
          idcard:"",
          email:"",
          phone:"",
          departmentid:null,
          joblevelid:null,
          posid:null,
          begindate:"",
          workid:""
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          name:[{required:true,message:'请输入用户名',trigger:'blur'}],
          gender:[{required:true,message:'请输入性别',trigger:'blur'}],
          birthday:[{required:true,message:'请输入出生日期',trigger:'blur'}],
          idcard:[{required:true,message:'请输入身份证号',trigger:'blur'}],
          email:[{required:true,message:'请输入邮箱',trigger:'blur'},{type:'email',message: '邮箱格式不正确',trigger: 'blur'}],
          phone:[{required:true,message:'请输入手机号',trigger:'blur'}],
          departmentid:[{required:true,message:'请输入所属部门',trigger:'blur'}],
          joblevelid:[{required:true,message:'请输入职称',trigger:'blur'}],
          posid:[{required:true,message:'请输入职位',trigger:'blur'}],
          begindate:[{required:true,message:'请输入入职日期',trigger:'blur'}],
        }
      }
    },
    mounted(){
      this.initEmps();
      this.initData();
    },
    methods:{
      emptyEmp(){
        this.emp={
          name:"",
          gender:"",
          birthday:"",
          idcard:"",
          email:"",
          phone:"",
          departmentid:null,
          joblevelid:null,
          posid:null,
          begindate:"",
          workid:""
        }
        this.inputDepName='';
      },
      doAddEmp(){
        if (this.emp.id){
          this.$refs['empForm'].validate(valid=>{
            if (valid){
              this.putRequest("/employee/basic/",this.emp).then(res=>{
                this.dialogVisible = false;
                this.initEmps();
              })
            }
          })
        }else {
          this.$refs['empForm'].validate(valid=>{
            if (valid){
              this.postRequest("/employee/basic/",this.emp).then(res=>{
                this.dialogVisible = false;
                this.initEmps();
              })
            }
          })
        }
      },
      handleNodeClick(data){
        this.inputDepName = data.name;
        this.emp.departmentid = data.id;
        this.visible = !this.visible
      },
      showDepView(){
        this.visible = !this.visible
      },
      getMaxWorkID(){
        this.getRequest("/employee/basic/maxWorkID").then(res=>{
          if (res){
            this.emp.workid = res.object;
          }
        })
      },
      initPosition(){
        this.getRequest("/employee/basic/positions").then(res=>{
          this.positions = res;
        })
      },
      initData(){
        if (!window.sessionStorage.getItem("joblevels")) {
          this.getRequest("/employee/basic/joblevels").then(res => {
            this.joblevels = res;
            window.sessionStorage.setItem("joblevels",JSON.stringify(res))
          })
        }else{
          this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"))
        }
        if (!window.sessionStorage.getItem("deps")){
          this.getRequest("/employee/basic/deps").then(res=>{
            this.allDeps = res;
            window.sessionStorage.setItem("deps",JSON.stringify(res))
          })
        }else{
          this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"))
        }
      },
      currentChange(currentPage){
        this.page = currentPage;
        this.initEmps();
      },
      sizeChange(currentSize){
        this.size = currentSize;
        this.initEmps();
      },
      initEmps(){
        this.getRequest("/employee/basic/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.emps = res.data;
            this.total = res.total;
          }
        })
      },
      showAddEmpView(){
        this.title="添加员工"
        this.emptyEmp();
        this.getMaxWorkID();
        this.initPosition();
        this.dialogVisible=true;
      },
      deleteEmp(row){
        this.$confirm('此操作将永久删除【'+row.name+'】员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/employee/basic/"+row.id).then(res=>{
            if (res){
              this.initEmps();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showEmp(row){
        this.title='编辑员工信息';
        this.initPosition();
        this.emp=row;
        this.inputDepName=row.department.name;
        this.dialogVisible=true;
      }
    }
  }
</script>

<style scoped>

</style>
