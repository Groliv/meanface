var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: "Title can't be blank"
    },
    content: {
        type: String,
        default: '',
        required: "Content can't be blank"
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Publication', PublicationSchema);
