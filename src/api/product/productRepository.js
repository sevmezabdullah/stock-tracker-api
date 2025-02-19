const { Product } = require('./productSchema')


const createProduct = async (product) => {
    const newProduct = new Product(product)
    await newProduct.save()
    return newProduct
}

const getAllProducts = async () => {
    const products = await Product.find()
    return products
}

const updateProduct = async (product) => {
    const updatedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true })
    return updatedProduct
}

const deleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id)
    return deletedProduct
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}





