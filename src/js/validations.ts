export function validateEcuadorianID(id: string): boolean {
  if (!id || id.length !== 10) return false

  const provinceCode = +id.slice(0, 2)
  if (provinceCode < 1 || provinceCode > 24) return false

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  let totalSum = 0

  for (let i = 0; i < 9; i++) {
    const digit = +id[i]
    const product = digit * coefficients[i]
    totalSum += product >= 10 ? product - 9 : product
  }

  const checkDigit = (10 - (totalSum % 10)) % 10
  return checkDigit === +id.slice(-1)
}

export interface RUCResult {
  isValid: boolean
  type: string | null
}

export function validateRUC(ruc: string): RUCResult {
  const result: RUCResult = {
    isValid: false,
    type: null,
  }

  if (!ruc || ruc.length !== 13) return result
  if (!/^[0-9][0-9][1-9]$/.test(ruc.slice(-3))) return result

  const id = ruc.slice(0, 10)
  const typeCode = +ruc.slice(2, 3)

  if (/^[0-5]$/.test(String(typeCode))) {
    result.isValid = validateEcuadorianID(id)
    result.type = 'RUC de persona natural'
  }

  if (typeCode === 9) {
    result.isValid = validateLegalEntityRUC(id)
    result.type = 'RUC de persona jurídica'
  }

  if (typeCode === 6) {
    result.isValid = validatePublicEntityRUC(ruc)
    result.type = 'RUC de entidad pública'
  }

  return result
}

function validateLegalEntityRUC(ruc: string): boolean {
  const coefficients = [4, 3, 2, 7, 6, 5, 4, 3, 2]
  const checkDigit = +ruc.slice(-1)

  try {
    const totalSum = ruc
      .slice(0, 9)
      .split('')
      .reduce((acc, digit, index) => {
        return acc + +digit * coefficients[index]
      }, 0)

    const remainder = totalSum % 11
    return remainder === 0 ? checkDigit === 0 : 11 - remainder === checkDigit
  } catch {
    return false
  }
}

function validatePublicEntityRUC(ruc: string): boolean {
  const coefficients = [3, 2, 7, 6, 5, 4, 3, 2]
  const checkDigit = +ruc.slice(8, 9)

  try {
    const totalSum = ruc
      .slice(0, 8)
      .split('')
      .reduce((acc, digit, index) => {
        return acc + +digit * coefficients[index]
      }, 0)

    const remainder = totalSum % 11
    return remainder === 0 ? checkDigit === 0 : 11 - remainder === checkDigit
  } catch {
    return false
  }
}
