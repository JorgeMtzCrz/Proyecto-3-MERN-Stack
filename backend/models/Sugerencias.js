const { Schema, model } = require('mongoose')


const sugerenciaSchema = new Schema({
    typeMsg: { type: String, enum: ["Sugerencia", "Queja", "Felicitacion"] },
    msg: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    duration: String,
    matricula: String,

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Sugerencia', sugerenciaSchema)