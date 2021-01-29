const express = require("express");
const Sushi = require("./models/sushi_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    next();
  });

app.get("/", (req, res) => {
    res.json({ msg: "sushi "});
})

app.get("/api/v1/sushi", async (req, res) => {
    const sushi = await Sushi.find({});
    res.json(sushi);
})

app.get('/api/v1/sushi/:id', getSushiById, (req, res) => {
    res.json(res.sushiFound);
});

app.post("/api/v1/sushi", async (req, res) => {
    const sushi = new Sushi({ name: req.body.name, image: req.body.image })
    const savedSushi = await sushi.save()
    res.status(201).json(savedSushi)
})

app.patch("/api/v1/sushi/:id", async (req, res) => {
    await Sushi.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, (err, result)=>{
        if(err){
            console.log('Error updating sushi: ' + err)
            res.status(400).json({ message: err.message });
        } else {
            res.status(200).json(result);
        }
    });
})

app.delete('/api/v1/sushi/:id', getSushiById, async (req, res) => {
    try {
        await res.sushiFound.remove();
        res.json({ message: 'Deleted Sushi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getSushiById(req, res, next) {
    let sushi;
    try {
      sushi = await Sushi.findById(req.params.id);
      if (sushi == null) {
        return res.status(404).json({ message: 'Cannot find sushi with that ID' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.sushiFound = sushi;
    next();
  }

module.exports = app
