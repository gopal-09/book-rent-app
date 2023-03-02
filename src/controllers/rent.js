const modRent = require("../models/rent")
const response = require("./response")
module.exports={
    getDataBorrow: (req, res) => {
        const paramUrl = {
          userid: rq.query.userid,
          status: rq.query.status,
          bookid: rq.query.bookid
        }
        let basicquery = `SELECT * FROM v_trx where 1 `
      if (paramUrl.userid!= null) {
        basicquery += ` and userid= ${paramUrl.userid}`
      }
      if (paramUrl.status!= null) {
        basicquery += ` and status= ${paramUrl.status}`
      }
      if (paramUrl.bookid != null) {
        basicquery += ` and bookid= ${paramUrl.bookid}`
      }
      //console.log("==" + basicquery)
      conn.query(basicquery, (err, rs) => {
        if (!err) {
          res.json(rs)
        } else {
          res.json(err)
        }
      })
        
      },
      getBorrowbyId: (rq, rs) => {
        const idborrow = rq.params.idborrow
        conn.query(`SELECT * FROM v_trx where id = ?`, idborrow, (err, res) => {
            if (!err) {
              res.json(res)
            } else {
              res.json(err)
            }
          })
      },
      insertBorrow: (rq, rs) => {
        const data = {
          id_book: rq.body.id_book,
          daterent: new Date(),
          datereturn: rq.body.datereturn,
          datereturnuser: null,
          user_id: rq.body.user_id
        }
        conn.query(`INSERT INTO trx_book SET ?`, data, (err, res) => {
            if (!err) {
              res.json(res)
            } else {
              res.json(err)
            }
          })
      },
      returnBook: (rq, rs) => {
        const idtrx = rq.params.idborrow
        const datereturn = new Date()
        const status = 1
        let idbook = null
        modRent
          .getBorrowbyId(idtrx)
          .then(res => {
            if (res.length > 0) {
              idbook = res[0].bookid
              console.log("ID BOOK", idbook)
              return modRent.updateStatus(status, idbook)
            } else {
              return response.response(rs, "Id Borrow not found", 404)
            }
          })
          .then(res => {
            return modRent.updateDate(datereturn, idtrx)
          }).then(res => {
          response.response(rs, "Book is Successfully Returned", 200, res)})
          .catch(err => console.log(err))
      }
}