import { describe, it, expect } from 'vitest'
import { validateEcuadorianID, validateRUC } from '../src/js/validations.ts'

describe('validateEcuadorianID', () => {
  it('returns true for a valid ID', () => {
    expect(validateEcuadorianID('1709839664')).toBe(true)
  })

  it('returns false for an ID with wrong check digit', () => {
    expect(validateEcuadorianID('1709839665')).toBe(false)
  })

  it('returns false for an ID with invalid province code (00)', () => {
    expect(validateEcuadorianID('0012345678')).toBe(false)
  })

  it('returns false for an ID with invalid province code (25)', () => {
    expect(validateEcuadorianID('2512345678')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(validateEcuadorianID('')).toBe(false)
  })

  it('returns false for wrong length', () => {
    expect(validateEcuadorianID('123')).toBe(false)
  })

  it('returns false when length is correct but digits are not numeric', () => {
    expect(validateEcuadorianID('abcdefghij')).toBe(false)
  })

  it('returns false for null', () => {
    expect(validateEcuadorianID(null as unknown as string)).toBe(false)
  })
})

describe('validateRUC', () => {
  describe('persona natural (type code 0-5)', () => {
    it('returns valid for a natural person RUC', () => {
      const result = validateRUC('1801798990001')
      expect(result.isValid).toBe(true)
      expect(result.type).toBe('RUC de persona natural')
    })

    it('returns invalid when the embedded ID is invalid', () => {
      const result = validateRUC('1801798980001')
      expect(result.isValid).toBe(false)
      expect(result.type).toBe('RUC de persona natural')
    })
  })

  describe('persona jurídica (type code 9)', () => {
    it('returns valid for a legal entity RUC', () => {
      const result = validateRUC('1490818096001')
      expect(result.isValid).toBe(true)
      expect(result.type).toBe('RUC de persona jurídica')
    })

    it('returns invalid for wrong check digit', () => {
      const result = validateRUC('1490818097001')
      expect(result.isValid).toBe(false)
      expect(result.type).toBe('RUC de persona jurídica')
    })
  })

  describe('entidad pública (type code 6)', () => {
    it('returns valid for a public entity RUC', () => {
      const result = validateRUC('0160063270001')
      expect(result.isValid).toBe(true)
      expect(result.type).toBe('RUC de entidad pública')
    })

    it('returns invalid for wrong check digit', () => {
      const result = validateRUC('0160063260001')
      expect(result.isValid).toBe(false)
      expect(result.type).toBe('RUC de entidad pública')
    })
  })

  it('returns invalid for wrong length', () => {
    const result = validateRUC('123')
    expect(result.isValid).toBe(false)
  })

  it('returns invalid for empty string', () => {
    const result = validateRUC('')
    expect(result.isValid).toBe(false)
  })

  it('returns invalid when last 3 digits are not a valid establishment', () => {
    const result = validateRUC('1490818096000')
    expect(result.isValid).toBe(false)
  })

  it('returns invalid for null', () => {
    const result = validateRUC(null as unknown as string)
    expect(result.isValid).toBe(false)
  })
})
