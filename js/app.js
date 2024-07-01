let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const loginButton = document.getElementById('login-btn');

const emailInput = document.querySelector('input[name="email"]');
const inscreverButton = document.querySelector('.footer__inscricao__inscrever');

// produtos
products = [
  { id: 1, name: 'Álbum WE DON’T TRUST YOU', lastPrice: 449.99, price: 405.99, img: './images/we dont trust you.png', description: 'Descrição do Álbum WE DON’T TRUST YOU.' },
  { id: 2, name: 'Álbum 2093', lastPrice: 449.99, price: 405.99, img: './images/yeat.png', description: 'Descrição do Álbum 2093.' },
  { id: 3, name: 'Álbum GOOD KID MAAD CITY', lastPrice: 127.99, price: 127.99, img: './images/good.png', description: 'Descrição do Álbum GOOD KID MAAD CITY.' },
  { id: 4, name: 'Álbum YE', lastPrice: 127.99, price: 127.99, img: './images/ye.png', description: 'Descrição do Álbum YE.' },
  { id: 5, name: 'Álbum UTOPIA', lastPrice: 127.99, price: 127.99, img: './images/utopia.png', description: 'Descrição do Álbum UTOPIA.' },
  { id: 6, name: 'Álbum TEEN X', lastPrice: 127.99, price: 127.99, img: './images/teen x.png', description: 'Descrição do Álbum TEEN X.' },
];

// display produtos
if (listProductHTML) {
  products.forEach(product => {
    let itemHTML = `
      <div class="item c">
        <a href="products.html?id=${product.id}">
          <img src="${product.img}" alt="${product.name}">
          <h2>${product.name}</h2>
          <div class="price">R$ ${product.price.toFixed(2)}</div>
        </a>
        <button class="d" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    listProductHTML.innerHTML += itemHTML;
  });
}

// add carrinho função
function addToCart(id) {
  let product = products.find(product => product.id === id);
  let itemInCart = cart.find(item => item.product.id === id);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCart();
}

// salvar e achar quantidade
function changeQuantity(id, delta) {
  let itemInCart = cart.find(item => item.product.id === id);
  if (itemInCart) {
    itemInCart.quantity += delta;
    if (itemInCart.quantity <= 0) {
      cart = cart.filter(item => item.product.id !== id);
    }
  }
  updateCart();
}

// Update carrinho
function updateCart() {
  listCartHTML.innerHTML = '';
  cart.forEach(item => {
    let itemHTML = `
      <div class="item">
        <img src="${item.product.img}" alt="${item.product.name}">
        <div>${item.product.name}</div>
        <div class="quantity">
          <span onclick="changeQuantity(${item.product.id}, -1)">-</span>
          <span>${item.quantity}</span>
          <span onclick="changeQuantity(${item.product.id}, 1)">+</span>
        </div>
        <div>R$ ${(item.product.price * item.quantity).toFixed(2)}</div>
      </div>
    `;
    listCartHTML.innerHTML += itemHTML;
  });
  iconCartSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Salva o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Event listeners
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
  body.classList.remove('showCart');
});

inscreverButton.addEventListener('click', (e) => {
  e.preventDefault();
  emailInput.value = '';
});

// Chama a função de carregar o carrinho quando a página for carregada
// Carregar o carrinho do localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

document.addEventListener('DOMContentLoaded', loadCart);

// Carregar detalhes do produto na página do produto
function loadProductDetails() {
  let params = new URLSearchParams(window.location.search);
  let productId = parseInt(params.get('id'));
  let product = products.find(p => p.id === productId);

  if (product) {
    document.getElementById('product-img').src = product.img;
    document.getElementById('product-img').alt = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(product.id);

    // Adicionar produtos relacionados
    displayRelatedProducts(productId);
  }
}

// Função para obter produtos aleatórios
function getRandomProducts(excludeId, count) {
  let filteredProducts = products.filter(product => product.id !== excludeId);
  let shuffled = filteredProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Função para exibir produtos relacionados /display
function displayRelatedProducts(excludeId) {
  let relatedProducts = getRandomProducts(excludeId, 3);
  let relatedListHTML = document.querySelector('.related-list');
  
  relatedProducts.forEach(product => {
    let itemHTML = `
      <div class="item c related-list2">
        <a href="products.html?id=${product.id}">
          <img src="${product.img}" alt="${product.name}">
          <h2>${product.name}</h2>
          <div class="price">R$ ${product.price.toFixed(2)}</div>
        </a>
        <button class="d" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    relatedListHTML.innerHTML += itemHTML;
  });
}

// Chama a função de carregar os detalhes do produto na página do produto
if (document.querySelector('.product-container')) {
  document.addEventListener('DOMContentLoaded', loadProductDetails);
}
