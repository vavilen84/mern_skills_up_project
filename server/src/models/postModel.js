const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;
const enums = require('../enum/enum');

const modelName = 'post';

const schema = new Schema({
    image: {
        type: String,
        max: 255,
    },
    uniqueKey: {
        type: String,
        max: 255,
        unique: [function () {
            return (this.uniqueKey.length > 0);
        }, 'uniqueKey error']
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