"use client";

import { useState } from "react";

function Dado({ valor }) {
  return (
    <img
      src={`/dados/dado${valor}.png`}
      alt={`Dado mostrando ${valor}`}
      width={80}
      height={80}
    />
  );
}

export default function Page() {
  const [rodada, setRodada] = useState(1);

  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);

  const [jogadorAtual, setJogadorAtual] = useState(1);

  const [resultado, setResultado] = useState("");

  const [vitorias1, setVitorias1] = useState(0);
  const [vitorias2, setVitorias2] = useState(0);
  const [empates, setEmpates] = useState(0);

  const [fimDeJogo, setFimDeJogo] = useState(false);

  function sortearDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    setDadosJogador1([dado1, dado2]);

    setJogadorAtual(2);
    setResultado("");
  }

  function jogarJogador2() {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    setDadosJogador2([dado1, dado2]);

    const soma1 = dadosJogador1[0] + dadosJogador1[1];
    const soma2 = dado1 + dado2;

    let novoResultado = "";

    if (soma1 > soma2) {
      novoResultado = "Jogador 1 venceu";
      setVitorias1(vitorias1 + 1);
    } else if (soma2 > soma1) {
      novoResultado = "Jogador 2 venceu";
      setVitorias2(vitorias2 + 1);
    } else {
      novoResultado = "Empate";
      setEmpates(empates + 1);
    }

    setResultado(novoResultado);

    if (rodada === 5) {
      setFimDeJogo(true);
      return;
    }

    setTimeout(() => {
      setRodada(rodada + 1);
      setJogadorAtual(1);
      setResultado("");
    }, 1000);
  }

  function jogarNovamente() {
    setRodada(1);

    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);

    setJogadorAtual(1);

    setResultado("");

    setVitorias1(0);
    setVitorias2(0);
    setEmpates(0);

    setFimDeJogo(false);
  }

  function resultadoFinal() {
    const totalVitorias1 =
      vitorias1 + (resultado === "Jogador 1 venceu" ? 1 : 0);

    const totalVitorias2 =
      vitorias2 + (resultado === "Jogador 2 venceu" ? 1 : 0);

    if (totalVitorias1 > totalVitorias2) {
      return "Jogador 1 venceu o jogo";
    }

    if (totalVitorias2 > totalVitorias1) {
      return "Jogador 2 venceu o jogo";
    }

    return "Empate geral";
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "700px",
          maxWidth: "100%",
          backgroundColor: "white",
          border: "2px solid #222",
          borderRadius: "15px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Jogo de Dados</h1>

        <h2 style={{ marginBottom: "30px" }}>
          Rodada {rodada} / 5
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
          {/* JOGADOR 1 */}
          <div style={{ flex: 1 }}>
            <h2>Jogador 1</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "20px 0",
              }}
            >
              <Dado valor={dadosJogador1[0]} />
              <Dado valor={dadosJogador1[1]} />
            </div>

            <p>
              Soma: <strong>{dadosJogador1[0] + dadosJogador1[1]}</strong>
            </p>

            <button
              onClick={jogarJogador1}
              disabled={jogadorAtual !== 1 || fimDeJogo}
              style={{
                padding: "12px 30px",
                fontSize: "16px",
                cursor:
                  jogadorAtual === 1 && !fimDeJogo
                    ? "pointer"
                    : "not-allowed",
                opacity: jogadorAtual === 1 && !fimDeJogo ? 1 : 0.5,
              }}
            >
              Jogar
            </button>
          </div>

          {/* JOGADOR 2 */}
          <div style={{ flex: 1 }}>
            <h2>Jogador 2</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "20px 0",
              }}
            >
              <Dado valor={dadosJogador2[0]} />
              <Dado valor={dadosJogador2[1]} />
            </div>

            <p>
              Soma: <strong>{dadosJogador2[0] + dadosJogador2[1]}</strong>
            </p>

            <button
              onClick={jogarJogador2}
              disabled={jogadorAtual !== 2 || fimDeJogo}
              style={{
                padding: "12px 30px",
                fontSize: "16px",
                cursor:
                  jogadorAtual === 2 && !fimDeJogo
                    ? "pointer"
                    : "not-allowed",
                opacity: jogadorAtual === 2 && !fimDeJogo ? 1 : 0.5,
              }}
            >
              Jogar
            </button>
          </div>
        </div>

        {/* RESULTADO DA RODADA */}
        {resultado && !fimDeJogo && (
          <div
            style={{
              border: "1px solid #222",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {resultado}
          </div>
        )}

        {/* PLACAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          <p>
            Jogador 1: <strong>{vitorias1}</strong>
          </p>

          <p>
            Empates: <strong>{empates}</strong>
          </p>

          <p>
            Jogador 2: <strong>{vitorias2}</strong>
          </p>
        </div>

        {/* FINAL */}
        {fimDeJogo && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "2px solid #222",
              borderRadius: "10px",
            }}
          >
            <h2>{resultado}</h2>

            <h3>{resultadoFinal()}</h3>

            <p>
              Jogador 1: {vitorias1} vitória(s)
            </p>

            <p>
              Jogador 2: {vitorias2} vitória(s)
            </p>

            <p>
              Empates: {empates}
            </p>

            <button
              onClick={jogarNovamente}
              style={{
                marginTop: "15px",
                padding: "12px 30px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
