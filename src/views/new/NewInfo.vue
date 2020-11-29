<template>

    <div>
      <div>
        <el-input placeholder="请输入房源名进行搜索，可直接回车搜索..." prefix-icon="el-icon-search" style="width: 350px;" v-model="keyword" @keydown.enter.native="initNewhouses"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initNewhouses">搜索</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddNewhouseView">添加房源</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table
          :cell-style="{background: '#fcfcfc',color: '#000'}"
          :data="newhouses"
          style="width: 100%">
          <el-table-column type="expand" >
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="楼盘名称：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="楼盘类型：">
                  <span>{{ props.row.abc1 }}</span>
                </el-form-item>
                <el-form-item label="面积段：">
                  <span>{{ props.row.mianji }}</span>
                </el-form-item>
                <el-form-item label="价格：">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="学区：">
                  <span>{{ props.row.car }}</span>
                </el-form-item>
                <el-form-item label="户型：">
                  <span>{{ props.row.huxing }}</span>
                </el-form-item>
                <el-form-item label="体量：">
                  <span>{{ props.row.tiliang }}</span>
                </el-form-item>
                <el-form-item label="物业费：">
                  <span>{{ props.row.wuye}}</span>
                </el-form-item>
                <el-form-item label="开盘时间">
                  <span>{{ props.row.opentime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            prop="workid">
          </el-table-column>
          <el-table-column
            label="楼盘名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="类型"
            prop="abc1">
          </el-table-column>
          <el-table-column
            label="开盘时间"
            prop="opentime">
          </el-table-column>
          <el-table-column
            label="上传者"
            prop="upname">
          </el-table-column>

          <el-table-column
            width="200">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showNewhouse(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteNewhouse(scope.row,scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
              <el-button
                @click.native.prevent="getImg2(scope.row,scope.$index)"
                type="text"
                size="small">
                户型图
              </el-button>
              <el-button
                @click.native.prevent="getImg(scope.row,scope.$index)"
                type="text"
                size="small">
                实景图
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>



<!--      <el-dialog-->
<!--        title="上传图片"-->
<!--        :visible.sync="dialogImgVisible"-->
<!--        width="30%">-->
<!--        <el-upload-->
<!--          class="upload-demo"-->
<!--          action="/employee/basic/img/"-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :before-remove="beforeRemove"-->
<!--          :on-success="(response, file, fileList)=>uploadSuccess(response, file, fileList)"-->
<!--          multiple-->
<!--          :file-list="this.dialogImageUrl">-->
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
<!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>-->
<!--        </el-upload>-->


<!--        <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogImgVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialogImgVisible = false">确 定</el-button>-->
<!--  </span>-->
<!--      </el-dialog>-->
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

      <el-dialog
        :title="title"
        :visible.sync="dialogUploadVisible2"
        width="70%"
        @close='closeDialog2'>
        <el-upload
          action="/newinfo/info/img/"
          accept="image/png, image/jpeg"
          list-type="picture-card"
          :file-list='this.imgSrcs2'
          :before-upload="beforeUploadPicture2"
          :on-preview="handlePictureCardPreview2"
          :on-progress="uploadProgress2"
          :on-success="uploadSuccess2"
          :on-change="uploadLimit2"
          :on-error="uploadError2"
          :before-remove="beforeRemove2"
          :on-remove="handleRemove2"
          :class="{disabled:uploadDisabled}"
          :show-file-list="true">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogImageVisible2">
          <el-image :lazy="true"  width="100%" :src="dialogImageUrl2" alt=""/>
        </el-dialog>
      </el-dialog>


      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%">
        <div>
          <el-form :model="newhouse" :rules="rules" ref="newhouseForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="楼盘名称：" prop="name">
                  <el-input  style="width:150px" placeholder="请输入楼盘名称" v-model="newhouse.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开盘时间：" prop="opentime">
                  <el-date-picker
                    v-model="newhouse.opentime"
                    style="width: 200px"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="面积段：" prop="mianji">
                  <el-input  style="width:150px" placeholder="请输入面积段" v-model="newhouse.mianji"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="价格：" prop="price">
                  <el-input  style="width:150px" placeholder="请输入价格" v-model="newhouse.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="户型：" prop="huxing">
                  <el-input  style="width:150px" placeholder="请输入户型" v-model="newhouse.huxing"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="8">
                  <el-form-item label="学区：" prop="xuequ">
                    <el-input  style="width:150px" placeholder="请输入学区" v-model="newhouse.xuequ"></el-input>
                  </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
            <el-col :span="8">
            <el-form-item label="体量：" prop="tiliang">
              <el-input  style="width:150px" placeholder="请输入体量" v-model="newhouse.tiliang">
              </el-input>
            </el-form-item>
          </el-col>
              <el-col :span="8">
                <el-form-item label="编号：" prop="workid">
                  <el-input  style="width:150px" v-model="newhouse.workid" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="体量：" prop="tiliang">
                  <el-input  style="width:150px" placeholder="请输入体量" v-model="newhouse.tiliang">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row :gutter="20">
              <el-col :span="8">
              <el-form-item label="类型：" prop="abc1">
                <el-input  style="width:200px"  v-model="newhouse.abc1"></el-input>
              </el-form-item>
            </el-col>

              <el-col :span="8">
                <el-form-item label="备注：" prop="remarks">
                  <el-input  style="width:200px"  v-model="newhouse.remarks"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="上传者：" prop="upname">
                  <el-input  style="width:150px"  v-model="newhouse.upname" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddNewhouse">确 定</el-button>
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
.disabled .el-upload--picture-card {
  display: none!important;
}
</style>

<script>
  export default {
    name: 'NewInfo',
    data(){
      return{
        uploadDisabled:false,
        uploadDisabled2:false,
        dialogImageUrl: [],
        dialogImageUrl2: [],
        getPhone:"",
        imgSrcs:[],
        imgSrcs2:[],
        title:'',
        user:JSON.parse(window.sessionStorage.getItem("user")),
        visible:false,
        dialogImageVisible:false,
        dialogUploadVisible:false,
        dialogVisible:false,
        dialogImageVisible2:false,
        dialogUploadVisible2:false,
        newhouses:[{
        }],
        rowa:"",
        upnames:"",
        urls:[],
        keyword:'',
        total:0,
        page:1,
        size:10,
        joblevels:[],
        positions:[],
        rolename:[],
        rolenames:"",
        newhouse:{
          name:"",
          mianji:"",
          workid:"",
          price:"",
          xuequ:"",
          remarks:"",
          imgpaths:[{}],
          hximgs:[{}],
          upname:"",
          huxing:"",
          tiliang:"",
          wuye:"",
          opentime:"",
          abc1:"",
          abc2:"",
        },
        imgpath:{
          workid:"",
          imagepath:"",
        },
        hximg:{
          workid:"",
          imagepath:"",
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules:{
          name:[{required:true,message:'请输入小区名称',trigger:'blur'}],
        }

      }
    },


   mounted(){
      this.initNewhouses();
    },
    methods:{
      // setRow(row, event, column){
      //   console.log(row, event, column);
      //   this.rowa = row.workid;
      // },
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
      getImg2(row){
        console.log(row);
        this.rowa = row.workid;
        this.upnames = row.upname;
        this.getRequest("/newinfo/info/getImg/?workid="+this.rowa).then(res=> {
          console.log(res);
          this.hximgs = res.data;
          console.log(this.hximgs);
          for(let i=0;i<this.hximgs.length;i++){
            const imgSrc2 = {
              name:"",
              url:"",
            }
            imgSrc2.name = this.hximgs[i].id;
            imgSrc2.url= "../../static"+this.hximgs[i].imagepath;
            this.imgSrcs2.push(imgSrc2);
          }

          console.log(this.imgSrcs2);
          this.dialogUploadVisible2 = true;
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
      closeDialog2(){
        this.imgSrcs2=[];
        this.dialogUploadVisible2=false;

      },
      handleRemove2(file, fileList) {
        if(this.user.name==this.upnames||this.user.roles[0].id==3||this.user.roles[0].id==6){
          this.deleteRequest("/newinfo/info/deleteImg/"+file.name)
          console.log(file, fileList);
        }else{
          this.$confirm("非上传者无权删除图片，刷新后再次出现");
        }

      },
      uploadSuccess2(response, file, fileList) {
        console.log(response);
        console.log(this.rowa);
        if(this.user.name==this.upnames||this.user.roles[0].id==3||this.user.roles[0].id==6){
          this.hximg.imagepath = response;
          this.hximg.workid = this.rowa;
          this.postRequest("/newinfo/info/addImg",this.hximg)
        }else{
          this.$confirm("非上传者无权上传图片，刷新后恢复");
        }
      }
      ,
      uploadLimit2(file,fileList){
        console.log(this.upnames);
        console.log(this.user.name);
        if(this.upnames!=this.user.name){
          this.uploadDisabled2 = true;
        }
      },
      beforeRemove2(file, fileList) {

        return this.$confirm(`确定移除 ${ file.name }？`);

      },

      beforeUploadPicture2(file) {
        if(file.size > 10*1024*1024){
          this.$message.error("上传图片不能大于10M");
          return false;
        }
      },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      handlePictureCardPreview2(file) {
        this.dialogImageUrl2 = file.url;
        this.dialogImageVisible2 = true;
      },
      uploadProgress2(event,file, fileList){

      },
      uploadError2(err, file, fileList) {
        this.$message.error("上传出错");
      },
      emptyNewhouse(){
        this.newhouse={
          name:"",
          mianji:"",
          workid:"",
          price:"",
          xuequ:"",
          remarks:"",
          imgpaths:[{}],
          upname:"",
          huxing:"",
          tiliang:"",
          wuye:"",
          opentime:"",
          abc1:"",
          abc2:"",
        }
      },
 doAddNewhouse(user){
        if (this.newhouse.id){
          this.$refs['newhouseForm'].validate(valid=>{
            if (valid){
              this.putRequest("/newinfo/info/",this.newhouse).then(res=>{
                this.dialogVisible = false;
                this.initEmps();
              })
            }
          })
        }else {
          this.$refs['newhouseForm'].validate(valid=>{
            if (valid){
              this.newhouse.upname=this.user.name;
              this.postRequest("/newinfo/info/",this.newhouse).then(res=>{
                this.dialogVisible = false;
                this.initNewhouses();
              })
            }
          })
        }
      },
  getMaxWorkID(){
        this.getRequest("/newinfo/info/maxWorkID").then(res=>{
          if (res){
            this.newhouse.workid = res.object;
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
      initNewhouses(){
        this.getRequest("/newinfo/info/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(res=>{
          if (res){
            this.newhouses = res.data;
            this.total = res.total;
          }
        })
      },
      showAddNewhouseView(){
        this.title="添加房源"
        if(this.$refs['newhouseForm']!=undefined){
          this.$refs['newhouseForm'].resetFields()
        }
        this.emptyNewhouse();
        this.getMaxWorkID();
        this.dialogVisible=true;
      },
      deleteNewhouse(row) {
        console.log(this.user.name);
        console.log(row.upname);
        if (row.upname != this.user.name && this.user.name != "管理员" && this.user.name != "系统管理员") {
          this.$confirm("非上传者无法删除");
        } else {
          this.$confirm('此操作将永久删除【' + row.name + '】, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/newinfo/info/" + row.id).then(res => {
              if (res) {
                this.initNewhouses();
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
      showNewhouse(row){
        console.log(row.upname);
        console.log(this.user.name);
        if(row.upname==this.user.name||this.user.name=="管理员"||this.user.name=="系统管理员"){
          this.title='编辑房源信息';
          this.newhouse=row;
          this.dialogVisible=true;
        }else{
          this.$confirm("非上传者无法编辑");
        }
      }
    }
  }
</script>

<style scoped>

</style>
