const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    // url: {
    //     type: String,
    //     require: true
    // }
});

EventoSchema.method('toJSON', function(){
    // this.toObject() referencia a todo el objeto que se esta serializando
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);