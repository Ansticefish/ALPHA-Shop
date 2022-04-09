import './scss/main.scss'

const stepOne = document.querySelector('.step-one')
const stepTwo = document.querySelector('.step-two')
const stepThree = document.querySelector('.step-three')
const formWrapper = document.querySelector('.form-wrapper')
const buttonPrevious = document.querySelector('.previous')
const buttonNext = document.querySelector('.next')
const buttonSubmit = document.querySelector('.submit')
const productsBought = document.querySelector('.products')
const fee = document.querySelector('.fee-price')
const total = document.querySelector('.total-price')


const model = {
  productList : [
    {
      id: 1,
      name: "破壞補丁修身牛仔褲",
      image: "src/images/product_one.png",
      amount: 1,
      priceRendered: "$3,999",
      price: 3999,
    },
    {
      id: 2,
      name: "刷色直筒牛仔褲",
      image: "src/images/product_two.png",
      amount: 1,
      priceRendered: "$1,299",
      price: 1299,
    }
  ],
  total : {
    productsPrice : 1299 + 3999,
    fee: 0,
    priceWithFee : 1299 + 3999,
  },
  page : 1,
};
 

const view = {
  renderProducts (data) {
    data.forEach(item => {
      productsBought.innerHTML += `
        <div class="product">
            <img src="${item.image}" alt="product image">
            <div class="product-info">
              <p class="product-info-name">${item.name}</p>
              <div class="product-info-amount">
                <div class="decrease ${item.id}">
                  <img src="src/images/minus.png" alt="decrease" class="decrease ${item.id}">
                </div>
                <p class="amount">${item.amount}</p>
                <div class="increase ${item.id}">
                  <img src="src/images/plus.png" alt="increase" class="increase ${item.id}">
                </div>
              </div>
              <div class="product-info-price">${item.priceRendered}</div>
            </div>
          </div>
      `
    })
  },
  renderTotal () {
    if (model.total.fee === 0) {
      fee.innerText = "免費"
    } else {
      fee.innerText = model.total.fee
    }
  
    total.innerText = model.total.priceWithFee 
  },
}


const controller = {
  setSite () {
    view.renderProducts(model.productList)
    view.renderTotal(model.total)
    utility.addCartListener()
    utility.addButtonListener()
    utility.addRadioEvent()
    controller.renderForm(model.page)
  },

  renderForm (number) {
    switch (number) {
      case 1:
        stepOne.classList = 'step-one active'
        stepTwo.classList = 'step-two'
        stepThree.classList = 'step-three'
        formWrapper.classList = 'form-wrapper page-one'
        break;
      case 2: 
        stepOne.classList = 'step-one active done'
        stepTwo.classList = 'step-two active'
        formWrapper.classList = 'form-wrapper page-two'
        break;
      case 3:
        stepOne.classList = 'step-one active done'
        stepTwo.classList = 'step-two active done'
        stepThree.classList = 'step-three active'
        formWrapper.classList = 'form-wrapper page-three'
        break;
    }
  }
}

const utility = {
  addButtonListener () {
    buttonPrevious.addEventListener('click', () => {
      model.page -= 1
      controller.renderForm(model.page)
    })

    buttonNext.addEventListener('click', () => {
      model.page += 1
      controller.renderForm(model.page)
    })

    buttonSubmit.addEventListener('click', () => {
      alert('已經收到您的訂單，將盡快為您出貨！')
      stepThree.classList = 'step-three active done'
      model.page = 1
      controller.renderForm(model.page)
    })
  },

  addCartListener () {
    productsBought.addEventListener('click', (event) => {
      const target = event.target
      const id = Number(target.classList[1])
      const selectedProduct = model.productList[id - 1]

      if (target.classList.contains('increase')) {
        // update data
        selectedProduct.amount += 1
        model.total.productsPrice += selectedProduct.price
        model.total.priceWithFee += selectedProduct.price

        // render updated data
        if (target.tagName === "DIV") {
          target.previousElementSibling.innerText = selectedProduct.amount
        } else {
          target.parentElement.previousElementSibling.innerText = selectedProduct.amount
        }
      }

      if (target.classList.contains('decrease')) {

        if (selectedProduct.amount === 0) return

        // update data
        selectedProduct.amount -= 1
        model.total.productsPrice -= selectedProduct.price
        model.total.priceWithFee -= selectedProduct.price

        // render updated data
        if (target.tagName === "DIV") {
          target.nextElementSibling.innerText = selectedProduct.amount
        } else {
          target.parentElement.nextElementSibling.innerText = selectedProduct.amount
        }
      }

      view.renderTotal()
    })
  },

  addRadioEvent () {
    const shipment = document.querySelector('.form2')

    shipment.addEventListener('change', (event) => {
      console.log(event.target)
      const target = event.target
      if (target.id === "shipment-way1") {
        model.total.fee = 0
        model.total.priceWithFee = model.total.productsPrice
      } else {
        model.total.fee = 500
        model.total.priceWithFee = model.total.productsPrice + 500
      }

      view.renderTotal()
    })
  },
}


controller.setSite()

const modeSwitcher = document.querySelector('#night-mode') 
modeSwitcher.addEventListener('change', (event) => {
  document.documentElement.classList.toggle('dark-mode')
})
