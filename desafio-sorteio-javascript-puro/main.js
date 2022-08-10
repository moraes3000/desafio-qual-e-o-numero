// setando o valor padrão para não quebrar o layout
function onLoading() {
  document.querySelector("#mensagem").innerHTML = "&nbsp";
}

// Reativa os campos disabled
function recomecarPartida(e) {
  e.preventDefault();
  document.querySelector("#divRecomecar").style.visibility = "hidden";

  document.querySelector("#valorDigitado").disabled = false;
  document.querySelector(".btn-sorteio ").disabled = false;

  document.querySelector("#mensagem").innerHTML = "&nbsp";
  document.querySelector("#mensagem").style.color = "#ef6c00";
  document.querySelector("#ultimo-valor").style.color = "#000";
}

// função para desativar campos, ocultar e alterar cores em casos de erro e acerto do sorteio
function desativandoCampos(status, color, visibility) {
  document.querySelector("#valorDigitado").disabled = status;
  document.querySelector(".btn-sorteio ").disabled = status;

  document.querySelector("#mensagem").style.color = color;
  document.querySelector("#ultimo-valor").style.color = color;

  document.querySelector("#divRecomecar").style.visibility = visibility;
}

async function mySubmitFunction(e) {
  // prevent para não recarregar a página
  e.preventDefault();
  var valorDigitado = document.querySelector("#valorDigitado").value;
  var url =
    "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";

  // reset de cores padrão
  document.querySelector("#mensagem").style.color = "#ef6c00";
  document.querySelector("#ultimo-valor").style.color = "#000";

  //consulta a api
  await fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      return (valorApi = data.value);
      // return (valorApi = 10); //forçado acerto
    })
    .catch(function (error) {
      console.log(error);
    });

  // validação de mensagem do valor recebido pela api
  if (valorDigitado < valorApi) {
    mensagem = document.querySelector("#mensagem").innerHTML = "Menor";
  } else if (valorDigitado > valorApi) {
    mensagem = document.querySelector("#mensagem").innerHTML = "Maior";
  } else if (valorDigitado == valorApi) {
    mensagem = document.querySelector("#mensagem").innerHTML = "Você acertou";

    desativandoCampos(true, "#32bf00", "inherit");
  } else if (valorApi == 502) {
    mensagem = document.querySelector("#mensagem").innerHTML = "Erro 502";
    desativandoCampos(true, "#cc3300", "inherit");
  }

  // alteração das variáveis para visualização
  ultimoValor = document.querySelector("#ultimo-valor").innerHTML =
    valorDigitado;
  document.querySelector("#valorDigitado").value = 0;

  // console para monitorar
  console.clear();
  console.log(`valor digitado: ${valorDigitado}`);
  console.log(`valor valor sorteio: ${valorApi}`);
  console.log(`mensagem que caiu: ${mensagem}`);
}
