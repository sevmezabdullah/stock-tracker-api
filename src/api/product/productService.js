const { createProduct, getAllProducts, updateProduct, deleteProduct } = require("./productRepository")

const createProductService = async (product) => {
    const newProduct = await createProduct(product)
    return newProduct
}
const getAllProductsService = async () => {
    const products = await getAllProducts()
    return products
}

const updateProductService = async (product) => {
    const updatedProduct = await updateProduct(product)
    return updatedProduct
}

const deleteProductService = async (id) => {
    const deletedProduct = await deleteProduct(id)
    return deletedProduct
}

module.exports = {
    createProductService,
    getAllProductsService,
    updateProductService,
    deleteProductService
}








