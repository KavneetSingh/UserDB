const { faker } = require('@faker-js/faker');
const mysql= require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'practice_app',
    password: 'KSingh#@100%'
  });

// let q= "insert into user values (?)";

// let user= ["123dsc", "123_newUserdc", "user123@gamail.comdc", "user123Passcd"];

// let users= [
//     ["123", "123_newUser", "user123@gamail.com", "user123Pass"],
//     ["124", "124_newUser", "user124@gamail.com", "user124Pass"]
// ];


// try{
//     connection.query(q, [user], (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// } catch(err){
//     console.log(err);
// }

// connection.end();

let getRandomUser = () =>{
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ];
}

let data= [];

// async function adder(q){
//     try{
//         connection.query(q, (err, result)=>{
//             console.log(result);
//         })
//     }
//     catch(err){
//         console.log(err);
//     }
// }



for(let i=0;i<10;i++){
    let user= getRandomUser();
    // console.log(user);
    // let q= `insert into user values (${user.userId},${user.username},${user.email},${user.password})`;
    // await adder(q);
    data.push(user);
}

// // console.log(data);

let q1= "insert into user values ?";
try{
    connection.query(q1, [data], (err,result)=>{
        console.log(result);
    });
} catch (err){
    console.log(err);
}

// let q2= "select * from user";

// try{
//     connection.query(q2, (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// } catch(err){
//     console.log(err);
// }

connection.end();

// console.log(data);

// console.log(getRandomUser());