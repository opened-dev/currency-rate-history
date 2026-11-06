export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'] as const

export type Currency = (typeof CURRENCIES)[number]

// Values describe units of each currency per one US dollar.
export const CURRENCY_UNITS_PER_USD: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150,
}

export function convertAmount(amount: number, source: Currency, target: Currency): number {
  return (amount / CURRENCY_UNITS_PER_USD[source]) * CURRENCY_UNITS_PER_USD[target]
}

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
  }).format(amount)
}

type AmountValidation = { amount: number; error: null } | { amount: null; error: string }

export function validateAmount(rawAmount: string): AmountValidation {
  if (rawAmount.trim() === '') {
    return { amount: null, error: 'Введите сумму.' }
  }

  const amount = Number(rawAmount)
  if (!Number.isFinite(amount)) {
    return { amount: null, error: 'Введите корректное число.' }
  }

  if (amount < 0) {
    return { amount: null, error: 'Сумма не может быть отрицательной.' }
  }

  return { amount, error: null }
}
