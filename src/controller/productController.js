
const { Product, validateProduct } = require('../models/productSchema');

async function createProduct(request, response) {
    const product = request.body;
    const productName = product.productName;
    const stock = Number(product.stock);
    const country = product.country;
    const expireDate = Date(product.expireDate);
    const color = product.color;
    const weight = Number(product.weight);
    try {

        const { error, value, warning } = validateProduct(request.body)

        console.debug("🚀 ~ createProduct ~ value:", value)

        console.debug("🚀 ~ createProduct ~ warning:", warning)

        console.debug("🚀 ~ createProduct ~ error:", error)

        if (!error) {
            const newProduct = new Product({
                productName,
                stock,
                country,
                expireDate,
                color,
                weight
            });
            await newProduct.save();
            return response.status(201).json({
                message: "Ürün oluşturuldu"
            });
        }
        return response.status(400).json({
            message: "Ürün oluşturulamadı",
            error
        })

    } catch (error) {


        console.debug("🚀 ~ createProduct ~ error:", error)
        return response.status(500).json({
            message: "Ürün oluşturulamadı"
        })
    }
}


async function getAll(request, response) {
    const products = await Product.find();

    return response.status(200).json({
        products,
        totalCount: products.length
    })
}

async function updateProduct(request, response) {
    const product = request.body

    try {
        const result = await Product.findByIdAndUpdate(product._id, {
            productName: product.productName,
            stock: product.stock,
            country: product.country,
            expireDate: product.expireDate,
            color: product.color,
            weight: product.weight
        }, { new: true });
        return response.status(201).json({
            message: "Ürün güncellendi",
            result
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
        const result = await Product.findByIdAndDelete(id);
        return response.status(200).json({
            message: "Ürün silindi",
            result
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