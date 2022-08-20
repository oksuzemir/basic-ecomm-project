class Storage {
    static addCartToStorage(product) {
        localStorage.setItem('cartProduct', JSON.stringify(product))
    }

    static getCartFromStorage() {
        return localStorage.getItem('cartProduct') ? JSON.parse(localStorage.getItem('cartProduct')) : []
    }

    static addFavoriteToStorage(product) {
        localStorage.setItem('favoriteProduct', JSON.stringify(product))
    }

    static getFavoriteFromStorage() {
        return localStorage.getItem('favoriteProduct') ? JSON.parse(localStorage.getItem('favoriteProduct')) : []
    }
}