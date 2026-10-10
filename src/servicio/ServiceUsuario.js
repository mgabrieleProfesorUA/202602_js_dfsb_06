import { DBUsuario } from "../db/model/DBUsuario.js";
import { connectDB } from "../db/config/DBConexion.js";

connectDB();

// Create
/*
const user = await DBUsuario.create({
    name: 'Miguel Gabriele',
    email: 'mgabriele@autonoma.edu.pe',
    password: 'password345'
});
*/

// Read
/*
const users = await DBUsuario.find({ isActive: true })
    .select('name email')
    .limit(10)
    .sort({ createdAt: -1 });

console.log(users);
*/

// Update
const updated = await DBUsuario.findByIdAndUpdate(
    '6ac9ad2be23a439726f96f59',
    { $set: { name: 'Jane Doe' } },
    { new: true, runValidators: true }
);

const userFindByID = await DBUsuario.findById('6ac9ad2be23a439726f96f59');
console.log(userFindByID);


// Delete
await DBUsuario.findByIdAndDelete('6ac9ad2be23a439726f96f59');