const express= require("express");
const app= express();
let path= require("path");
const mysql= require("mysql2");
const port= 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'practice_app',
    password: ''                         //Removed coz obv
});



app.listen(port, (req,res)=>{
    console.log("server running");
})

let data=[];

app.get("/", (req,res)=>{
    let q= "Select count(*) as count from user";
    try{
        connection.query(q, (err, result)=>{
            let ans= result[0].count;
            // console.log(ans);
            res.render("home.ejs", {ans});
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/user", (req,res)=>{
    let q= "select id, username, email from user";
    try{
        connection.query(q, (err, result)=>{
            // console.log(result);
            data= result;
        });
        res.render("index.ejs", {data});
        // console.log(data);
    } catch (err){
        console.log(err);
        res.send("Error in db");
    }
    console.log("Server working");
});

app.get("/signup", (req,res)=>{
    res.render("signup.ejs");
});

app.post("/user", (req,res)=>{
    let {username, email, password}= req.body;
    let id= uuidv4();
    // let obj= {id, username, email, password};
    let queryObj= [id, username, email, password];
    console.log(queryObj);
    // data.push(obj);
    let q= "insert into user values (?)";
    try{
        connection.query(q, [queryObj], (err, result)=>{
            // console.log(result);
            console.log("success");
        });
        res.redirect("/user");
        // console.log(data);
    } catch (err){
        console.log(err);
    }
    // res.render("index.ejs");
});

app.get("/user/:id/update", (req,res)=>{
    let uid= req.params.id;
    console.log(uid);
    let q= "select * from user where id=?";
    try{
        connection.query(q, uid, (err, result)=>{
            console.log(result);
            res.render("update.ejs", {result});
        });
        // console.log(data);
    } catch (err){
        console.log(err);
    }
});

app.patch("/user/:id", (req,res)=>{
    let uid= req.params.id;
    let {username, email, password}= req.body;
    console.log(uid);
    let q= "update user set username= ?, email= ?, password= ? where id= ?";
    let queryObj= [username, email, password, uid];
    console.log(queryObj);
    try{
        connection.query(q, queryObj, (err, result)=>{
            res.redirect("/user");
            // console.log("result");
            // res.render("update.ejs", {result});
        });
        // console.log(data);
    } catch (err){
        console.log(err);
    }
});

app.delete("/user/:id",(req,res)=>{
    let uid= req.params.id;
    console.log(uid);
    let q="delete from user where id= ?";
    try{
        connection.query(q, uid, (err, result)=>{
            res.redirect("/user");
            // console.log("result");
            // res.render("update.ejs", {result});
        });
        // console.log(data);
    } catch (err){
        console.log(err);
    }
});

// return object is=> params: { id: '2be602c8-e45f-446a-808e-3955b983ad11' },

// app.patch("/user", (req,res)=>{

// });