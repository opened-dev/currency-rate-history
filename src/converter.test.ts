import { describe, expect, it } from 'vitest'
import { convertAmount, validateAmount } from './converter'

describe('convertAmount', () => {
  it('converts from USD using the fixed base rates', () => {
    expect(convertAmount(100, 'USD', 'EUR')).toBeCloseTo(92)
    expect(convertAmount(250, 'USD', 'GBP')).toBeCloseTo(197.5)
  })

  it('converts between non-USD currencies through USD', () => {
    expect(convertAmount(100, 'EUR', 'GBP')).toBeCloseTo((100 / 0.92) * 0.79)
  })

  it('keeps the amount unchanged when both currencies match', () => {
    expect(convertAmount(100, 'JPY', 'JPY')).toBe(100)
  })
})

describe('validateAmount', () => {
  it('accepts zero and positive numeric amounts', () => {
    expect(validateAmount('0')).toEqual({ amount: 0, error: null })
    expect(validateAmount('250')).toEqual({ amount: 250, error: null })
  })

  it('rejects blank, non-numeric, and negative values', () => {
    expect(validateAmount('')).toEqual({ amount: null, error: 'Введите сумму.' })
    expect(validateAmount('abc')).toEqual({ amount: null, error: 'Введите корректное число.' })
    expect(validateAmount('-10')).toEqual({ amount: null, error: 'Сумма не может быть отрицательной.' })
  })
})
