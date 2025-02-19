

const { createProductService, getAllProductsService, deleteProductService } = require('./productService');

async function createProduct(request, response) {
    const product = request.body;
    const productName = product.productName;
    const stock = Number(product.stock);
    const country = product.country;
    const expireDate = Date(product.expireDate);
    const color = product.color;
    const weight = Number(product.weight);
    try {
        const createdProduct = await createProductService({
            productName,
            stock,
            country,
            expireDate,
            color,
            weight
        });
        if (createdProduct) return response.status(201).json({
            message: "Ürün oluşturuldu",
            createdProduct
        })
        return response.status(400).json({
            message: "Ürün oluşturulamadı",
            error
        })

    } catch (error) {
        return response.status(500).json({
            message: "Ürün oluşturulamadı"
        })
    }
}


async function getAll(request, response) {
    const products = await getAllProductsService()
    return response.status(200).json({
        products,
        totalCount: products.length
    })
}

async function updateProduct(request, response) {
    const product = request.body
    try {
        const updatedProduct = await updateProductService(product)
        if (updatedProduct) return response.status(201).json({
            message: "Ürün güncellendi",
            updatedProduct
        })
        return response.status(400).json({
            message: "Ürün güncellenemedi",
            error
        })
    } catch (error) {
        return response.status(500).json({
            message: "Ürün güncellenemedi"
        })
    }

}

async function deleteProduct(request, response) {
    const id = request.params.id;
    try {
        const result = await deleteProductService(id)
        if (result) return response.status(200).json({
            message: "Ürün silindi",
            result
        })
        return response.status(400).json({
            message: "Ürün silinemedi",
            error
        })
    } catch (error) {
        return response.status(500).json({
            message: "Ürün silinemedi"
        })
    }
}

module.exports = {
    createProduct,
    getAll,
    updateProduct,
    deleteProduct
}