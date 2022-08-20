class Request {
    constructor() {
        this.json = './assets/json/products.json'
    }

    async getResponse() {
        try {
            const response = await fetch(this.json)
        const data = await response.json()
        let products = data.items
        products = products.map(product => {
            const {
                title,
                type,
                price
            } = product.fields
            
            const {isFavorite} = product.favorite

           const image = product.fields.image.fields.file.url

            const {
                id
            } = product.sys
            
            return {
                id,
                title,
                type,
                price,
                isFavorite,
                image
            }
        })
        return products
        } catch (error) {
            console.log(error)
        }
    }
}