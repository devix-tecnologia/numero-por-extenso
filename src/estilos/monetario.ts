import { numberInFull } from "../common.js";

/**
 * Converte um número para sua representação por extenso em reais.
 * 
 * @param numero O número (como número ou string) a ser convertido para extenso.
 * @returns A representação por extenso do valor em reais e centavos.
 */
export default function porExtenso(numero: number): string {
  let numberStr = numero.toString().replace("-", "").split("."),
      numberBefore = parseInt(numberStr[0]) || 0,
      numberAfter = parseInt((numberStr[1] || "0") + "00".substring(0, 2));

  let numberBeforeExtended = 
      (numero < 0 ? "menos " : "") + numberInFull(numberBefore),
      numberAfterExtended = numberInFull(+numberAfter.toString());

  return (
    (numberBefore > 0
      ? numberBeforeExtended + (numberBefore == 1 ? " real" : " reais")
      : "") +
    (numberAfter > 0
      ? (numberBefore > 0 ? " e " : "") +
        numberAfterExtended +
        (numberAfter == 1 ? " centavo" : " centavos")
      : "")
  );
}
