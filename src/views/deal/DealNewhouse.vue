<template>
    <div>
      <div>
        <el-input placeholder="请输入房屋坐落位置进行搜索" prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initNewhousedeals"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initNewhousdeals">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddNewhousedealView">添加成交记录</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :cell-style="{background: '#fcfcfc',color: '#000'}"
          :data="newhousedeals"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="房屋坐落位置：">
                  <span>{{ props.row.place }}</span>
                </el-form-item>
                <el-form-item label="成交时间：">
                <span>{{ props.row.beginDate }}</span>
              </el-form-item>
                <el-form-item label="甲方：">
                  <span>{{ props.row.jiafang }}</span>
                </el-form-item>
                <el-form-item label="甲方身份证号码：">
                  <span>{{ props.row.jsfz }}</span>
                </el-form-item>
                <el-form-item label="甲方联系方式：">
                  <span>{{ props.row.phone1 }}</span>
                </el-form-item>
                <el-form-item label="乙方：">
                  <span>{{ props.row.yifang }}</span>
                </el-form-item>
                <el-form-item label="乙方身份证号码：">
                  <span>{{ props.row.ysfz }}</span>
                </el-form-item>
                <el-form-item label="乙方联系方式：">
                  <span>{{ props.row.phone2}}</span>
                </el-form-item>

                <el-form-item label="成交金额：">
                  <span>{{ props.row.price1 }}</span>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <span>{{ props.row.price2 }}</span>
                </el-form-item>
                <el-form-item label="合同录入：">
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
            label="坐落位置"
            prop="place">
          </el-table-column>
          <el-table-column
            label="甲方"
            prop="jiafang">
          </el-table-column>
          <el-table-column
            label="乙方"
            prop="yifang">
          </el-table-column>
          <el-table-column
            label="成交时间"
            prop="beginDate">
          </el-table-column>
          <el-table-column
            width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showNewhousedeal(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteNewhousedeal(scope.row,scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <!--
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
          prop="workid"
          label="编号"
          width="100">
        </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="小区名称"
            width="120">
          </el-table-column>
          <el-table-column
            fixed
          prop="idcard"
          label="房号"
          width="130">
        </el-table-column>
          <el-table-column
            fixed
            prop="gender"
            label="是否满2"
            width="60">
          </el-table-column>
          <el-table-column
            fixed
            prop="car"
            label="车库/车位"
            width="88">
          </el-table-column>

          <el-table-column
            fixed
            prop="email"
            label="面积"
            width="70">
          </el-table-column>
          <el-table-column
            fixed
            prop="phone"
            label="接待人"
            width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="reno"
            label="装修/毛坯"
            width="70">
          </el-table-column>

          <el-table-column
            fixed
            prop="price"
            label="价格"
            width="70">
          </el-table-column>
          <el-table-column
            fixed
            prop="intr"
            label="上门/介绍"
            width="70">
          </el-table-column>
          <el-table-column
            fixed
          prop="looktime"
          label="看房时间"
          width="120">
        </el-table-column>
          <el-table-column
            fixed
            prop="phone2"
            label="联系方式"
            width="140">
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
        -->
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="newhousedeal" :rules="rules" ref="newhousedealForm">
            <el-row :gutter="1">
              <el-col :span="10">
                <el-form-item label="房屋坐落位置：" prop="place">
                  <el-input  style="width:300px" placeholder="请输入房屋坐落位置" v-model="newhousedeal.place"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="1">
              <el-col :span="8">
                <el-form-item label="成交金额：" prop="price1">
                  <el-input  style="width:150px" placeholder="请输入成交金额" v-model="newhousedeal.price1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付款金额：" prop="price2">
                  <el-input  style="width:150px" placeholder="请输入付款金额" v-model="newhousedeal.price2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="1">
              <el-col :span="8">
                <el-form-item label="甲方：" prop="jiafang">
                  <el-input  style="width:150px" placeholder="请输入甲方" v-model="newhousedeal.jiafang"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="8">
                <el-form-item label="乙方：" prop="yifang">
                  <el-input  style="width:150px" placeholder="请输入乙方" v-model="newhousedeal.yifang"></el-input>
                </el-form-item>
              </el-col>





            </el-row>
            <el-row :gutter="3">
              <el-col :span="8">
                <el-form-item label="甲方身份证号码：" prop="jsfz">
                  <el-input  style="width:200px" placeholder="请输入" v-model="newhousedeal.jsfz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="乙方身份证号码：" prop="ysfz">
                  <el-input  style="width:200px" placeholder="请输入" v-model="newhousedeal.ysfz"></el-input>
                </el-form-item>
              </el-col>


            </el-row>
            <el-row :gutter="3">
              <el-col :span="8">
                <el-form-item label="甲方联系方式：" prop="phone1">
                  <el-input  style="width:150px" placeholder="请输入" v-model="newhousedeal.phone1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="乙方联系方式：" prop="phone2">
                  <el-input  style="width:150px" placeholder="请输入" v-model="newhousedeal.phone2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="编号：" prop="workid">
                  <el-input  style="width:150px" v-model="newhousedeal.workid" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成交时间：" prop="begindate">
                  <el-date-picker
                    v-model="newhousedeal.begindate"
                    style="width: 200px"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <span>合同录入</span>
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容" v-model="newhousedeal.details"
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
          <el-button type="primary" @click="doAddNewhousedeal">确 定</el-button>
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
    name: 'NewhousedealBasic',
    data(){
      return{
        title:'',
        inputDepName:'',
        allDeps:[],
        visible:false,
        dialogVisible:false,
        newhousedeals:[{
        }],
        keyword:'',
        total:0,
        page:1,
        size:10,
        joblevels:[],
        positions:[],
        newhousedeal:{
          place:"",
          jiafang:"",
          yifang:"",
          jsfz:"",
          ysfz:"",
          phone1:"",
          phone2:"",
          departmentid:null,
          joblevelid:null,
          posid:null,
          beginDate:"",
          workid:"",
          price1:"",
          price2:"",
          details:"",
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          place:[{required:true,message:'请输入坐落位置',trigger:'blur'}],
          jiafang:[{required:true,message:'请输入甲方',trigger:'blur'}],
          yifang:[{required:true,message:'请输入乙方',trigger:'blur'}],
          price1:[{required:true,message:'请输入成交金额',trigger:'blur'}],
        }

      }
    },


   mounted(){
      this.initNewhousedeals();
      // this.initData();
    },
    methods:{
      emptyNewhousedeal(){
        this.newhousedeal={
          place:"",
          jiafang:"",
          yifang:"",
          jsfz:"",
          ysfz:"",
          phone1:"",
          phone2:"",
          departmentid:null,
          joblevelid:null,
          posid:null,
          beginDate:"",
          workid:"",
          price1:"",
          price2:"",
          details:"",
        }
      },
 doAddNewhousedeal(){
        if (this.newhousedeal.id){
          this.$refs['newhousedealForm'].validate(valid=>{
            if (valid){
              this.putRequest("/deal/newhouse/",this.newhousedeal).then(res=>{
                this.dialogVisible = false;
                this.initNewhousedeals();
              })
            }
          })
        }else {
          this.$refs['newhousedealForm'].validate(valid=>{
            if (valid){
              this.postRequest("/deal/newhouse/",this.newhousedeal).then(res=>{
                this.dialogVisible = false;
                this.initNewhousedeals();
              })
            }
          })
        }
      },
  getMaxWorkID(){
        this.getRequest("/deal/newhouse/maxWorkID").then(res=>{
          if (res){
            this.newhousedeal.workid = res.object;
          }
        })
      },
      currentChange(currentPage){
        this.page = currentPage;
        this.initNewhousedeals();
      },
      sizeChange(currentSize){
        this.size = currentSize;
        this.initNewhousedeals();
      },
      initNewhousedeals(){
        this.getRequest("/deal/newhouse/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.newhousedeals = res.data;
            this.total = res.total;
          }
        })
      },
      showAddNewhousedealView(){
        this.title="添加房源"
        if(this.$refs['newhousedealForm']!=undefined){
          this.$refs['newhousedealForm'].resetFields()
        }
        this.emptyNewhousedeal();
        this.getMaxWorkID();
        this.dialogVisible=true;
      },
      deleteNewhousedeal(row){
        this.$confirm('此操作将永久删除【'+row.place+'】房源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/deal/newhouse/"+row.id).then(res=>{
            if (res){
              this.initNewhousedeals();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showNewhousedeal(row){
        this.title='编辑房源信息';
        if(this.$refs['newhousedealForm']!=undefined){
          this.$refs['newhousedealForm'].resetFields()
        }
        this.newhousedeal=row;
        this.dialogVisible=true;
      }
    }
  }
</script>

<style scoped>

</style>
