const MenuItem = require('../models/menuItem');
const mongoose = require('mongoose');
require('dotenv').config()

const createMenuItem = async (req, res) => {
  try {
    const { name, price, ingredients, section } = req.body;
    const photo = req.file.filename;
    const newMenuItem = new MenuItem({ name, photo, price, ingredients, section });
    await newMenuItem.save();

    return res.status(201).json(newMenuItem);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear Menu Item", error });
  }
};

const getMenuItemList = async (_, res) => {
  try {
    const menuItems = await MenuItem.find();
    return res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los Menu Items", error });
  }
}

const getMenuItem = async (req, res) => {
  try{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const menuItem = await MenuItem.findById(id);
    return res.status(200).json(menuItem)
  } catch (error){
    return res.status(500).json({ message: "Error al obtener el Menu Item", error });
  }
}

const deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    await MenuItem.findByIdAndDelete(id);
    return res.status(200).json({ message: "Menu Item eliminado exitosamente" })
  } catch (error) {
    return res.status(500).json({ message:"Error al eliminar Menu Item", error});
  }
}

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


module.exports = {
    createMenuItem,
    getMenuItemList,
    getMenuItem,
    deleteMenuItem
}