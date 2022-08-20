eventListeners()

function eventListeners() {
    const uı = new UI()
    uı.productOverlayBG.addEventListener('click', () => {
        uı.closeOverlay()
    })

    const request = new Request()
    request.getResponse()
    .then(product => {
        uı.addProductToUI(product)
        uı.addProductCategories(product)
        uı.filterCategory(product)
        uı.filterPrice(product)
    })
    uı.overlayWrapper.addEventListener('click', (e) => {
        uı.toggleProductOverlay(e)
        uı.addCartOnOverlay(e)
        uı.addFavoriteOnOverlay(e)
    })
    uı.cartWrapper.addEventListener('click', (e) => {
        uı.deleteProduct(e)
    })
    uı.favoriteWrapper.addEventListener('click', (e) => {
        uı.deleteFavorite(e)
    })
    uı.deleteAllFavorite.addEventListener('click', () => {
        uı.removeFavoriteProducts()
    })
    uı.deleteAllCart.addEventListener('click', () => {
        uı.removeCartProducts()
    })
    uı.favoriteOverlay.addEventListener('click', () => {
        uı.closeFromOverlay()
    })
    uı.closeFavoritesBtn.addEventListener('click', () => {
        uı.closeFavorites()
    })
    uı.topnavFavorites.addEventListener('click', () => {
        uı.openFavorites()
    })
    uı.cardRow.addEventListener('click', (e) => {
        uı.addFavorite(e)
        uı.addCart(e)
        uı.openProductOverlay(e)
    })
    uı.cartCloseBtn.addEventListener('click', () => {
        uı.closeCartAside()
    })
    uı.asideOverlay.addEventListener('click', () => {
        uı.closeCartAside()
    })
    uı.openCart.addEventListener('click', () => {
        uı.openCartAside()
    })
    uı.filterCategoryBtn.addEventListener('click', (e) => {
        uı.toggleFilterCategoryMenu(e)
    })
    uı.filterPriceBtn.addEventListener('click', () => {
        uı.toggleFilterPriceMenu()
    })
    uı.toggleButton.addEventListener('click', () => {
        uı.showMobileMenu()
    })
    uı.closeMenu.addEventListener('click', () => {
        uı.closeMobileMenu()
    })
    uı.footerWrapper.addEventListener('click', (e) => {
        uı.showFooter(e)
    })
    window.addEventListener("scroll", () => {
        uı.goTopBtn()
    })
    window.addEventListener('DOMContentLoaded', () => {
        uı.productShowOnCart()
        uı.calculateTotalPrice()
        uı.addFavoritesToAside()
    })

}
