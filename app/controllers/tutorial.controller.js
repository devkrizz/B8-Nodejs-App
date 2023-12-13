const { request } = require("express");
const db = require("../models");

const Tutorial = db.tutorials;

exports.create =(req,res)=>{
    if(!req.body.title){
        res.status(400).send({message:"Content can't be empty"});
        return;
    }

    const tutorial =new Tutorial({

        title:req.body.title,
        description:req.body.description,
        published:req.body.published
    })

    tutorial
    .save(tutorial)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating tutorial"
        })
    })
};





exports.findAll =(req,res)=>{

    const title = req.query.title; 
    var condition = title?{title:{ $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
    .then(data=> {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

exports.findOne =(req,res)=>{
    const id = req.params.id;
    Tutorial.findById(id)
    .then(data=>{
        if(!data)
        res.status(404).send({message:"Not found tutorial with id"+ id});
    else
    res.send(data);
    })
    .catch(err=>{res.status(500).send("Error in retrieving tutorial with id="+ id)});
};

exports.update =(req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"Data to update can't be empty"
        });
    }
    const id =req.params.id;
    Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Can't update the tutorial with id=${id}.Maybe Tutorial was not found`})
        }else
        res.send({message:"Tutorial was updated successfully"});
    })
    .catch(err=>{
        res.status(500).send({message:"Error while updating tutorial with id ="+ id})
    })
};

exports.delete =(req,res)=>{
const id = req.params.id;
Tutorial.findByIdAndRemove(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:`Can't delete tutorial with id=${id}`})
    }else{res.send({message:"Tutorial deleted successfully"})}
})
.catch(err=>{
    res.status(500).send({message:"Couldn't delete tutorial with id "+ id})
})
};

exports.deleteAll =(req,res)=>{

    Tutorial.deleteMany({})
        .then(data=>{
            res.send({
                message:`${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

exports.findAllPublished =(req,res)=>{
    Tutorial.find({published: true})
        .then(data =>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};