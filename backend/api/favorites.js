import express from "express";
import db from "../db/database";
import Favorite from "../domain/favorite";


const router = express.Router();

router.post("/", (req, res, next) => {

    const user_id = req.body.user_id;

    db.query(Favorite.getAllFavoritesById(user_id), (err, data) => {
        if (!err) {
            res.status(200).json({
                data: data,
            })
        } else {
            res.status(200).json({
                err: err,
                data: data,
            })
        }
    })
})

//post
router.post("/create", (req, res, next) => {
    let favorite = new Favorite(
        req.body.id_user,
        req.body.id_event
    );

    db.query(favorite.addFavorite(), (err, data) => {
        if (!err) {
            res.status(200).json({
                data: data
            })
        } else {
            res.status(200).json({
                err: err
            })
        }

    })
})
module.exports = router;