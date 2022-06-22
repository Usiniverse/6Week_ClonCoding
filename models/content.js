const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema(
    {
        userId: String,
        content: String, 
        title: String, 
        imageURL: [String], 
        price : String,

        },
        
        { timestamps: true },

        );

        

// const Content = mongoose.model('Content', ContentSchema);

ContentSchema.virtual('postId').get(function () { 
    return this._id.toHexString(); 
});

ContentSchema.set('toJSON', { virtuals: true });

async function getContentList() {
    return Content.find().sort({ createdAt : 'desc' });
}

const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;

module.exports.getContentList = getContentList;
