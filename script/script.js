class PedidoDTO {
    constructor(cliente, telefone, doce, bebida, preco) {
        this.cliente = cliente;
        this.telefone = telefone;
        this.doce = doce;
        this.bebida = bebida;
        this.preco = preco;
    }

    validar() {
        if (!this.cliente) throw new Error("Nome obrigatório");
        if (!this.telefone) throw new Error("Telefone obrigatório");
        if (!this.doce) throw new Error("Doce obrigatório");
        if (!this.bebida) throw new Error("Bebida obrigatória");
        if (isNaN(this.preco) || this.preco <= 0) throw new Error("Preço inválido");
        return true;
    }
}

let pedidos = [];

const precosDoces = {
    "Brigadeiro": 4,
    "Bolo de Cenoura": 10,
    "Bolo de Laranja": 8,
    "Palha Italiana": 15,
    "Copo da Felicidade": 16
};

const precosBebidas = {
    "Refrigerante": 6,
    "Suco": 8,
    "Café": 4
};


function calcularPreco() {
    const doce = document.getElementById("doce").value;
    const bebida = document.getElementById("bebida").value;

    const preco =
        (precosDoces[doce] || 0) +
        (precosBebidas[bebida] || 0);

    document.getElementById("preco").value = preco || "";
}

document.getElementById("doce").addEventListener("change", calcularPreco);
document.getElementById("bebida").addEventListener("change", calcularPreco);

function adicionarPedido() {
    try {
        const cliente = document.getElementById("cliente").value;
        const telefone = document.getElementById("telefone").value;
        const doce = document.getElementById("doce").value;
        const bebida = document.getElementById("bebida").value;
        const preco = parseFloat(document.getElementById("preco").value);

        const pedido = new PedidoDTO(cliente, telefone, doce, bebida, preco);
        pedido.validar();

        pedidos.push(pedido);
        atualizarLista();

        // limpar
        document.getElementById("cliente").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("doce").value = "";
        document.getElementById("bebida").value = "";
        document.getElementById("preco").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

function atualizarLista() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos.forEach(p => {
        const li = document.createElement("li");

        li.innerHTML = `
            Cliente: ${p.cliente} <br>
            Telefone: ${p.telefone} <br>
            Doce: ${p.doce} <br>
            Bebida: ${p.bebida} <br>
            Preço: R$ ${p.preco.toFixed(2)}
        `;

        lista.appendChild(li);
    });

    const total = pedidos.reduce((soma, p) => soma + p.preco, 0);

    document.getElementById("totalPedidos").innerText =
        "Total: R$ " + total.toFixed(2);
}