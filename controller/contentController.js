const Content = require("../models/content");
const moment = require("moment");


// 게시글 목록 조회 API
async function ContentList (req, res) {
   const contentList = await Content
    .find()
    .sort({ createdAt : 'desc' })
   
   const CreateAt = moment().format("YYYY-MM-DD HH:mm:ss");
   const UpdateAt = moment().format("YYYY-MM-DD HH:mm:ss");

    res.status(200).json( {
        contentList : contentList.map((a) => ({ 
            postId: a.postId,
            createdAt: a.createdAt,
            UpdateAt : a.UpdateAt,
            userId : a.userId,
            title: a.title,
            content : a.content,
            imageURL: a.imageURL,
            price : a.price
        })),
     });
};


// 게시글 작성 API
async function writeContent (req, res) {
    const { userId } = res.locals.user;
    const { title, content, imageURL, price} = req.body;
   
    const CreateAt = moment().format("YYYY-MM-DD HH:mm:ss");
   
    const postContent = await Content.create({
        userId, title, content, imageURL, price, CreateAt });
        
    res.status(201).json({ 
        postContent, msg: '글이 작성되었습니다!',
})
};

// 게시글 수정 API(patch)
async function modifyContent (req, res) {
    const { userId } = res.locals.user
    const { postId } = req.params;
    const { title, content, updateAt, imageURL , price} = req.body;
    const findContent = await Content.findById(postId);

    if(userId !== findContent.userId){
        await res.status(400).json({errorMessage : "접근 권한이 없습니다!"})
    }
   
    const UpdateAt = moment().format("YYYY-MM-DD HH:mm:ss");
        
    const modifyPosting = await Content.findByIdAndUpdate(postId, {
        $set: { title: title, content: content, UpdateAt: UpdateAt, imageURL: imageURL, price: price },
    });
    res.status(201).json({
        modifyPosting,
        msg: '글이 수정되었습니다.',
    });
};


// 게시글 삭제 API
async function deleteContent (req, res) {
    const { userId } = res.locals.user
    const { postId } = req.params;
    const findContent = await Content.findById(postId);

    if(userId !== findContent.userId){
        return res.status(400).json({errorMessage : "접근 권한이 없습니다!"})
    }

    if (findContent) {
        await Content.findByIdAndDelete(postId);
        res.status(200).json({
            result: 'success',
            msg: '글이 삭제되었습니다.',
        });
    }
};

//게시물 검색기능
async function SearchContent (req,res) {
    const {value} = req.query;
    const SearchContent = await Content
    .find({ content: new RegExp(value) }).sort({ CreateAt : 'desc' });

    if(!SearchContent || SearchContent[0] === undefined || value === "" || !value) {
        return res.status(400).json({errorMessage: "검색 옵션이 없습니다."})
    } 

    if(SearchContent){
        await res.status(200).send({SearchContent, msg: "검색완료!"})
    };
};

module.exports.SearchContent = SearchContent;
module.exports.writeContent = writeContent;
module.exports.ContentList = ContentList;
module.exports.modifyContent = modifyContent;
module.exports.deleteContent = deleteContent;
