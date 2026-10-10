import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';

    //const bcrypt = await import('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [3, 'Mínimo 3 caracteres'],
        maxlength: [50, 'Máximo 50 caracteres']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false // No incluir en queries por defecto
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    profile: {
        avatar: String,
        bio: { type: String, maxlength: 500 },
        socialLinks: {
            twitter: String,
            github: String
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: Date
    },
    {
        timestamps: true, // createdAt, updatedAt
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
// Virtual property

userSchema.virtual('fullProfile').get(function() {
    return `${this.name} (${this.email})`;
});

// Middleware pre-save
/*userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});*/

// Método de instancia
userSchema.methods.comparePassword = async function(candidatePassword) {
    //const bcrypt = await import('bcrypt');
    return await bcrypt.compare(candidatePassword, this.password);
};

// Método estático
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

export const DBUsuario = model('DBUsuario', userSchema);