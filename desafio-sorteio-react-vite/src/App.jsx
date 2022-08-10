import { useState } from "react";

export default function App() {
  const [valorDigitado, setValorDigitado] = useState(0);
  const [valorUltimo, setValorUltimo] = useState(0);
  const [valorApi, setValorApi] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [travado, setTravado] = useState(false);
  const [cssAcertoErro, setCssAcertoErro] = useState("");

  const url =
    "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";

  const recomecarPartida = (event) => {
    event.preventDefault();
    setTravado(false);
    setCssAcertoErro("text-black");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setValorApi(data.value));
        // .then((data) => setValorApi(0));

      if (valorDigitado < valorApi) {
        setMensagem("Menor");
      } else if (valorDigitado > valorApi) {
        setMensagem("Maior");
      } else if (valorDigitado == valorApi) {
        setMensagem("Você acertou");
        setCssAcertoErro("text-success");
        setTravado(true);
      }
      setValorUltimo(valorDigitado);
      setValorDigitado(0);
    } catch {
      setMensagem("Erro");
      setCssAcertoErro("text-danger");
      setTravado(true);
      console.log(`Erro 502, Ocorreu um imprevisto`);
    }

    console.clear();
    console.log(`valor digitado: ${valorDigitado}`);
    console.log(`valor valor sorteio: ${valorApi}`);
    console.log(`mensagem que caiu: ${mensagem}`);
  };

  return (
    <>
      <div className="w-[350px] mx-auto flex h-screen justify-center items-center ">
        <div className="text-center">
          <h1 className="uppercase text-primary font-bold text-2xl my-14 ">
            Qual é o número?
          </h1>
          <div className={`text-center ${cssAcertoErro}`}>
            <p className="text-primary font-bold text-xl  ">
              <b className={cssAcertoErro}>{mensagem}</b>
            </p>
            <span className="text-9xl">{valorUltimo} </span>
          </div>

          <div
            className={
              !travado
                ? "invisible"
                : " flex text-center justify-center align-center "
            }
          >
            <button
              type="submit"
              onClick={recomecarPartida}
              className=" bg-gradient-to-b from-[#434854] to-[#C7C6C6] px-4 rounded text-white p-2 my-10 flex "
            >
              <img src="/icone.svg" /> NOVA PARTIDA
            </button>
          </div>
          <form className="flex my-5 " onSubmit={onSubmit}>
            <input
              type="number"
              placeholder="Digite o seu palpite"
              value={valorDigitado}
              disabled={travado}
              min={0}
              max={300}
              onChange={(event) => setValorDigitado(event.target.value)}
              className={`form border border-[#CFCFCF] rounded placeholder: p-2 mr-2
                focus:outline-none focus:border-primary focus:ring-1-primary focus:primary
                flex-1
                ${travado ? "disabled:opacity-80  bg-[#CFCFCF]" : ""}

                `}
            />

            <button
              type="submit"
              disabled={travado}
              className={`
                px-4 rounded text-white
                ${travado ? "  bg-[#CFCFCF]" : "bg-primary "}
                `}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
