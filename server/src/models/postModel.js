const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;
const enums = require('../enum/enum');
const constants = require('../constants/constants');
const {POST_MODEL_NAME} = require("../constants/constants");
const {Counter} = require("./countersModel");
const logger = require('./../utils/logger')(module);
const { v4: uuidv4 } = require('uuid');

async function urlUniqueValidator(v) {
    let model = getModel();
    let doc = await model.findOne({url: v}).exec();
    console.log(doc);
    console.log(this);
    if (doc) {
        if (doc.id !== this._id.toString()) {
            return false;
        }
    }
    return true;
}

const urlCustomValidators = [
    {validator: urlUniqueValidator, msg: constants.VALIDATION_ERRORS.UNIQUE}
]

const schemaObj = {
    _id: {
        type: String,
        default: () => uuidv4()
    },
    image: {
        type: String,
        max: 255,
    },
    url: {
        type: String,
        index: {unique: true},
        required: [true, constants.VALIDATION_ERRORS.REQUIRED],
        validate: urlCustomValidators,
        max: 255,
    },
    title: {
        type: String,
        max: 255,
    },
    relatedPostIds: {
        type: Array,
    },
    tags: {
        type: Array,
    },
    keywords: {
        type: String,
        max: 255,
    },
    description: {
        type: String,
        max: 255,
    },
    greeting: {
        type: String,
    },
    content: {
        type: String,
        required: [true, constants.VALIDATION_ERRORS.REQUIRED],
    },
    status: {
        type: Number,
        enum: [enums.PostStatuses.ACTIVE, enums.PostStatuses.INACTIVE],
        default: enums.PostStatuses.ACTIVE
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    seq: {
        type: Number,
        default: 0
    }
};

const schema = new Schema(schemaObj)

schema.pre('save', function (next) {
    let doc = this;
    Counter.findByIdAndUpdate({_id: POST_MODEL_NAME}, {$inc: {seq: 1}}, async function (error, counter) {
        if (!counter) {
            counter = await new Counter({_id: POST_MODEL_NAME, seq: 1}).save()
        }
        if (error)
            return next(error);
        if (!doc.seq) {
            doc.seq = counter.seq;
        }
        next();
    });
});

exports.Post = getModel();

function getModel() {
    return mongoose.model(constants.POST_MODEL_NAME, schema);
}

exports.ValidationErrorResponseSerializer = function (err) {
    return errorSerializer(Object.keys(schemaObj), err);
}

exports.populateFromRequestOnCreate = function (formDataFields, imageFilename) {
    return {
        image: imageFilename || null,
        url: formDataFields.url || null,
        title: formDataFields.title || null,
        relatedPostIds: formDataFields.relatedPostIds || [],
        tags: formDataFields.tags || [],
        keywords: formDataFields.keywords || null,
        description: formDataFields.description || null,
        greeting: formDataFields.greeting || null,
        content: formDataFields.content || null,
        status: formDataFields.status || enums.PostStatuses.ACTIVE
    }
}

exports.populateFromRequestOnUpdate = function (req, post) {
    post.image = req.body.image || post.image;
    post.url = req.body.url || post.url;
    post.title = req.body.title || post.title;
    post.relatedPostIds = req.body.relatedPostIds || post.relatedPostIds;
    post.tags = req.body.tags || post.tags;
    post.keywords = req.body.keywords || post.keywords;
    post.description = req.body.description || post.description;
    post.greeting = req.body.greeting || post.greeting;
    post.content = req.body.content || post.content;
    post.status = req.body.status || post.status;
    post.updatedAt = Date.now();

    return post;
}