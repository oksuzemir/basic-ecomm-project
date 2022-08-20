class UI {
    constructor() {
        this.toggleButton = document.querySelector('.topnav__hamburger-icon')
        this.closeMenu = document.querySelector('.fa-times')
        this.mobileMenu = document.querySelector('.topnav__mobile-menu')
        this.image = document.querySelector('.banner__image')
        this.bannerHeader = document.querySelector('.banner__paragraph-header')
        this.bannerParagraph = document.querySelector('.banner__paragraph-description')
        this.footerButton = document.querySelectorAll('.footer__list-header')
        this.footerWrapper = document.querySelector('.footer__grid-item')
        this.filterCategoryBtn = document.querySelector('.button__mobile-filter-menu')
        this.buttonsWrapper = document.querySelector('.button__category-filter')
        this.filterPriceBtn = document.querySelector('.button__price-filter-btn')
        this.priceFilterList = document.querySelectorAll('.button__price-filter-card ul')
        this.priceFilterListItem = document.querySelector('.button__price-filter-card')
        this.cartCloseBtn = document.querySelector('.cart__close-btn')
        this.cartContainer = document.querySelector('.cart-container')
        this.openCart = document.querySelector('.topnav__cart-section')
        this.asideOverlay = document.querySelector('.cart-aside')
        this.productOverlay = document.querySelector('#product-overlay')
        this.closeProductOverlay = document.querySelector('.product__overlay-close')
        this.productOverlayBG = document.querySelector('.product-overlay-bg')
        this.overlayWrapper = document.querySelector('.overlay-wrapper')
        this.openProductOverlayBtn = document.querySelector('.card__open-overlay')
        this.cardRow = document.querySelector('.card-row')
        this.cartWrapper = document.querySelector('.cart__wrapper')
        this.cartPrice = document.getElementById('total-amount')
        this.navCartPrice = document.querySelector('.topnav__cart-total-amount')
        this.favoriteQuantity = document.querySelector('.topnav__favorites-amount')
        this.favoriteWrapper = document.querySelector('.favorite__wrapper')
        this.topnavFavorites = document.querySelector('.topnav__favorites-section')
        this.favoriteContainer = document.querySelector('.favorite-container')
        this.favoriteOverlay = document.querySelector('.favorite-aside-overlay')
        this.closeFavoritesBtn = document.querySelector('.favorite__close-btn')
        this.deleteAllCart = document.querySelector('.cart__delete-all-btn button')
        this.deleteAllFavorite = document.querySelector('.favorite__delete-all-btn button')
        this.topnavFavoritesAmount = document.querySelector('.topnav__favorites-amount')
        this.cartList = []
        this.favoriteList = []
    }

    openFavorites() {
        this.favoriteContainer.classList.add('isactivee')
        this.favoriteOverlay.classList.add('isactivee')
    }

    closeFavorites() {
        this.favoriteContainer.classList.remove('isactivee')
        this.favoriteOverlay.classList.remove('isactivee')
    }

    closeFromOverlay() {
        this.favoriteContainer.classList.remove('isactivee')
        this.favoriteOverlay.classList.remove('isactivee')
    }

    goTopBtn() {
        const backDiv = document.getElementById('go-back')
        let scroll = this.scrollY;
        if (scroll >= 726) {
            backDiv.style.opacity = "1"
        } else {
            backDiv.style.opacity = "0"
        }
    }

    showFooter(e) {
        let target = e.target.nextElementSibling
        if (target && target.classList && target.classList.contains('footer__list') && innerWidth <= 450) {
            target.classList.toggle('visible')
        }
    }

    showMobileMenu() {
        this.mobileMenu.classList.toggle('active-mobil-menu')
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active-mobil-menu')
    }

    toggleFilterPriceMenu() {
        if (innerWidth < 800) {
            this.priceFilterList.forEach(list => {
                list.classList.toggle('isactive')
            })
        }
    }

    toggleFilterCategoryMenu(e) {
        let target = e.target.classList
        if (innerWidth < 800) {
            if (target && target.contains('fas') || e.target.nextElementSibling.classList.toggle('isactive')) {
                e.target.parentElement.nextElementSibling.classList.toggle('isactive')
            }
        }
    }

    openCartAside() {
        this.cartContainer.classList.add('isactive')
        this.asideOverlay.classList.add('isactive')
    }

    closeCartAside() {
        this.cartContainer.classList.remove('isactive')
        this.asideOverlay.classList.remove('isactive')
    }

    openOverlay() {
        this.productOverlay.classList.add('isactivated')
        document.body.style.overflow = "hidden"
    }

    closeOverlay() {
        this.productOverlay.classList.remove('isactivated')
        document.body.style.overflow = "visible"
    }

    addProductToUI(product) {
        let inCart = Storage.getCartFromStorage()
        this.cartList = inCart
        let inFavorite = Storage.getFavoriteFromStorage()
        this.favoriteList = inFavorite
        let findInCartElement = inCart.map(item => item.id)
        let findInFavoriteElement = inFavorite.map(item => item.id)
        if (product) {
            let card = product.map(product => {
                return `
            <div class="card__col">
                                <div class="card__image">
                                    <img src="${product.image}" loading="lazy" alt="">
                                    <div class="card__image-add-favorite">
                                        <p class="card__open-overlay"  data-id="${product.id}">QUICK LOOK</p>
                                        <span class="${findInFavoriteElement.indexOf(product.id) === -1 ? "card__favorite-btn" : "card__favorite-btn isfavorite"}" data-id="${product.id}"><i style="pointer-events: none;"
                                                class="fas fa-heart" data-id=""></i></span>
                                        <p class="card__add-cart"  data-id="${product.id}">${findInCartElement.indexOf(product.id) === -1 ? "ADD CART" : "IN CART"}</p>
                                    </div>
                                </div>
                                <div class="card__info">
                                    <h5 class="card__description">${product.title}</h5>
                                    <em class="card__price">$${product.price}</em>
                                </div>
                            </div>
            `
            }).join(' ')
            this.cardRow.innerHTML = card
        }
    }

    addProductCategories(category) {
        const categories = category.map(item => item.type).reduce((acc, curr) => {
            if (acc.indexOf(curr) === -1) acc.push(curr)
            return acc
        }, ["all"])
        const categoriesList = document.createElement('ul')
        categoriesList.className = "button__favorite-menu"
        categories.map(item => {
            categoriesList.innerHTML += `
    <li class="button__favorite-menu-item" data-category="${item}">${item}</li>
    `
        })
        this.buttonsWrapper.appendChild(categoriesList)
    }

    filterCategory(product) {
        this.buttonsWrapper.addEventListener('click', (e) => {
            const target = e.target.dataset.category
            Array.from(this.buttonsWrapper.lastElementChild.children).forEach(item => {
                item.classList.remove('active')
            })
            e.target.classList.add('active')
            const products = product.filter(item => {
                if (!target) {
                    return item
                } else {
                    return target.indexOf(item.type) != -1
                }
            })
            if (target === 'all') {
                this.addProductToUI(product)
            } else {
                this.addProductToUI(products)
            }
        })
    }

    filterPrice(product) {
        this.priceFilterListItem.addEventListener('click', (e) => {
            if (e.target.dataset.min || e.target.dataset.max) {
                const products = product.filter(item => {
                    if (parseFloat(e.target.dataset.min) < item.price && parseFloat(e.target.dataset.max) > item.price) {
                        return item
                    }
                })
                this.addProductToUI(products)
            } else if (e.target.textContent === 'All') {
                this.addProductToUI(product)
            } else if (e.target.dataset.order === 'low') {
                let lowToHigh = product.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                this.addProductToUI(lowToHigh)
            } else if (e.target.dataset.order === 'high') {
                let highToLow = product.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                this.addProductToUI(highToLow)
            }
        })
    }

    addCart(e) {
        let availableCart = Storage.getCartFromStorage()
        let checkCart = availableCart.find(item => item.id == e.target.dataset.id)
        if (e.target.classList.contains('card__add-cart') && checkCart === undefined) {
            const product = {
                id: e.target.dataset.id,
                title: e.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent,
                price: parseFloat(e.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent.substring(1)),
                amount: 1,
                image: e.target.parentElement.previousElementSibling.src,
            }
            this.cartList.push(product)
            e.target.textContent = "IN CART"
            Storage.addCartToStorage(this.cartList)
            this.productShowOnCart()
            this.calculateTotalPrice()
            this.openCartAside()
        } else {
            return
        }
    }

    addFavorite(e) {
        let availableCart = Storage.getFavoriteFromStorage()
        let checkCart = availableCart.find(item => item.id == e.target.dataset.id)
        if (e.target.classList.contains('card__favorite-btn') && checkCart === undefined) {
            const product = {
                id: e.target.dataset.id,
                title: e.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent,
                price: Number(e.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent.substring(1)),
                image: e.target.parentElement.previousElementSibling.src,
            }
            this.favoriteList.push(product)
            Storage.addFavoriteToStorage(this.favoriteList)
            this.addFavoritesToAside()
            e.target.classList.add('isfavorite')
            this.openFavorites()
        } else if (e.target.classList.contains('isfavorite')) {
            this.deleteFavorite(e)
        } else {
            return
        }
    }

    addFavoritesToAside() {
        let availableFavorites = Storage.getFavoriteFromStorage()
        this.favoriteQuantity.innerHTML = "(" + availableFavorites.length + ")"
        let favoriteHTML = availableFavorites.map(product => {
            return `
            <div class="favorite__card d-flex-space">
                        <div class="favorite__card-image">
                            <img src="${product.image}" alt="product">
                        </div>
                        <div class="favorite__card-information">
                            <h6 class="favorite__card-title">${product.title}</h6>
                            <em class="favorite__card-price">$${product.price}</em>
                            <p class="favorite__remove-card" data-id="${product.id}">Remove From Favorite</p>
                        </div>
                    </div>
            `
        }).join(' ')
        this.favoriteWrapper.innerHTML = favoriteHTML
    }

    openProductOverlay(e) {
        let target = e.target.classList
        if (target.contains('card__open-overlay')) {
            this.overlayWrapper.innerHTML = `
        <div class="product d-flex-column">
                        <h4 class="product__info">PRODUCT INFO</h4>
                        <div class="product__overlay-close"><i class="fas fa-times"></i></div>
                        <div class="product__overlay-image">
                            <img src="${e.target.parentElement.previousElementSibling.src}" alt="product-details">
                        </div>
                        <div class="product__details d-flex-column">
                            <div class="product__details-title">
                                <h4>${e.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent}</h4>
                            </div>
                            <div class="product__details-price"><em>${e.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent}</em></div>
                            <div class="product__details-description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, a!</p>
                            </div>
                            <div class="product__overlay-add-favorite-and-cart">
                                <div class="product__add-favorite d-flex">
                                    <i class="far fa-heart" data-id="${e.target.dataset.id}"></i>
                                    <p class="product__overlay-add-favorite" data-id="${e.target.dataset.id}">ADD TO WISHLIST</p>
                                </div>
                                <div class="produt__add-cart d-flex">
                                    <i class="fas fa-cart-plus" data-id="${e.target.dataset.id}"></i>
                                    <p class="product__overlay-add-cart" data-id="${e.target.dataset.id}">ADD TO CART</p>
                                </div>
                            </div>
                        </div>
                    </div>
        `
            this.openOverlay()
        }
    }

    toggleProductOverlay(e) {
        let target = e.target.classList
        if (target.contains('product__overlay-close') || target.contains('fa-times')) {
            this.closeOverlay()
        }
    }

    productShowOnCart() {
        let product = Storage.getCartFromStorage()
        let productHTML = product.map(item => {
            return `
            <div class="cart__card">
                        <div class="cart__card-image">
                            <img src="${item.image}" alt="product">
                        </div>
                        <div class="cart__card-information">
                            <h6 class="cart__card-title">${item.title}</h6>
                            <em class="cart__card-price">$${item.price}</em>
                            <p class="cart__remove-card" data-id="${item.id}">Remove Product</p>
                        </div>
                    </div>
            `
        }).join(' ')
        this.cartWrapper.innerHTML = productHTML
    }

    calculateTotalPrice() {
        let cartProduct = Storage.getCartFromStorage()
        let totalCartPrice = cartProduct.reduce((acc, curr) => {
            return acc + curr.price * curr.amount
        }, 0)
        this.navCartPrice.textContent = "(" + "$" + totalCartPrice.toFixed() + ")"
        this.cartPrice.textContent = "$" + totalCartPrice.toFixed()
    }

    removeCartProducts() {
        while (this.cartWrapper.firstElementChild !== null) {
            this.cartWrapper.firstElementChild.remove()
        }
        localStorage.removeItem('cartProduct')
        this.navCartPrice.textContent = "(" + "$" + 0 + ")"
        this.cartPrice.textContent = "$" + 0
        this.addProductToUI()
    }

    removeFavoriteProducts() {
        while (this.favoriteWrapper.firstElementChild !== null) {
            this.favoriteWrapper.firstElementChild.remove()
        }
        localStorage.removeItem('favoriteProduct')
        this.topnavFavoritesAmount.textContent = "(" + 0 + ")"
        this.addProductToUI()
    }

    deleteProduct(e) {
        let cart = Storage.getCartFromStorage()
        this.cartList = cart.filter(item => item.id !== e.target.dataset.id)
        if (e.target.classList.contains('cart__remove-card') && this.cartList.length !== 0) {
            this.cartList.forEach(item => {
                Storage.addCartToStorage(this.cartList)
                this.productShowOnCart()
                this.calculateTotalPrice()
            })
        } else if (e.target.classList.contains('cart__remove-card') && this.cartList.length === 0) {
            localStorage.removeItem('cartProduct')
            this.productShowOnCart()
            this.navCartPrice.textContent = "(" + "$" + 0 + ")"
            this.cartPrice.textContent = "$" + 0
        }
    }

    deleteFavorite(e) {
        let favorites = Storage.getFavoriteFromStorage()
        this.favoriteList = favorites.filter(item => item.id !== e.target.dataset.id)
        if (e.target.classList.contains('favorite__remove-card') && this.favoriteList.length !== 0) {
            this.favoriteList.forEach(item => {
                Storage.addFavoriteToStorage(this.favoriteList)
            })
            this.addFavoritesToAside(this.favoriteList)
        } else if (e.target.classList.contains('favorite__remove-card') && this.favoriteList.length === 0) {
            localStorage.removeItem('favoriteProduct')
            this.addFavoritesToAside(this.favoriteList)
        }
    }

    addCartOnOverlay(e) {
        let classTarget = e.target.classList;
        let availableCart = Storage.getCartFromStorage()
        let checkCart = availableCart.find(item => item.id === e.target.dataset.id)
        if (checkCart === undefined && classTarget.contains('product__overlay-add-cart') || classTarget.contains('fa-cart-plus')) {
            const product = {
                id: e.target.dataset.id,
                title: e.target.parentElement.parentElement.parentElement.firstElementChild.textContent.trim(),
                price: Number(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent.substring(1)),
                image: e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.src,
                amount: 1,
            }
            console.log(product);
            this.cartList.push(product)
            Storage.addCartToStorage(this.cartList)
            this.calculateTotalPrice()
            this.productShowOnCart()
        }
    }

    addFavoriteOnOverlay(e) {
        let classTarget = e.target.classList;
        let availableCart = Storage.getFavoriteFromStorage()
        let checkCart = availableCart.find(item => item.id === e.target.dataset.id)
        if (checkCart === undefined && classTarget.contains('product__overlay-add-favorite') || classTarget.contains('fa-heart')) {
            const product = {
                id: e.target.dataset.id,
                title: e.target.parentElement.parentElement.parentElement.firstElementChild.textContent.trim(),
                price: Number(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent.substring(1)),
                image: e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.src,
            }
            this.favoriteList.push(product)
            Storage.addFavoriteToStorage(this.favoriteList)
            this.addFavoritesToAside()
        }
    }
}