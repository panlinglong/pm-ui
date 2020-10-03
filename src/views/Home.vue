<template>

    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogPwVisible"
        width="40%">

          <el-row >
            <el-col span="10"> <span>请输入新密码：</span>
              <el-input  style="width:150px" placeholder="请输入新密码" v-model="newPw" show-password></el-input>
            </el-col>

          </el-row>
            <el-row>
              <el-col span="10">
              <span>请确认新密码：</span>
            <el-input  style="width:150px" placeholder="请输入新密码" v-model="newPw1" show-password></el-input>
              </el-col>
            </el-row>
        <el-button @click="dochange()">确定</el-button>
      </el-dialog>

      <el-container>
        <el-header class="homeHeader">
          <div class="title">楼阿姨卖房</div>
          <div>
          <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.name}}
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            <el-button @click="changePw" type="success" plain>修改密码</el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu router >
              <el-submenu :index="index+''" v-for="(item,index) in menus" v-if="!item.hidden" :key="index">
                <template slot="title">
                  <i :class="item.iconcls"></i>
                  <span>{{item.name}}</span>
                </template>
                  <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
              <span>租房到期提醒（30天）</span>
              <div style="margin-top: 10px">
                <el-table
                  :data="chuzus"
                  :cell-style="{background: '#fcfcfc',color: '#000'}"
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
                        <el-form-item label="付款方式：">
                          <span>{{ props.row.fangs }}</span>
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
                        <el-form-item label="租金：">
                          <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="上门/介绍：">
                          <span>{{ props.row.intr }}</span>
                        </el-form-item>
                        <el-form-item label="看房时间：">
                          <span>{{ props.row.looktime }}</span>
                        </el-form-item>
                        <el-form-item label="起租时间：">
                          <span>{{ props.row.begindate }}</span>
                        </el-form-item>
                        <el-form-item label="到期时间：">
                          <span>{{ props.row.endDate }}</span>
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
                    label="上传者："
                    prop="upname">
                  </el-table-column>
                  <el-table-column
                    label="接待人："
                    prop="people">
                  </el-table-column>
                  <el-table-column
                    label="到期时间："
                    prop="endDate">
                  </el-table-column>
                </el-table>
              </div>
              <span>租房缴费提醒（1天）</span>
              <div style="margin-top: 10px">
                <el-table
                  :data="chuzuss"
                  :cell-style="{background: '#fcfcfc',color: '#000'}"
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
                        <el-form-item label="付款方式：">
                          <span>{{ props.row.fangs }}</span>
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
                        <el-form-item label="租金：">
                          <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="上门/介绍：">
                          <span>{{ props.row.intr }}</span>
                        </el-form-item>
                        <el-form-item label="看房时间：">
                          <span>{{ props.row.looktime }}</span>
                        </el-form-item>
                        <el-form-item label="起租时间：">
                          <span>{{ props.row.begindate }}</span>
                        </el-form-item>
                        <el-form-item label="到期时间：">
                          <span>{{ props.row.endDate }}</span>
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
                    label="上传者："
                    prop="upname">
                  </el-table-column>
                  <el-table-column
                    label="接待人："
                    prop="people">
                  </el-table-column>
                  <el-table-column
                    label="上次缴费："
                    prop="payDate">
                  </el-table-column>
                  <el-table-column
                    label="提醒时间："
                    prop="alarmDate">
                  </el-table-column>
                </el-table>
              </div>
             <div class="demo-image">
              <div class="block" key="fit">
                <span class="demonstration">{{ fit }}</span>
                <el-image
                  style="width: 400px; height: 202px"
                  :src="url"
                  :fit="fit"></el-image>
              </div>
            </div>
            </div>

            <router-view class="homeRouterView"/>
          </el-main>
        </el-container>
      </el-container>
    </div>




</template>
<script>
  import {putRequest} from "../utils/api";

  export default {
    name: 'Home',
    data(){
      return{
        title:"修改密码",
        newPw:"",
        newPw1:"",
        hr:{
          password:"",
          id:"",
        },
        dialogPwVisible:false,
        chuzus:[{
      }],
        chuzuss:[{
        }],
        chuzu:{
          name:"",
          fangs:"",
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
          endDate:"",
          payDate:"",
          alarmDate:"",
          upname:"",
        },
        url:'/static/heng1.png',
        user:JSON.parse(window.sessionStorage.getItem("user"))
      }
    },
    mounted(){
      this.initChuzus();
      this.initChuzuss();
      this.initData();
    },
    computed:{
      menus(){
        return this.$store.state.routes
      }
    },
    methods:{
      commandHandler(cmd){
        if (cmd == 'logout'){
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getRequest("/logout");
              window.sessionStorage.removeItem("user");
              this.$store.commit("initRoutes",[])
              this.$router.replace("/");
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
          }

        },
      changePw(){
          this.dialogPwVisible = true;
      },
      dochange(){
        console.log(this.user.id);
        if(this.newPw){
          if(this.newPw==this.newPw1){
            this.hr.id=this.user.id;
            this.hr.password=this.newPw;
            console.log(this.hr.id);
            console.log(this.hr.password);
            putRequest("/system/basic/hr/changpw/",this.hr);
            this.$confirm("修改成功");
            this.dialogPwVisible = false;
          }else{
            this.$confirm("两次输入的密码不相同")
          }
        }

      },
      initChuzus(){
        this.getRequest("/chuzu/basic/endtime/").then(res=>{
          if (res){
            this.chuzus = res.data;
          }
        })
      },
      initChuzuss(){
        this.getRequest("/chuzu/basic/payalarm/").then(res=>{
          if (res){
            this.chuzuss = res.data;
          }
        })
      },
      }
  }
</script>

<style>
  .homeRouterView{
    margin-top: 10px;
  }
  .homeWelcome{
    text-align: center;
    font-size: 40px;
    font-family: 华文行楷;
    color: #ff0000;

  }
  .homeHeader{
    background-color: #6abfb4;
    display: flex;
    /*竖直居中*/
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }
  .title{
    font-size: 30px;
    font-family: 华文行楷;
    color: white;
  }
  .userInfo{
    cursor: pointer;
  }
  .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
  }
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
</style>
