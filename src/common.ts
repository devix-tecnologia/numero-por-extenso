import nomes from "./nomesExtenso/nomes.js";
import dezenas from "./nomesExtenso/dezenas.js";
// import casas from "./nomesExtenso/casas";

/**
 * Retorna o grupo numérico em extenso.
 * @param number Uma string representando o número.
 * @returns Uma representação em extenso do número dado.
 */
export function getGroup(number: string): string {
  if (number == "100") return "cem";

  let output = "";
  for (let i = 0; i < number.length; i++) {
    let c = number[i];
    if (output) {
      if (c == "0") continue;
      output += " e ";
    }

    if (((number.length == 2 && i == 0) || (number.length == 3 && i == 1)) && c == "1")
      return output + dezenas[+number[i + 1]];

    output += nomes[number.length - i - 1][+c];
  }

  return output;
}

/**
 * Converte um número inteiro em sua representação por extenso.
 * @param numero O número a ser convertido.
 * @returns A representação por extenso do número.
 */
export function numberInFull(numero: number): string {
  let output: string[] = [];
  let number = numero.toString();

  // Divide o número em partes com base em grupos de três dígitos.
  while (number.length > 0) {
      let groupSize = number.length > 3 ? 3 : number.length;
      let piece = number.slice(-groupSize);  // Pega os últimos 'groupSize' dígitos
      number = number.slice(0, -groupSize);  // Remove os dígitos já processados

      // Converte o grupo atual em palavras
      let groupWords = getGroup(piece);
      if (groupWords) {
          output.unshift(groupWords);  // Adiciona ao início do array para manter a ordem correta
      }
  }

  // Junta todas as partes processadas, adicionando 'e' conforme necessário.
  return output.join(" ");
}

