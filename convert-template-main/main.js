// Cotacao de moedas do dia
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

// Variables
// Obtendo os elementos do formulario

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber os numeros
amount.addEventListener("input", () => {
  const hashCharacthersRegex = /\D+/g;
  amount.value = amount.value.replace(hashCharacthersRegex, "");
});

// Capturando o evento de submit(enviar) do formulario
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// funcao para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotacao da moeda
    description.textContent = `${symbol}1 = ${price}`;

    let total = String(amount * price);
    total = formatCurrencyBRL(total).replace("R$", "");

    if(isNaN(total)){
      return alert("Por favor, digite o valor corretamente para converter.")
    }

    // Exibindo o resultado total
    result.textContent = `${total} Reais`;
    //  Aplica a classe que exibe o footer mostrando o resultado
    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    //  Removendo o footer ocultando ele
    footer.classList.remove("show-result");
    alert("Nao foi possivel converter.tente novamente mais tarde!");
  }
}

// formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
  // Converte o numero para utilizar o tolocalString para formatar o padrao BRL.
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",  
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
  });
}
