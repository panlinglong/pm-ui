<template>
    <div>
      <div>
        <el-input placeholder="请输入房屋坐落位置进行搜索" prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initNewhousedeals"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initNewhousedeals">搜索</el-button>
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
                <el-form-item label="应收佣金：">
                  <span>{{ props.row.price3 }}</span>
                </el-form-item>
                <el-form-item label="实收佣金：">
                  <span>{{ props.row.price4 }}</span>
                </el-form-item>
                <el-form-item label="是否退佣：">
                  <span>{{ props.row.tuiyong }}</span>
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
            label="成交业务员"
            prop="upname">
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
            width="200">
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
              <el-button
                @click.native.prevent="getImg(scope.row,scope.$index)"
                type="text"
                size="small">
                合同录入（图片）
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-dialog
          :title="title"
          :visible.sync="dialogUploadVisible"
          width="70%"
          @close='closeDialog'>
          <el-upload
            action="/employee/basic/img/"
            accept="image/png, image/jpeg"
            list-type="picture-card"
            :file-list='this.imgSrcs'
            :before-upload="beforeUploadPicture"
            :on-preview="handlePictureCardPreview"
            :on-progress="uploadProgress"
            :on-success="uploadSuccess"
            :on-change="uploadLimit"
            :on-error="uploadError"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :class="{disabled:uploadDisabled}"
            :show-file-list="true">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImageVisible">
            <el-image :lazy="true"  width="100%" :src="dialogImageUrl" alt=""/>
          </el-dialog>
        </el-dialog>

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

            <el-row :gutter="1">
              <el-col :span="8">
                <el-form-item label="应收佣金：" prop="price3">
                  <el-input  style="width:150px" placeholder="请输入应收佣金" v-model="newhousedeal.price3"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实收佣金：" prop="price4">
                  <el-input  style="width:150px" placeholder="请输入实收佣金" v-model="newhousedeal.price4"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否退佣：" prop="tuiyong">
                  <el-input  style="width:150px" placeholder="请输入" v-model="newhousedeal.tuiyong"></el-input>
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
        imgpath:{
          workid:"",
          imagepath:"",
        },
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
          price3:"",
          price4:"",
          upname:"",
          tuiyong:"",
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
      getImg(row){
        console.log(row);
        this.rowa = row.workid;
        this.upnames = row.upname;
        this.getRequest("/employee/basic/getImg/?workid="+this.rowa).then(res=> {

          console.log(res);
          this.imgpaths = res.data;
          console.log(this.imgpaths);
          for(let i=0;i<this.imgpaths.length;i++){
            const imgSrc = {
              name:"",
              url:"",
            }
            imgSrc.name = this.imgpaths[i].id;
            imgSrc.url= "../../static"+this.imgpaths[i].imagepath;
            this.imgSrcs.push(imgSrc);
          }

          console.log(this.imgSrcs);
          this.dialogUploadVisible = true;
        })
      },
      closeDialog(){
        this.imgSrcs=[];
        this.dialogUploadVisible=false;

      },
      handleRemove(file, fileList) {
        if(this.user.name==this.upnames||this.user.roles[0].id==3||this.user.roles[0].id==6){
          this.deleteRequest("/employee/basic/deleteImg/"+file.name)
          console.log(file, fileList);
        }else{
          this.$confirm("非上传者无权删除图片，刷新后再次出现");
        }

      },
      uploadSuccess(response, file, fileList) {
        console.log(response);
        console.log(this.rowa);
        if(this.user.name==this.upnames||this.user.roles[0].id==3||this.user.roles[0].id==6){
          this.imgpath.imagepath = response;
          this.imgpath.workid = this.rowa;
          this.postRequest("/employee/basic/addImg",this.imgpath)
        }else{
          this.$confirm("非上传者无权上传图片，刷新后恢复");
        }
      }
      ,
      uploadLimit(file,fileList){
        console.log(this.upnames);
        console.log(this.user.name);
        if(this.upnames!=this.user.name){
          this.uploadDisabled = true;
        }
      },
      beforeRemove(file, fileList) {

        return this.$confirm(`确定移除 ${ file.name }？`);

      },

      beforeUploadPicture(file) {
        if(file.size > 10*1024*1024){
          this.$message.error("上传图片不能大于10M");
          return false;
        }
      },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImageVisible = true;
      },
      uploadProgress(event,file, fileList){

      },
      uploadError(err, file, fileList) {
        this.$message.error("上传出错");
      },
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
          price3:"",
          price4:"",
          upname:"",
          tuiyong:"",
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
              this.newhousedeal.upname=this.user.name;
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
        console.log(this.user.name);
        console.log(row.upname);
        if (row.upname != this.user.name && this.user.name != "管理员" && this.user.name != "系统管理员") {
          this.$confirm("非上传者无法删除");
        } else {
          this.$confirm('此操作将永久删除【' + row.place + '】房源, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/deal/newhouse/" + row.id).then(res => {
              if (res) {
                this.initNewhousedeals();
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
      showNewhousedeal(row){
        console.log(row.upname);
        console.log(this.user.name);
        if (row.upname == this.user.name || this.user.name == "管理员" || this.user.name == "系统管理员") {
        this.title='编辑房源信息';
        if(this.$refs['newhousedealForm']!=undefined){
          this.$refs['newhousedealForm'].resetFields()
        }
        this.newhousedeal=row;
        this.dialogVisible=true;
      }else {
          this.$confirm("非上传者无法编辑");
        }
      }
    }
  }
</script>

<style scoped>

</style>
