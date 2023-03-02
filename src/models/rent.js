const conn = require("../configs/db")
module.exports ={
getAllBorrow: param => {
  return new Promise((resolve, reject) => {
    const userid = param.userid
    const status = param.status
    const bookid = param.bookid
    // console.log(filter)
    let basicquery = `SELECT * FROM v_trx where 1 `
    if (userid != null) {
      basicquery += ` and userid= ${userid}`
    }
    if (status != null) {
      basicquery += ` and status= ${status}`
    }
    if (bookid != null) {
      basicquery += ` and bookid= ${bookid}`
    }
    console.log("==" + basicquery)
    conn.query(basicquery, (err, rs) => {
      if (!err) {
        resolve(rs)
      } else {
        reject(err)
      }
    })
  })
},
getBorrowbyId: idborrow => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM v_trx where id = ?`, idborrow, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
},
getBookId: idborrow => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM v_trx bookid = ?`, idborrow, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
},
getBookStatus: idbook => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT id_status from book where id = ?`,
      idbook,
      (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      }
    )
  })
},
insertBorrow: data => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO trx_book SET ?`, data, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
},
updateStatus: (status, idbook) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE book SET id_status = ? WHERE book.id = ?`,
      [status, idbook],
      (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
},
updateDate: (date, idborrow) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE trx_book SET datereturnuser = ? WHERE id = ?`,
      [date, idborrow],
      (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}
}