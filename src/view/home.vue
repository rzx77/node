<template>
  <div id="home">
    <el-row>
      <el-col :span="2.5">
        <div class="sea">
          工单号
        </div>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="wiporder">
          <el-button slot="append" icon="el-icon-search" @click="searchWip(); dialogVisible = true; num = 1"></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button class="btn" @click="exportExcel">导出</el-button>
      </el-col>
      <el-col :span="2">
        <div class="sea">
          搜索imei
        </div>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="imei">
          <el-button slot="append" icon="el-icon-search" @click="searchImei"></el-button>
        </el-input>
      </el-col>

      <el-col :span="2">
        <div class="sea">
          搜索sn
        </div>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="sn">
          <el-button slot="append" icon="el-icon-search" @click="searchSn"></el-button>
        </el-input>
      </el-col>
      <el-select placeholder="请选择测试通过结果" v-model="value">
        <el-option value="未通过" @click.native="num = 2" >
          未通过
        </el-option>

          <el-option value="通过"  @click.native="num = 3" >
            通过
          </el-option>
      </el-select>
    </el-row>
    <div class="form" v-show="num == 1">
      <el-table border style="width: 100%" :data="listArr" id="educe-table">
        <el-table-column type="index" label="#" width="80"></el-table-column>
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="wiporder" label="wiporder" width="180"></el-table-column>
        <el-table-column prop="item" label="item" width="100"></el-table-column>
        <el-table-column prop="itemid" label="itemid" width="100"></el-table-column>
        <el-table-column prop="imei" label="imei" width="190"></el-table-column>
        <el-table-column prop="sn" label="sn" width="180"></el-table-column>
        <el-table-column prop="result" label="result" width="100"></el-table-column>
        <el-table-column prop="message" label="message" width="600"></el-table-column>
        <el-table-column prop="createtime" label="createtime" width="250"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          v-model:current-page.sync="currentPage" :page-sizes="[20, 30, 50]" :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="list.length">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
      <div class="dia">
        <div class="dia-img"><img src="../assets/s.png" alt=""></div>
        <div class="wiporder">{{ wiporder }}</div>

        <div class="one">
          <div class="pass">
            <div class="passimg">
              <img src="../assets/pass.png" alt="">
            </div>
            <div class="pass-a">{{ PASS.length }}</div>
          </div>
          <div class="fail">
            <div class="passimg">
              <img src="../assets/fail.png" alt=" ">
            </div>
            <div class="pass-a">{{ FAIL.length }}</div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
     <div class="form-one">
       <el-table border style="width: 100%" :data="FAIL" id="educe-table" v-show="num == 2">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="wiporder" label="wiporder" width="180"></el-table-column>
      <el-table-column prop="item" label="item" width="100"></el-table-column>
      <el-table-column prop="itemid" label="itemid" width="100"></el-table-column>
      <el-table-column prop="imei" label="imei" width="190"></el-table-column>
      <el-table-column prop="sn" label="sn" width="180"></el-table-column>
      <el-table-column prop="result" label="result" width="100"></el-table-column>
      <el-table-column prop="message" label="message" width="600"></el-table-column>
      <el-table-column prop="createtime" label="createtime" width="250"></el-table-column>
    </el-table>
     </div>
  <div class="form-two" v-show="num == 3">
      <el-table border style="width: 100%" :data="PASS.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)" id="educe-table">
        <el-table-column type="index" label="#" width="80"></el-table-column>
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="wiporder" label="wiporder" width="180"></el-table-column>
        <el-table-column prop="item" label="item" width="100"></el-table-column>
        <el-table-column prop="itemid" label="itemid" width="100"></el-table-column>
        <el-table-column prop="imei" label="imei" width="190"></el-table-column>
        <el-table-column prop="sn" label="sn" width="180"></el-table-column>
        <el-table-column prop="result" label="result" width="100"></el-table-column>
        <el-table-column prop="message" label="message" width="600"></el-table-column>
        <el-table-column prop="createtime" label="createtime" width="250"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          v-model:current-page.sync="currentPage" :page-sizes="[20, 30, 50]" :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="PASS.length">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'home',
  data() {
    return {
      list: [],
      newList: [],
      listArr: [],
      message: '',
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 默认每页显示的条数（可修改）
      pagesize: 20,
      wiporder: '',
      imei: '',
      sn: '',
      PASS: [],
      FAIL: [],
      dialogVisible: false,
      value: '',
      isshow: true,
      num: 1
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      axios.get('http://192.168.8.12:10001/api/Tes/showTes').then(res => {
        // console.log(res);
        // console.log(res.data[0].wiporder);
        this.list = res.data
        this.totalCount = res.data.length
        this.listArr = this.list.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)

      }).catch(err => {
        console.log("获取数据失败" + err);
      })
    },
    searchWip() {
      // console.log((this.wiporder));
      axios({
        method: 'get',
        params: {
          wiporder: this.wiporder,
        },
        url: 'http://192.168.8.12:10001/api/Tes/showList'
      }).then(res => {
        // console.log(res.data);
        this.list = res.data
        this.totalCount = res.data.length
        // console.log(this.list[0].result);
        this.listArr = this.list.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
        this.getData()
      }).catch(err => {
        console.log("获取数据失败" + err);

      })
      // console.log(this.PASS);
    },
    getData() {
      console.log(this.list);
      const pass = []
      const fail = []
      this.list.filter(function (item) {
        if (item.result === 'PASS') {
          pass.push(item)
        } else if (item.result === 'FAIL') {
          fail.push(item)
        }

      })
      this.PASS = pass
      this.FAIL = fail
      // console.log(this.PASS);
      // console.log(this.FAIL);
    },
    searchImei() {
      // console.log((this.imei));
      axios({
        method: 'get',
        params: {
          imei: this.imei,
        },
        url: 'http://192.168.8.12:10001/api/Tes/showImei'
      }).then(res => {
        // console.log(res.data);
        this.listArr = res.data
        this.totalCount = res.data.length
        // this.listArr=this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      }).catch(err => {
        console.log("获取数据失败" + err);
      })

    },

    searchSn() {
      // console.log((this.sn));
      axios({
        method: 'get',
        params: {
          sn: this.sn,
        },
        url: 'http://192.168.8.12:10001/api/Tes/showSn'
      }).then(res => {
        // console.log(res.data);
        this.listArr = res.data
        this.totalCount = res.data.length
        // this.listArr=this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      }).catch(err => {
        console.log("获取数据失败" + err);
      })
    },
    //监听当前页展示的数据条数是多少
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.pagesize = newSize
      // this.currentPage = 1
      this.searchWip()
      this.getList()
      // this.getData()

    },
    //监听页码值改变事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.currentPage = newPage
      console.log(this.currentPage);
      this.searchWip()
    },

    exportExcel() {
      // var wb = XLSX.utils.table_to_book(document.querySelector("#educe-table"));
      // // 2.手机号，身份证号等会默认使用科学计数法表示，则需要这样设置
      // var wb = XLSX.utils.table_to_book(
      //   document.querySelector("#educe-table"),
      //   { raw: true }
      // );
      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   book: true,
      //   type: "array"
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     '信息' + ".xlsx"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // return wbout;

      this.excelData = this.list;
      this.export2Excel(); //调用export2Excel函数，
    },

    export2Excel() {
      var that = this;
      require.ensure([], () => {
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径；也可以写相对路径
        const { export_json_to_excel, } = require("../excel/Export2Excel");
        // 导出的excel表头名信息，一般都是表格的表头文字
        const tHeader = [
          "#", "id", "wiporder", "item", "itemid", "imei", "sn", "result", "message", "createtime"];
        // 导出的excel表头字段名，这个必须和数据表格的字段一致
        const filterVal = [
          "#", "id", "wiporder", "item", "itemid", "imei", "sn", "result", "message", "createtime"];
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "信息"); //导出的表格名称，自己命名
      });
    },
    //格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },

}
</script>

