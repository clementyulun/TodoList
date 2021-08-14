const express = require('express')
const router = express.Router()
const todoModel = require('../models/listModel')

router.post('/addTodo', (req, res)=>{
    try{
        let newTodo = new todoModel({
            title: req.body.title,
            content: req.body.content,
            isDone: false
        })
        newTodo.save((err, data)=>{
            if(err){
                res.json({"status": 1, "msg": "error"})
                console.log(err)
            }else{
                res.json({"status": 0, "msg": "success", "data": data})
            }
        })
    }catch(err){
        console.log(err)
    }
})
router.get('/getList', (req,res)=>{
    todoModel.find((err, data)=>{
        if(err){
            res.json({"status": 1, "msg": "error"})
            console.log(err)
        }else{
            res.json(data)
        }
    })
})
router.post('/updateTodo', (req, res)=>{
    const id = req.body.id
    todoModel.findById(id, (err, data)=>{
        if(err){
            res.json({"status": 1, "msg": "error"})
        }else{
            data.title = req.body.title
            data.content = req.body.content
            data.save((err)=>{
                if(err){
                    res.json({"status": 1, "msg": "error"})
                }else{
                    res.json({"status": 0, "msg": "success"})
                }
            })
        }
    })
})
router.post('/removeTodo', (req, res)=>{
    const id = req.body.id
    console.log(req.body)
    todoModel.remove({_id: id}, (err, data)=>{
        if(err){
            res.json({"status": 1, "msg": "error"})
        }else{
            res.json({"status": 0, "msg": "success"})
        }
    })
})
router.post('/changeStatus', (req, res)=>{
    const id = req.body.id
    todoModel.findById(id, (err, data)=>{
        if(err){
            res.json({"status": 1, "msg": "error"})
        }else{
            data.isDone = data.isDone ? false : true
        }
        data.save((err)=>{
            if(err){
                res.json({"status": 1, "msg": "error"})
            }else{
                res.json({"status": 0, "msg": "success"})
            }
        })
    })
})

module.exports = router