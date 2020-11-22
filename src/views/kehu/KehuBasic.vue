<template>
    <div>
      <div>
        <el-input placeholder="请输入客户名进行搜索，可直接回车搜索..." prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initKehus"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initKehus">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddKehuView">添加客户</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :data="kehus"
          :cell-style="{background: '#fcfcfc',color: '#000'}"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="客户姓名：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="客户分类：">
                  <span>{{ props.row.types }}</span>
                </el-form-item>
                <el-form-item label="性别：">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="联系方式：">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
                <el-form-item label="性质：">
                  <span>{{ props.row.xingz }}</span>
                </el-form-item>
                <el-form-item label="需求：">
                  <span>{{ props.row.demand }}</span>
                </el-form-item>
                <el-table
                  :data="props.row.kehuAs"
                  style="width: 100%">
                  <el-table-column
                    prop="kfdate"
                    label="看房日期"
                    width="180">
                  </el-table-column>
                  <el-table-column
                      prop="kfjl"
                    label="内容"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    width="100">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="deleteKehua(scope.row,scope.$index)"
                        type="text">
                        删除
                      </el-button>

                    </template>
                  </el-table-column>
                </el-table>



                <el-form-item label="客户跟进：">
                  <span>{{ props.row.followup }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            prop="kehuid">
          </el-table-column>
          <el-table-column
            label="客户姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="客户分类"
            prop="types">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender">
          </el-table-column>
          <el-table-column
            label="联系方式："
            prop="phone">
          </el-table-column>
          <el-table-column
            label="性质："
            prop="xingz">
          </el-table-column>
          <el-table-column
            label="需求："
            prop="demand">
          </el-table-column>
          <el-table-column
            width="250">
            <template slot-scope="scope">
                <el-button type="text" @click="addKehua(scope.row,scope.$index)"  >新增看房记录</el-button>

              <el-button
                @click.native.prevent="showKehu(scope.row,scope.$index)"
                type="text">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteKehu(scope.row,scope.$index)"
                type="text">
                删除
              </el-button>

            </template>
          </el-table-column>

        </el-table>


      </div>
      <el-dialog title="新增看房记录" :visible.sync="dialogFormVisible">
        <el-form :model="kehu_a" ref="kehuaForm">
          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="看房日期：" prop="kfdate">
                <el-date-picker
                  v-model="kehu_a.kfdate"
                  style="width: 200px"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="内容：" prop="kfjl">
                <el-input  style="width:200px"  v-model="kehu_a.kfjl"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddKehua">确 定</el-button>
        </div>
      </el-dialog>



      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="kehu" :rules="rules" ref="kehuForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户姓名：" prop="name">
                  <el-input  style="width:150px" placeholder="请输入客户姓名" v-model="kehu.name"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="7">
                <el-form-item label="联系方式：" prop="phone">
                  <el-input  style="width:150px" placeholder="请输入联系方式" v-model="kehu.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：" prop="gender">
                  <el-radio-group v-model="kehu.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户分类：" prop="types">
                  <el-input  style="width:150px" placeholder="请输入客户分类" v-model="kehu.types"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户性质：" prop="xingz">
                  <el-radio-group v-model="kehu.xingz">
                    <el-radio label="上门">上门</el-radio>
                    <el-radio label="介绍">介绍</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

<!--
              <el-col :span="8">
                <el-form-item label="负责人：" prop="people">
                  <el-input  style="width:150px" placeholder="请输入接待人" v-model="emp.people"></el-input>
                </el-form-item>
              </el-col>
-->
            </el-row>
            <el-row :gutter="20">

              <el-col :span="8">
                <el-form-item label="编号：" prop="kehuid">
                  <el-input  style="width:150px" v-model="kehu.kehuid" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工编号：" prop="hrid">
                  <el-input  style="width:150px" v-model="kehu.hrid" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="8">
                <el-form-item label="需求：" prop="demand">
                  <el-input  style="width:400px" v-model="kehu.demand" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容" v-model="kehu.followup"
                ></el-input>
            </el-row>





         <!--   <el-row :gutter="20">
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
            </el-row>-->
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddKehu">确 定</el-button>
        </span>
      </el-dialog>
    </div>


</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
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
  name: 'KehuBasic',
  data(){
    return{
      title:'',
      inputDepName:'',
      allDeps:[],
      visible:false,
      dialogVisible:false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      kehus:[{
      }],
      keyword:'',
      total:0,
      page:1,
      size:10,
      joblevels:[],
      positions:[],
      kehu:{
        name:"",
        gender:"",
        demand:"",
        followup:"",
        kehuid:"",
        phone: '',
        kfdate: '',
        kfjl: '',
        xingz: '',
        hrid:"",
        types:"",
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      kehu_a: {
        kehuid:"",
        kfdate: '',
        kfjl: '',
      },
      rules:{
        name:[{required:true,message:'请输入客户姓名',trigger:'blur'}],
        gender:[{required:true,message:'请输入性别',trigger:'blur'}],
        demand:[{required:true,message:'请输入需求',trigger:'blur'}],
        phone:[{required:true,message:'请输入联系方式',trigger:'blur'}],
        xingz:[{required:true,message:'公司/中介房源',trigger:'blur'}],
      }

    }
  },


   mounted(){
      this.initKehus();
      this.initData();
    },
    methods:{
      emptyKehu(){
        this.kehu={
          name:"",
          gender:"",
          demand:"",
          followup:"",
          kehuid:"",
          phone:"",
          remark:"",
          kfdate: "",
          kfjl:"",
          xingz:"",
          hrid:"",
          types:"",
        }
      },

 doAddKehu(){
        if (this.kehu.id){
          this.$refs['kehuForm'].validate(valid=>{
            if (valid){
              this.putRequest("/kehu/basic/",this.kehu).then(res=>{
                this.dialogVisible = false;
                this.initKehus();
              })
            }
          })
        }else {
          this.$refs['kehuForm'].validate(valid=>{
            if (valid){
              this.postRequest("/kehu/basic/",this.kehu).then(res=>{
                this.dialogVisible = false;
                this.initKehus();
              })
            }
          })
        }
      },
      addKehua(row,index) {
        this.kehu_a.kehuid = row.kehuid
        this.dialogFormVisible = true
      },
      doAddKehua(){
        if (this.kehu_a.id){
          this.$refs['kehuaForm'].validate(valid=>{
            if (valid){
              this.putRequest("/kehu/basic/kehua",this.kehu_a).then(res=>{
                this.dialogFormVisible = false;
                this.initKehus();
              })
            }
          })
        }else {
          this.$refs['kehuaForm'].validate(valid=>{
            if (valid){
              this.postRequest("/kehu/basic/kehua",this.kehu_a).then(res=>{
                this.dialogFormVisible = false;
                this.initKehus();
              })
            }
          })
        }
      },
  getMaxWorkID(){
        this.getRequest("/kehu/basic/maxWorkID").then(res=>{
          if (res){
            this.kehu.kehuid = res.object;
          }
        })
      },
      getMyHrID(){
        this.getRequest("/kehu/basic/myHrID").then(res=>{
          if (res){
            this.kehu.hrid = res.object;
          }
        })
      },
      currentChange(currentPage){
        this.page = currentPage;
        this.initKehus();
      },
      sizeChange(currentSize){
        this.size = currentSize;
        this.initKehus();
      },
      initKehus(){
        this.getRequest("/kehu/basic/mykehu/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.kehus = res.data;
            this.total = res.total;
          }
        })
      },
      showAddKehuView(){
        this.title="添加客户"
        if(this.$refs['kehuForm']!=undefined){
          this.$refs['kehuForm'].resetFields()
        }
        this.emptyKehu();
        this.getMaxWorkID();
        this.getMyHrID();
        this.dialogVisible=true;
      },
      deleteKehu(row){
        this.$confirm('此操作将永久删除【'+row.name+'】客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/kehu/basic/"+row.id).then(res=>{
            if (res){
              this.initKehus();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteKehua(row){
        this.$confirm('此操作将永久删除【'+row.kfdate+'】记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/kehu/basic/kehua/"+row.id).then(res=>{
            if (res){
              this.initKehus();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showKehu(row){
        this.title='编辑客户信息';
        if(this.$refs['kehuForm']!=undefined){
          this.$refs['kehuForm'].resetFields()
        }
        this.kehu=row;
        this.dialogVisible=true;
      }
    }
  }
</script>

<style scoped>

</style>
