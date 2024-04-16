import { describe, test, expect } from "vitest";
import { normal, porcentagem, monetario } from "../src/index.js";

function equal(a, b) {
  expect(a).toBe(b);
}

describe("testando estilo normal", () => {
  test("escrevendo do 0 ao 9", () => {
    [
      "zero",
      "um",
      "dois",
      "três",
      "quatro",
      "cinco",
      "seis",
      "sete",
      "oito",
      "nove",
    ].forEach((n, i) => equal(normal(i), n));
  });

  test("escrevendo do 10 ao 19", () => {
    [
      "dez",
      "onze",
      "doze",
      "treze",
      "quatorze",
      "quinze",
      "dezesseis",
      "dezessete",
      "dezoito",
      "dezenove",
    ].forEach((n, i) => equal(normal(i + 10), n));
  });

  test("escrevendo dezenas", () => {
    [
      "dez",
      "vinte",
      "trinta",
      "quarenta",
      "cinquenta",
      "sessenta",
      "setenta",
      "oitenta",
      "noventa",
    ].forEach((n, i) => equal(normal((i + 1) * 10), n));
  });

  test("escrevendo centenas", () => {
    [
      "cem",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ].forEach((n, i) => equal(normal((i + 1) * 100), n));
  });

  test("escrevendo milhares", () => {
    equal(normal(1000), "um mil");
    equal(normal(2000), "dois mil");
  });

  test("escrevendo dezenas de milhares", () => {
    equal(normal(10000), "dez mil");
    equal(normal(30000), "trinta mil");
  });

  test("escrevendo centenas de milhares", () => {
    [
      "cem",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ].forEach((n, i) => equal(normal((i + 1) * 100000), n + " mil"));
  });

  test("escrevendo números negativos", () => {
    equal(normal(-1), "menos um");
    equal(normal(-200), "menos duzentos");
    equal(normal(-0.5), "menos zero vírgula cinco décimos");
  });
});

describe("testando README.md", () => {
  test("escrevendo exemplos", () => {
    // Números inteiros
    equal(normal(128), "cento e vinte e oito");
    equal(monetario(128), "cento e vinte e oito reais");
    equal(porcentagem(128), "cento e vinte e oito por cento");

    // Números decimais
    equal(normal(10.5), "dez vírgula cinco décimos");
    equal(monetario(10.5), "dez reais e cinquenta centavos");
    equal(porcentagem(10.5), "dez vírgula cinco décimos por cento");

    // Números gigantes
    equal(
      normal(9_876_543_210),
      "nove bilhões oitocentos e setenta e seis milhões quinhentos e quarenta e três mil duzentos e dez"
    );
    equal(
      monetario(-87_654_321),
      "menos oitenta e sete milhões seiscentos e cinquenta e quatro mil trezentos e vinte e um reais"
    );
    equal(
      porcentagem(123_456.7891),
      "cento e vinte e três mil quatrocentos e cinquenta e seis vírgula sete mil oitocentos e noventa e um décimos de milésimo por cento"
    );

    // Maior número possível (type number)
    equal(
      normal(999_999_999_999_999.9),
      "novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove vírgula nove décimos"
    );

    // Maior número possível (type string)
    equal(
      normal(
        Number("999999999999999999999999999999999999999999999.99999999999999999999")
      ),
      "novecentos e noventa e nove tredecilhões novecentos e noventa e nove duodecilhões novecentos e noventa e nove undecilhões novecentos e noventa e nove decilhões novecentos e noventa e nove nonilhões novecentos e noventa e nove octilhões novecentos e noventa e nove septilhões novecentos e noventa e nove sextilhões novecentos e noventa e nove quintilhões novecentos e noventa e nove quatrilhões novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove vírgula noventa e nove quintilhões novecentos e noventa e nove quatrilhões novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove centésimos de quintilionésimo"
    );
  });
});

describe("Issue #1", () => {
  test("escrevendo 1.000.090.000,00", () => {
    equal(monetario(Number("1000090000.00")), "um bilhão e noventa mil reais");
  });
});

describe("Issue #4", () => {
  test("escrevendo percentuais com zeros a esquerda", () => {
    equal(porcentagem(3.01), "três vírgula um centésimo por cento");
    equal(porcentagem(50.05), "cinquenta vírgula cinco centésimos por cento");
    equal(porcentagem(1.049), "um vírgula quarenta e nove milésimos por cento");
  });
});
