
module.exports = app=>{
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();

    router.post("/",tutorials.create);

    router.get("/",tutorials.findAll);

    router.get("/:id",tutorials.findOne);

    router.put("/:id", tutorials.update);

    router.delete("/:id", tutorials.delete);

    router.delete("/", tutorials.deleteAll);

    router.get("/published", tutorials.findAllPublished);

    app.use('/api/tutorials', router);

}