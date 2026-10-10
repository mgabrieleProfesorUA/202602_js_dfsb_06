import { DBUsuario } from "../db/model/DBUsuario.js";
import { connectDB } from "../db/config/DBConexion.js";
import { Schema, Post } from 'mongoose';

connectDB();

// Operadores de comparación
/*
const usersQuery1 = await DBUsuario.find({
    //age: { $gte: 18, $lte: 65 },
    role: { $in: ['user', 'admin'] },
    name: { $regex: /john/i }
});
console.log(usersQuery1);
*/

// Operadores lógicos
/*
const usersQuery2 = await DBUsuario.find({
    $or: [
        { email: 'john@example.com' },
        { name: 'John Doe' }
    ],
    $and: [
        { isActive: true },
        { role: 'admin' }
    ]
});
console.log(usersQuery2);
*/

/*
// Projection
const usersQuery3 = await DBUsuario.find()
    .select('name email -_id')
    .lean(); // Retorna objetos planos (más rápido)
console.log(usersQuery3);
*/

/*
// Populate (relaciones)
const postSchema = new Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
*/

const posts = await Post.find()
    .populate('author', 'name email')
    .populate({
    path: 'comments',
    select: 'text createdAt',
    options: { limit: 5, sort: { createdAt: -1 } }
});
