const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const universitySchema = new Schema({
    telephone: {
        type: String,
        default: 'Actualiza tus datos'
    },
    typeSocial: {
        type: String,
        enum: ['Pública', 'Privada', 'Actualiza tus datos'],
        default: 'Actualiza tus datos'
    },
    address: {
        type: String,
        default: 'Actualiza tus datos'
    },
    mision: {
        type: String,
        default: 'Actualiza tus datos'
    },
    vision: {
        type: String,
        default: 'Actualiza tus datos'
    },
    objetivo: {
        type: String,
        default: 'Actualiza tus datos'
    },
    location: {
        address: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('University', universitySchema)