<style scoped>
#home {
  width: 1880px;
  margin: 0 auto;
}

.el-row {
  margin-top: 50px;
  /* height: 50px; */
}

.sea {
  width: 110px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-left: 65px;
}

.el-select {
  margin-left: 70px;
}

.btn {
  width: 90px;
  height: 50px;
  margin-left: 10px;
}

.form {
  margin-top: 50px;
}


.dia {
  width: 300px;
  height: 200px;
  margin: auto;
}

.dia-img {
  margin: 0 auto;
  width: 200px;
  height: 125px;

}

.wiporder {
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 19px;
  margin-top: 10px;
}

.one {
  width: 190px;
  height: 40px;
  margin: 20px auto;
}

img {
  width: 100%;
  height: 100%;
}

.pass {
  float: left;
  width: 100px;
  height: 35px;
}

.passimg {
  float: left;
  width: 30px;
  height: 30px;
}

.pass-a {
  margin-left: 10px;
  float: left;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
}

.fail {
  float: right;
  width: 80px;
  height: 35px;
}

a {
  color: #000;
  text-decoration: none;
  font-weight: 400;
}
</style>

<style >
.el-table__body-wrapper {
  background-color: #F7F6FF;
}

.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
}

.el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 0px;
}

.el-input__inner {
  height: 50px;
}
.form-one{
  margin-top: 50px;
}
.form-two{
  margin-top: 50px;
}
</style>
