import normal from './normal.js'

/**
 * Retorna a representação por extenso de um número seguida da string " por cento".
 *
 * @param numero O número a ser convertido para extenso.
 * @returns A representação por extenso do número seguido de " por cento".
 */
export default function porExtenso(numero: number): string {
  return normal(numero) + ' por cento'
}
