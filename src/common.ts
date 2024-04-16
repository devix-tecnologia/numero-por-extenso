import nomes from "./nomesExtenso/nomes.js";
import dezenas from "./nomesExtenso/dezenas.js";
import casas from "./nomesExtenso/casas.js";

/**
 * Retorna o grupo numérico em extenso.
 * @param number Uma string representando o número.
 * @returns Uma representação em extenso do número dado.
 */
export function getGroup(number: string): string {
  if (number === "100") return "cem";

  let output: string = "";
  for (let i = 0; i < number.length; i++) {
    const c: string = number[i];
    if (output) {
      if (c === "0") continue;
      output += " e ";
    }

    if (
      ((number.length === 2 && i === 0) || (number.length === 3 && i === 1)) &&
      c === "1"
    )
      return output + dezenas[+number[i + 1]];

    output += nomes[number.length - i - 1][+c];
  }

  return output;
}

interface NumeroParte {
  numero: number;
  nome: string;
}

/**
 * Converte um número inteiro em sua representação por extenso.
 * @param numero O número a ser convertido.
 * @returns A representação por extenso do número.
 */

export function numberInFull(numero: number): string {
  let output: string[] = [];
  let numbers: NumeroParte[] = [];
 // Responsável por dividir o número em partes menores de até três dígitos cada e em seguida,
 // para cada parte, determinar o nome correspondente em extenso usando a função getGroup 
  let number: string = numero.toString();
  while (number.length > 0) {
    let piece: string =
      number.length <= 3 ? number : number.slice(-3);
    numbers.push({ numero: +piece, nome: getGroup(piece) });
    number = number.length - 3 > 0 ? number.slice(0, -3) : "";
  }

  // Verifica se há apenas uma parte no número e se esse único número é zero. 
  // Se ambas as condições forem verdadeiras, significa que o número original é zero. 
  if (numbers.length === 1 && numbers[0].numero === 0) return numbers[0].nome;

  // Esta parte do código adiciona ao array output os nomes das partes do número que não são zero, 
  // juntamente com os nomes das casas correspondentes, formatados adequadamente. 
  for (let i = numbers.length - 1; i > 0; i--) {
    if (numbers[i].numero !== 0) {
      output.push(
        numbers[i].nome +
          " " +
          (numbers[i].numero === 1 ? casas[i].replace("ões", "ão") : casas[i])
      );
    }
  }
  // Essa parte do código trata de adicionar a parte do número correspondente à casa mais significativa (à esquerda) 
  // ao array output, considerando os casos especiais onde a palavra "e" precisa ser adicionada antes dessa parte do número.
  if (numbers.length && numbers[0].numero > 0) {
    output.push(
      `${
        numbers.length > 1 &&
        (numbers[0].numero < 100 || numbers[0].numero % 100 === 0)
          ? "e "
          : ""
      }${numbers[0].nome}`
    );
  } else if (output.length > 1) {
    output.splice(output.length - 1, 0, "e");
  }

  return output.join(" ");
}

