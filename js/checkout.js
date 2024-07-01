const ulCheckout = document.querySelector('.checkout__lista');
const precoTotalTexto = document.querySelector('#preco_total')
const linhaCheckout = document.querySelector('.checkout__linha-main');
const compraCheckout = document.querySelector('.checkout__compra');

let produtos = JSON.parse(localStorage.getItem('cart')) || [];
let precoTotalCheckout = 0;

precoTotalTexto.innerHTML = precoTotalCheckout;

loadCart();

if (produtos == false){
    linhaCheckout.classList.add('hidden');
    compraCheckout.classList.add('hidden');

    ulCheckout.innerHTML = `<div class="checkout__vazio">
                                <h1>Parece que você não adicionou nenhum item ao seu carrinho,<br>deseja voltar à pagina de produtos?</h1>
                                <a href="home.html">Retornar</a>
                            </div>`
}

function produtoCheckout(id) {
    const precoTotal = (id.product.price) * (id.quantity);
    precoTotalCheckout += precoTotal;
    precoTotalTexto.innerHTML = "R$ " + precoTotalCheckout.toFixed(2).toString().replace('.', ',');

    const produto = document.createElement('section');
    produto.classList.add('checkout__disco');
    produto.innerHTML = `
                <section class="checkout__disco-conteudo">

                    <div class="checkout__disco-conteudo--principal">
                        <img src="${id.product.img}" alt="${id.product.name}">
                        <div>
                            <h2 class="checkout__disco-nome">${id.product.name}</h2>
                            <button onclick="apagarItemCheckout(${id.product.id})"><img src="./images/trash.svg" alt="Lixeiro de compras" class="checkout__trash" ></button>
                        </div>
                    </div>

                    <div class="checkout__preco">
                        <s>R$ ${(id.product.lastPrice).toString().replace('.', ',')}</s>
                        <p class="checkout__preco-desconto">R$ ${(id.product.price).toString().replace('.', ',')}</p>
                    </div>
                    
                    <div class="checkout__quantidade">
                        <div class="checkout__quantidade-botao">
                            <button onclick="quantidadeProdutoCheckout(${id.product.id}, -1)"><img src="./images/menos.svg"></button>
                            <p>${id.quantity}</p>
                            <button onclick="quantidadeProdutoCheckout(${id.product.id}, 1)"><img src="./images/mais.svg"></button>
                        </div>
                        <h3 class="checkout__preco-total--disco">R$ ${(precoTotal).toFixed(2).toString().replace('.', ',')}</h3>
                    </div>

                </section>

                <hr class="checkout__linha">
                `;
    return produto;
};

produtos.forEach(produto => {
    const elementoProduto = produtoCheckout(produto);
    ulCheckout.append(elementoProduto);
});

function quantidadeProdutoCheckout(id, num) {
    const item = produtos.find(item => item.product.id === id);
    if (item) {
        item.quantity += num;

        if (item.quantity <= 0){
            produtos = produtos.filter(item => item.product.id !== id);
        }
        localStorage.setItem('cart', JSON.stringify(produtos));
    }

    precoTotalCheckout = 0;
    ulCheckout.innerHTML = ''
    if (produtos == false){
        linhaCheckout.classList.add('hidden');
        compraCheckout.classList.add('hidden');

        ulCheckout.innerHTML = `<div class="checkout__vazio">
                                <h1>Parece que você não adicionou nenhum item ao seu carrinho,<br>deseja voltar à pagina de produtos?</h1>
                                <a href="home.html">Retornar</a>
                            </div>`
    }else{
        ulCheckout.innerHTML = ''
        produtos.forEach(produto => {
            const elementoProduto = produtoCheckout(produto);
            ulCheckout.append(elementoProduto);
        });
    } 
}

function apagarItemCheckout(id) {
    const item = produtos.find(item => item.product.id === id);
    if(item) {
        produtos = produtos.filter(item => item.product.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(produtos));

    precoTotalCheckout = 0;
    precoTotalTexto.innerHTML = ''
    ulCheckout.innerHTML = ''
    if (produtos == false){
        linhaCheckout.classList.add('hidden');
        compraCheckout.classList.add('hidden');

        ulCheckout.innerHTML = `<div class="checkout__vazio">
                                <h1>Parece que você não adicionou nenhum item ao seu carrinho,<br>deseja voltar à pagina de produtos?</h1>
                                <a href="home.html">Retornar</a>
                            </div>`
    }else{
        ulCheckout.innerHTML = ''
        produtos.forEach(produto => {
            const elementoProduto = produtoCheckout(produto);
            ulCheckout.append(elementoProduto);
        });
    }
}
