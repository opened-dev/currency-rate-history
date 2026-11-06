import { useState } from 'react'
import {
  CURRENCIES,
  convertAmount,
  formatCurrency,
  validateAmount,
  type Currency,
} from './converter'
import './App.css'

function App() {
  const [amount, setAmount] = useState('100')
  const [sourceCurrency, setSourceCurrency] = useState<Currency>('USD')
  const [targetCurrency, setTargetCurrency] = useState<Currency>('EUR')

  const validation = validateAmount(amount)
  const convertedAmount = validation.amount === null
    ? null
    : convertAmount(validation.amount, sourceCurrency, targetCurrency)
  const exampleRate = convertAmount(1, sourceCurrency, targetCurrency)

  return (
    <main className="app-shell">
      <div className="ambient-shape ambient-shape-one" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-two" aria-hidden="true" />

      <div className="page-content">
        <header className="topbar">
          <a className="brand" href="#home" aria-label="Курс — на главную">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>курс</span>
          </a>
          <span className="topbar-note">Простой конвертер валют</span>
        </header>

        <section className="hero" id="home" aria-labelledby="page-title">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            БЫСТРО И ПОНЯТНО
          </div>
          <h1 id="page-title">
            Валюта — <span>всего пара кликов.</span>
          </h1>
          <p className="hero-copy">
            Введите сумму, выберите валюты и сразу увидите результат.
          </p>
        </section>

        <section className="converter-card" aria-labelledby="converter-title">
          <div className="card-heading">
            <div>
              <h2 id="converter-title">Конвертация</h2>
              <p>Настройте пару валют</p>
            </div>
            <span className="live-badge">
              <span aria-hidden="true" />
              МГНОВЕННЫЙ РАСЧЁТ
            </span>
          </div>

          <div className="converter-fields">
            <div className="field amount-field">
              <label htmlFor="amount">Сумма</label>
              <div className={`input-frame${validation.error ? ' input-frame-invalid' : ''}`}>
                <input
                  id="amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  aria-invalid={Boolean(validation.error)}
                  aria-describedby={validation.error ? 'amount-error' : undefined}
                />
                <span className="input-currency">{sourceCurrency}</span>
              </div>
              {validation.error && (
                <p className="error-message" id="amount-error" role="alert">
                  {validation.error}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="source-currency">Из валюты</label>
              <div className="select-frame">
                <select
                  id="source-currency"
                  value={sourceCurrency}
                  onChange={(event) => setSourceCurrency(event.target.value as Currency)}
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <span className="select-chevron" aria-hidden="true" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="target-currency">В валюту</label>
              <div className="select-frame">
                <select
                  id="target-currency"
                  value={targetCurrency}
                  onChange={(event) => setTargetCurrency(event.target.value as Currency)}
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <span className="select-chevron" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={`result-panel${validation.error ? ' result-panel-muted' : ''}`}>
            <div className="result-copy">
              <span className="result-label">Вы получите</span>
              {convertedAmount === null ? (
                <p className="result-placeholder">Введите корректную сумму</p>
              ) : (
                <output
                  className="result-value"
                  htmlFor="amount source-currency target-currency"
                  aria-live="polite"
                >
                  {formatCurrency(convertedAmount, targetCurrency)}
                </output>
              )}
              <span className="rate-note">
                1 {sourceCurrency} = {formatCurrency(exampleRate, targetCurrency)}
              </span>
            </div>
            <div className="result-icon" aria-hidden="true">
              <span className="result-icon-line result-icon-line-top" />
              <span className="result-icon-line result-icon-line-bottom" />
            </div>
          </div>

          <div className="card-footer">
            <span className="info-icon" aria-hidden="true">i</span>
            <p>Используются условные фиксированные курсы. Данные не запрашиваются из сети.</p>
          </div>
        </section>

        <footer className="page-footer">
          <span>Короткий путь от одной валюты к другой.</span>
          <span className="footer-symbol" aria-hidden="true">↗</span>
        </footer>
      </div>
    </main>
  )
}

export default App
