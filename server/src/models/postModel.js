const mongoose = require('Utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const errorSerializer = require('Utils/modelErrorSerializer');
const enums = require('Enum/enum');

const modelName = 'post';

const schema = new Schema({
    image: {
        type: String,
        max: 255,
    },
    uniqueKey: {
        type: String,
        unique: true,
        max: 255,
    },
    url: {
        type: String,
        unique: true,
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
        required: true,
    },
    status: {
        type: Boolean,
        default: enums.PostStatuses.ACTIVE
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
});

exports.Post = mongoose.model(modelName, schema);

exports.ValidationErrorResponseSerializer = function (err) {
    let props = ['image', 'uniqueKey', 'url', 'title', 'keywords', 'description', 'content'];
    return errorSerializer(props, err);
}