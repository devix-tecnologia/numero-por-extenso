import { numberInFull } from "../common.js";
import casasDecimais from "../nomesExtenso/casasDecimais.js";

/**
 * Converte um número para sua representação por extenso, incluindo casas decimais nomeadas.
 * 
 * @param numero O número (como número ou string) a ser convertido para extenso.
 * @returns A representação por extenso do valor, com o nome das casas decimais.
 */
export default function porExtenso(numero: number): string {
  let numberStr = numero.toString().replace("-", "").split("."),
      numberBefore = numberStr[0] || "0",
      numberAfter = numberStr[1] || "";

  let numberBeforeExtended =
      (numero < 0 ? "menos " : "") + numberInFull(Number(numberBefore)),
      numberAfterExtended = "";

  if (parseInt(numberAfter)) {
    numberAfter = numberAfter.replace(/0+$/g, ""); // Remove trailing zeros
    numberAfterExtended = ` vírgula ${numberInFull(+numberAfter)}`;

    let casaDecimal = descobreNomeCasaDecimal(numberAfter);
    if (casaDecimal) numberAfterExtended += ` ${casaDecimal}`;
  }

  return numberBeforeExtended + numberAfterExtended;
}

/**
 * Determina o nome da casa decimal com base no número de dígitos após a vírgula.
 * 
 * @param numberAfter A parte decimal do número como string.
 * @returns O nome apropriado da casa decimal, ajustado para singular ou plural.
 */
function descobreNomeCasaDecimal(numberAfter: string): string {
  let casaDecimal : string | string[] = casasDecimais[numberAfter.length - 1] || "";

  // plural
  if (casaDecimal && parseInt(numberAfter) !== 1) {
    casaDecimal = casaDecimal.split(" ");
    casaDecimal[0] = casaDecimal[0] + "s";
    casaDecimal = casaDecimal.join(" ");
  }

  return casaDecimal;
}
