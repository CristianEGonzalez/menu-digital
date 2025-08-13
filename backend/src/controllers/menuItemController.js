const MenuItem = require('../models/menuItem');
const mongoose = require('mongoose');
require('dotenv').config()

const createMenuItem = async (req, res) => {
  try {
    const { name, photo, price, ingredients, section } = req.body
    const newMenuItem = new MenuItem({ name, photo, price, ingredients, section });
    await newMenuItem.save();

    return res.status(201).json(newMenuItem);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear Menu Item", error });
  }
};

// const mostrarComentarios = async (_, res) => {
//   const cacheKey = 'comentarios:todos'
//   try {
//     const cached = await redisClient.get(cacheKey)
//     if(cached){
//       return res.status(200).json(JSON.parse(cached))
//     }

//     const fechaLimite = new Date();
//     fechaLimite.setMonth(fechaLimite.getMonth() - process.env.ANTIGUEDAD_COMENTARIO); 

//     const comentarios = await Comment.find({ 
//       createdAt: { $gte: fechaLimite }
//     }).select("comment");

//     await redisClient.set(cacheKey, JSON.stringify(comentarios), { EX: 300 })
//     return res.status(200).json(comentarios);
//   } catch (error) {
//     return res.status(500).json({ message: "Error al mostrar comentarios", error });
//   }
// };

// const mostrarComentario = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "ID inválido" });
//     }
//     const cacheKey = `comentario:${id}`
//     const cached = await redisClient.get(cacheKey)
//     if(cached){
//       return res.status(200).json(JSON.parse(cached))
//     }

//     const comentario = await Comment.findById(id);
    
//     await redisClient.set(cacheKey, JSON.stringify(comentario), { EX: 300 })

//     return res.status(200).json(comentario);
//   } catch (error) {
//     return res.status(500).json({ message: "Error al mostrar comentario", error });
//   }
// };

// const actualizarComentario = async (req,res) =>{
//   try {
//     const { comment, postId, userId } = req.body
//     const comentarioActualizado = await Comment.findByIdAndUpdate(req.params.id,{comment, postId, userId}, { new: true });

//     await redisClient.del(`comentario:${req.params.id}`)
//     await redisClient.del('comentarios:todos')
    
//     return res.status(200).json({ message: 'Comentario actualizado', comment: comentarioActualizado });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error al actualizar el comentario', error });
//   }  
// }

// const eliminarComentario = async (req, res) => {
//   try {
//     const commentId = req.params.id;
//     await Comment.findByIdAndDelete(commentId);

//     await redisClient.del(`comentario:${id}`)
//     await redisClient.del('comentarios:todos')

//     return res.status(200).json({message: "Comentario eliminado exitosamente"});
//   } catch (error) {
//     return res.status(500).json({ message:"Error al eliminar comentario", error});
//   }
// };

module.exports = {
    createMenuItem
}