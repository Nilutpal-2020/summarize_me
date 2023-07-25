const router = require("express").Router();
const auth = require("../middleware/auth");

let History = require("../models/history.model");

router.get("/", auth, async (req, res) => {
    await History.find({userId: req.user})
        .then(history => res.json(history))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post("/add", auth, async (req, res) => {
    const summary = req.body.summary;
    const sentiment = req.body.sentiment;

    if (!summary)
        return res.status(400).json({msg: "Empty Summary!"});

    if (!summary)
        return res.status(400).json({msg: "Empty Sentiment!"});

    const newHistory = new History({
        userId: req.user,
        summary,
        sentiment
    });

    await newHistory.save()
        .then(() => res.json(newHistory))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.delete("/delete/:id", auth, async (req, res) => {
    const history = await History.findOne({userId: req.user, _id: req.params.id});
    // console.log(history);
    if (!history) 
        return res
            .status(400)
            .json({msg: "No Summary Found!"});
    await History.findByIdAndDelete(req.params.id)
        .then(() => res.json("Summary Deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;