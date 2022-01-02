const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const constants = require('../constants/constants');

const schemaObj = {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
};

const schema = new Schema(schemaObj)

exports.Counter = getModel();

function getModel() {
    return mongoose.model(constants.COUNTER_MODEL_NAME, schema);
}
