const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    blacklistedToken: {
        type: String,
        required: true,}
},{ timestamps: true })

const blacklistModel = mongoose.model("blacklist", blacklistSchema)

module.exports = blacklistModel;