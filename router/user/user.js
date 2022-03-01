import express from "express";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();


router.post('/getUserMsg',(req,res,next)=>{
    // 返回 图像路径？     余额信息
    console.log(`req.user`, req.user);
    console.log(`req.body`,req.body);
});


export default router;