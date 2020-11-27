const mongoose = require('Libs/mongoose').Mongoose,
    Schema = mongoose.Schema;

const modelName = 'post';
const scenarioVirtualProp = 'scenario';

const schema = new Schema({
    image_filename: {
        type: String,
    },
    image_ext: {
        type: String,
    },
    uniqueKey: {
        type: String,
        unique: true,
    },
    greeting: {
        type: String,
    },
    content: {
        type: String,
    },
    status: {
        type: Boolean,
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