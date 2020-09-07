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
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="小区名称：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="房号：">
                  <span>{{ props.row.idcard }}</span>
                </el-form-item>
                <el-form-item label="是否满2：">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="车库/车位：">
                  <span>{{ props.row.car }}</span>
                </el-form-item>
                <el-form-item label="面积：">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="学区：">
                  <span>{{ props.row.xuequ }}</span>
                </el-form-item>
               <el-form-item label="室内规划：">
                  <span>{{ props.row.jsjt1 }}</span>
                 <span>{{ props.row.jsjt2 }}</span>
                 <span>{{ props.row.jsjt3 }}</span>
                </el-form-item>
                <el-form-item label="接待人：">
                  <span>{{ props.row.people}}</span>
                </el-form-item>
                <el-form-item label="装修/毛坯：">
                  <span>{{ props.row.reno }}</span>
                </el-form-item>
                <el-form-item label="价格：">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="上门/介绍：">
                  <span>{{ props.row.intr }}</span>
                </el-form-item>
                <el-form-item label="看房时间：">
                  <span>{{ props.row.looktime }}</span>
                </el-form-item>
                <el-form-item label="联系方式：">
                  <span>{{ props.row.phone2 }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            prop="workid">
          </el-table-column>
          <el-table-column
            label="小区名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="房号"
            prop="idcard">
          </el-table-column>
          <el-table-column
            label="状态："
            prop="xingz">
          </el-table-column>
          <el-table-column
            label="备注："
            prop="remarks">
          </el-table-column>
          <el-table-column
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
          <el-form :model="emp" :rules="rules" ref="empForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="小区名称：" prop="name">
                  <el-input  style="width:150px" placeholder="请输入小区名称" v-model="emp.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房号：" prop="idcard">
                  <el-input  style="width:200px" placeholder="请输入房号" v-model="emp.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="面积：" prop="email">
                  <el-input  style="width:150px" placeholder="请输入面积" v-model="emp.email"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="价格：" prop="price">
                  <el-input  style="width:150px" placeholder="请输入价格" v-model="emp.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否满2：" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="接待人：" prop="people">
                  <el-input  style="width:150px" placeholder="请输入接待人" v-model="emp.people"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
            <el-col :span="8">
            <el-form-item label="车库车位：" prop="car">
              <el-input  style="width:150px" placeholder="有无车位/车库面积" v-model="emp.car">
              </el-input>
            </el-form-item>
          </el-col>
              <el-col :span="8">
                <el-form-item label="编号：" prop="workid">
                  <el-input  style="width:150px" v-model="emp.workid" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装修/毛坯：" prop="reno">
                  <el-radio-group v-model="emp.reno">
                    <el-radio label="装修">装修</el-radio>
                    <el-radio label="毛坯">毛坯</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="上门/介绍：" prop="intr">
                  <el-radio-group v-model="emp.intr">
                    <el-radio label="上门">上门</el-radio>
                    <el-radio label="介绍">介绍</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="看房时间：" prop="looktime">
                  <el-input  style="width:150px" placeholder="请输入看房时间" v-model="emp.looktime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学区：" prop="xuequ">
                  <el-input  style="width:150px" placeholder="请输入学区" v-model="emp.xuequ"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="联系方式" prop="phone2">
                  <el-input  style="width:150px" placeholder="请输入联系方式" v-model="emp.phone2"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-form-item label="室：" prop="jsjt1">
                  <el-select v-model="emp.jsjt1"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="厅：" prop="jsjt2">
                  <el-select v-model="emp.jsjt2"  placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="卫：" prop="jsjt3">
                  <el-select v-model="emp.jsjt3"  placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="状态" prop="xingz">
                  <el-select v-model="emp.xingz" placeholder="请选择"  >
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注：" prop="remarks">
                  <el-input  style="width:200px"  v-model="emp.remarks"></el-input>
                </el-form-item>
              </el-col>

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
          <el-button type="primary" @click="doAddEmp">确 定</el-button>
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
    name: 'EmpBasic',
    data(){
      return{
        options4: [{
          value: '未出售',
          label: '未出售'
        }, {
          value: '已出售',
          label: '已出售'
        }],
        options2: [{
          value: '1厅',
          label: '1厅'
        }, {
          value: '2厅',
          label: '2厅'
        }, {
          value: '3厅',
          label: '3厅'
        }, {
          value: '4厅',
          label: '4厅'
        }, {
          value: '5厅',
          label: '5厅'
        }, {
          value: '6厅',
          label: '6厅'
        }, {
          value: '7厅',
          label: '7厅'
        }, {
          value: '8厅',
          label: '8厅'
        }, {
          value: '9厅',
          label: '9厅'
        }, {
          value: '10厅',
          label: '10厅'
        }],
        options3: [{
          value: '1卫',
          label: '1卫'
        }, {
          value: '2卫',
          label: '2卫'
        }, {
          value: '3卫',
          label: '3卫'
        }, {
          value: '4卫',
          label: '4卫'
        }, {
          value: '5卫',
          label: '5卫'
        }, {
          value: '6卫',
          label: '6卫'
        }, {
          value: '7卫',
          label: '7卫'
        }, {
          value: '8卫',
          label: '8卫'
        }, {
          value: '9卫',
          label: '9卫'
        }, {
          value: '10卫',
          label: '10卫'
        }],
        value: '',
        options: [{
          value: '1室',
          label: '1室'
        }, {
          value: '2室',
          label: '2室'
        }, {
          value: '3室',
          label: '3室'
        }, {
          value: '4室',
          label: '4室'
        }, {
          value: '5室',
          label: '5室'
        }, {
          value: '6室',
          label: '6室'
        }, {
          value: '7室',
          label: '7室'
        }, {
          value: '8室',
          label: '8室'
        }, {
          value: '9室',
          label: '9室'
        }, {
          value: '10室',
          label: '10室'
        }],
        title:'',
        inputDepName:'',
        allDeps:[],
        visible:false,
        dialogVisible:false,
        emps:[{
        }],
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
          people:"",
          phone2:"",
          departmentid:null,
          joblevelid:null,
          posid:null,
          begindate:"",
          workid:"",
          car:"",
          reno:"",
          price:"",
          looktime:"",
          intr:"",
          xuequ:"",
          jsjt1:"",
          jsjt2:"",
          jsjt3:"",
          xingz:"",
          remarks:"",
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          name:[{required:true,message:'请输入小区名称',trigger:'blur'}],
          gender:[{required:true,message:'请输入',trigger:'blur'}],
          reno:[{required:true,message:'请输入',trigger:'blur'}],
          intr:[{required:true,message:'请输入',trigger:'blur'}],
          idcard:[{required:true,message:'请输入房号',trigger:'blur'}],
          email:[{required:true,message:'请输入面积',trigger:'blur'}],
          people:[{required:true,message:'请输入接待人',trigger:'blur'}],
          phone2:[{required:true,message:'请输入联系方式',trigger:'blur'}],
          price:[{required:true,message:'请输入价格',trigger:'blur'}],
          car:[{required:true,message:'请输入车位/车库',trigger:'blur'}],
          jsjt1:[{required:true,message:'请输入几室',trigger:'blur'}],
          jsjt2:[{required:true,message:'请输入几厅',trigger:'blur'}],
          jsjt3:[{required:true,message:'请输入几卫',trigger:'blur'}],
          xingz:[{required:true,message:'公司/中介房源',trigger:'blur'}],
        }

      }
    },


   mounted(){
      this.initEmps();
      // this.initData();
    },
    methods:{
      emptyEmp(){
        this.emp={
          name:"",
          gender:"",
          birthday:"",
          idcard:"",
          email:"",
          people:"",
          phone2:"",
          begindate:"",
          workid:"",
          car:"",
          reno:"",
          price:"",
          looktime:"",
          intr:"",
          xuequ:"",
          jsjt1:"",
          jsjt2:"",
          jsjt3:"",
          xingz:"",
          remarks:"",
        }
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
  getMaxWorkID(){
        this.getRequest("/employee/basic/maxWorkID").then(res=>{
          if (res){
            this.emp.workid = res.object;
          }
        })
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
        this.title="添加房源"
        if(this.$refs['empForm']!=undefined){
          this.$refs['empForm'].resetFields()
        }
        this.emptyEmp();
        this.getMaxWorkID();
        this.dialogVisible=true;
      },
      deleteEmp(row){
        this.$confirm('此操作将永久删除【'+row.name+'】房源, 是否继续?', '提示', {
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
        this.title='编辑房源信息';
        if(this.$refs['empForm']!=undefined){
          this.$refs['empForm'].resetFields()
        }
        this.emp=row;
        this.dialogVisible=true;
      }
    }
  }
</script>

<style scoped>

</style>
