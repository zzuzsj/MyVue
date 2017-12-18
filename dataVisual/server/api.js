// const models = require('./db');
const express = require('express');
const router = express.Router();


function createData(){
    let obj = {};
    let professions = ['teacher','worker','actor','driver','programmer','doctor','guide','lawyer','policeman','processfor','writer','model'];
    for(let i=0;i<1000;i++){
        obj['person'+i]={};
        obj['person'+i].name='person'+i;
        obj['person'+i].gender=Math.random()>0.5?'male':'female';
        obj['person'+i].profession=professions[Math.floor(Math.random()*professions.length)];
        obj['person'+i].age=Math.floor(Math.random()*80);
    }
    return obj;
}

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

router.get('/dataApi/data',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    res.send(JSON.stringify(createData()));
});
module.exports = router;