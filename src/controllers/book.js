const conn = require("../configs/db")
const nameColumns = ["title", "datereleased", "genre"]
const nameGen = ["name"]

module.exports={
    getAll:async(req,res)=>{
        const paramUrl = {
            sorting: rq.query.sort,
            available: rq.query.available,
            search: rq.query.search
          }
          const limit = parseInt(rq.query.limit, 10) || 1000
    const page = parseInt(rq.query.page, 10) || 1
    const start = (page - 1) * limit

    paramUrl.limit = limit
    paramUrl.start = start
    const sort = paramUrl.sorting
      const available = paramUrl.available             //host/rentapp/books?sort=title:desc&available=true&page=1&limit=2
      const search = paramUrl.search
      let basicquery = `SELECT * FROM v_book where 1 `
      if (available != null) {
        basicquery += ` AND available = '${available}'`
      }
      if (search != null) {
        basicquery += ` AND title like  '%${search}%' or genre like '%${search}%'`
      }
      if (sort != null) {
        let [col, order] = sort.split(":")
        // console.log(order)
        if (order === undefined) {
          order = "asc"
        }
        if (!nameColumns.includes(col)) {
          console.log("Only can sort Title, Date Release, and Genre")
          
        }
        if (order !== "asc" && order !== "desc") {
          console.log("Invalid sort order");
          
        }

        basicquery += ` ORDER BY ${col} ${order}`
      }
      basicquery += ` limit ${param.start},${param.limit}  `
      console.log("==" + basicquery)
      conn.query(basicquery, (err, rs) => {
        if (!err) {
          res.json(rs)
        } else {
          res.json(err)
        }
      })
    },
    getById: (req, res) => {
      const idbook = rq.params.idbook
      conn.query(`SELECT * from v_book where id =?`, idbook, (err, rs) => {
        if (!err) {
          res.json(rs)
        } else {
          res.json(err)
        }
      })
    },
    search: (req, res) => {
      const param = rq.params.param
      conn.query(
        `SELECT * from v_book where title =? or id=?`,
        [title, id],
        (err, rs) => {
          if (!err) {
            res.json(rs)
          } else {
            res.json(err)
          }
        }
      )
    
    },
    addData: (rq, rs) => {
      const data = {
        id: rq.body.id,
        title: rq.body.title,
        description: rq.body.desc,
        image: rq.body.image,
        dateReleased: rq.body.date,
        id_status: rq.body.available,
        id_genre: rq.body.genre
      }
      conn.query(`INSERT INTO book SET ?`, data, (err, result) => {
        if (!err) {
          res.json(result)
        } else {
          res.json(err)
        }
      })
    },
    editData: (rq, rs) => {
      const idbook = rq.params.idbook
      const data = {
        title: rq.body.title,
        description: rq.body.desc,
        image: rq.body.image,
        dateReleased: rq.body.date,
        id_status: rq.body.available,
        id_genre: rq.body.genre
      }
      conn.query(
        `UPDATE book set ? where id = ?`,
        [data, idbook],
        (err, res) => {
          if (!err) {
            res.json(res)
          } else {
            res.json(err)
          }
        }
      )
    
    },
    deleteData: (rq, rs) => {
      const idbook = rq.params.idbook
      conn.query(`DELETE FROM book WHERE id = ?`, idbook, (err, res) => {
        if (!err) {
          res.json(res)
        } else {
          res.json(err)
        }
      })
      },
      getGenre: (req, res) => {
    // const sorting = rq.query.sort
    const paramUrl = {
      sorting: rq.query.sort,
      search: rq.query.search
    }
    const limit = parseInt(rq.query.limit, 10) || 9
    const page = parseInt(rq.query.page, 10) || 1
    const start = (page - 1) * limit

    paramUrl.limit = limit
    paramUrl.start = start
    const sort = paramUrl.sorting
    const search = paramUrl.search
   
      let basicquery = `SELECT * FROM genre where 1 `
      if (search != null) {
        basicquery += ` AND name like  '%${search}%'`
      }
      if (sort != null) {
        let [col, order] = sort.split(":")
        // console.log(order)
        if (order === undefined) {
          order = "asc"
        }
        if (!nameGen.includes(col)) {
          resolve("Only can sort name")
          return
        }
        if (order !== "asc" && order !== "desc") {
          resolve("Invalid sort order")
          return
        }

        basicquery += ` ORDER BY ${col} ${order}`
      }
      basicquery += ` limit ${param.start},${param.limit}  `
      console.log("==" + basicquery)
      conn.query(basicquery, (err, rs) => {
        if (!err) {
          res.json(rs)
        } else {
          res.json(err)
        }
      })
    
  },
  getGenreById: (rq, rs) => {
    const idgenre = rq.params.idgenre
    conn.query(`SELECT * FROM Genre WHERE id =?`, idgenre, (err, rs) => {
      if (!err) {
        res.json(rs)
      } else {
        res.json(err)
      }
    })
  },
  addGenre: (rq, rs) => {
    const name = rq.body.name
    conn.query(`INSERT INTO genre SET ?`, name, (err, result) => {
      if (!err) {
        res.json(result)
      } else {
        res.json(err)
      }
    })
  },
  editGenre: (rq, rs) => {
    const idgenre = rq.params.idgenre
    const data = {
      name: rq.body.name
    }
    conn.query(`INSERT INTO genre SET ?`,idgenre, (err, result) => {
      if (!err) {
        res.json(result)
      } else {
        res.json(err)
      }
    })
  },
  deleteGenre: (rq, rs) => {
    const idgenre = rq.params.idgenre
    conn.query(`DELETE FROM genre WHERE id = ?`, idgenre, (err, res) => {
      if (!err) {
        res.json(res)
      } else {
        res.json(err)
      }
    })
  }  
}