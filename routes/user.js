const express=require("express");
const bcryptjs=require("bcryptjs");
const UserModel=require("../models/user")
const router=express.Router();

//注册
router.post("/sign-up",async(req,res)=>{
	//1. 获取前端传递过来的参数
	let username=req.body.username;
    let password=req.body.password;
	let email=req.body.email;
	//2.校验参数是否ok
	
	//3.判断是否可以注册
	let data= await UserModel.findOne({email:email})
	if(data){
		//邮箱已被注册
		res.send({
			code:-1,
			msg:"邮箱已被注册"
		});
		return;
	}
	//4. 保存到数据库
	let user=new UserModel({
		username:username,
		password:bcryptjs.hashSync(password,10),
		email:email
	});
	await user.save();
	res.send({
		code:0,
		msg:"注册成功"
	});
});

//登录
router.post("/sign-in",(req,res)=>{
	res.send("登录");
});



module.exports=router;