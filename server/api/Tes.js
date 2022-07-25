const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()

  conn.on('error',err=>{
      if (!err.fatal) {
          return;
      }
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
          throw err;
      }
      console.log('Re-connecting lost connection: ' + err.stack);
      conn = mysql.createConnection(models.mysql)

  })

const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}
// 接口：查询全部
router.get('/showTes', (req, res) => {
  const sql = 'select * from factory_test';
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get("/showList", function (req, res) {
  console.log(req.query);
  const sqlNew = 'select * from factory_test where wiporder = ?';
  conn.query(sqlNew, [req.query.wiporder], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})



router.get("/showImei", function (req, res) {
  console.log(req.query);
  const sqlimei = 'select * from factory_test where imei = ?';
  conn.query(sqlimei, [req.query.imei], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.get("/showSn", function (req, res) {
  console.log(req.query);
  const sqlsn = 'select * from factory_test where sn = ?';
  conn.query(sqlsn, [req.query.sn], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router