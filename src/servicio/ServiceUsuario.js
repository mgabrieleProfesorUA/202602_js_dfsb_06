import { DBUsuario } from "../db/model/DBUsuario.js";
import { connectDB } from "../db/config/DBConexion.js";

connectDB();

// Create
const user = await DBUsuario.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
});