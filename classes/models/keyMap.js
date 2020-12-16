const KeyMapSchema = require('../schema/keyMap');
const mongoose = require('mongoose');

const keyMapModel = mongoose.model('keyMap', KeyMapSchema);

module.exports = keyMapModel;
