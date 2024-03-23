
/**
 * Obtener la edad a partir de una fecha de nacimineto
 * @param birthday string
 * @returns number
 */
export const getAge = (birthday:string) : number => {
  const today = new Date()
  const birthDate = new Date(birthday)
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const month = today.getUTCMonth() - birthDate.getUTCMonth()
  if (month < 0 || (month === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--
  }
  return age
}