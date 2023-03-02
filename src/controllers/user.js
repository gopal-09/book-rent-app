const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const conn=require("../configs/db")
module.exports ={
    signUp:async(req,res)=>{
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role_id: req.body.role_id
          }
          const username =data.email;
         const query = `SELECT * FROM user WHERE email = '${username}'`;
         conn.query(query, (error, results, fields) => {
            if (error) {
              console.log(error);
            } else if (results.length > 0) {
              res.json({message:"user exists"});
            } 
            conn.query('INSERT INTO user SET ?',data,(err,result)=>{
              if(err)
              console.log(err);
              else{
                const token =JWT.sign({username }, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
                 res.json({message:"register successful"})}
            })
            
          });
          //const token = await JWT.sign({username }, "nfb32iur32ibfqfvi3vf932bg932g932", {expiresIn: 360000});
          //console.log(token)
    },
    signIn:async(req, res)=>{
      const data = {
        email: req.body.email,
        password: req.body.password//bcrypt.hashSync(req.body.password, 8)
        }
        const username =data.email;
        const password=data.password;
         const query = `SELECT * FROM user WHERE email = '${username}'`;
         conn.query(query, async (error, results, fields) => {
          if (error) {
            console.log(error);
          } else if (results.length > 0) {
            console.log(results[0].password);
            console.log(password);
            let isMatch = await bcrypt.compare(req.body.password,results[0].password);
            console.log(isMatch);
            if(!isMatch){
              res.json({
                  errors: [
                      {
                          msg: "Invalid Credentials" 
                      }
                  ]
            // res.json({message:"sign success"});
          })
        }
         if(isMatch){
            const token =JWT.sign({username }, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
            res.json({message:"signin success",token:token})
          }
        }
          
        })
        //const token = await JWT.sign({username }, "nfb32iur32ibfqfvi3vf932bg932g932", {expiresIn: 360000}); 
    },
    getbyId:async(req,res)=>{
       const id=req.params.id;
       const query = `SELECT * FROM user where id = '${id}'`;
       conn.query(query, (error, results, fields) => {
        if (error) {
          console.log(error);
        } else if (results.length > 0) {
          res.json({results:results})
        }
    })
  }
    
         
}