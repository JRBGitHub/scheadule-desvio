import type { InstrumentOptions } from "../types/schedule"

// Datos de ejemplo basados en los instrumentos proporcionados
// En el futuro estos vendrán de la API
export const instrumentOptions: InstrumentOptions = {
  rics: [
    { value: "ARGD35D1=BA", label: "ARGD35D1=BA" },
    { value: "ARTC25P3=ME", label: "ARTC25P3=ME" },
    { value: "AAPL.O", label: "AAPL.O" },
    { value: "MSFT.O", label: "MSFT.O" },
    { value: "GOOGL.O", label: "GOOGL.O" },
    { value: "TSLA.O", label: "TSLA.O" },
    { value: "AMZN.O", label: "AMZN.O" },
  ],
  cajaValores: [
    { value: "81088", label: "81088 - GD35" },
    { value: "5328", label: "5328 - TC25P" },
    { value: "12345", label: "12345 - AAPL" },
    { value: "67890", label: "67890 - MSFT" },
    { value: "11111", label: "11111 - GOOGL" },
    { value: "22222", label: "22222 - TSLA" },
    { value: "33333", label: "33333 - AMZN" },
  ],
  tickers: [
    { value: "GD35", label: "GD35" },
    { value: "TC25P", label: "TC25P" },
    { value: "AAPL", label: "AAPL" },
    { value: "MSFT", label: "MSFT" },
    { value: "GOOGL", label: "GOOGL" },
    { value: "TSLA", label: "TSLA" },
    { value: "AMZN", label: "AMZN" },
  ],
  mercados: [
    { value: "BYM", label: "BYM - Bolsa y Mercados Argentinos" },
    { value: "MAE", label: "MAE - Mercado Abierto Electrónico" },
    { value: "NASDAQ", label: "NASDAQ" },
    { value: "NYSE", label: "NYSE - New York Stock Exchange" },
    { value: "LSE", label: "LSE - London Stock Exchange" },
  ],
  plazos: [
    { value: "24", label: "24 horas" },
    { value: "48", label: "48 horas" },
    { value: "72", label: "72 horas" },
    { value: "168", label: "1 semana (168 horas)" },
    { value: "720", label: "1 mes (720 horas)" },
  ],
  monedas: [
    { value: "USD", label: "USD - Dólar Estadounidense" },
    { value: "ARS", label: "ARS - Peso Argentino" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - Libra Esterlina" },
    { value: "JPY", label: "JPY - Yen Japonés" },
  ],
}

// Función para obtener instrumentos predefinidos (simulando respuesta de API)
export const getPresetInstruments = () => [
  {
    ric: "ARGD35D1=BA",
    cajaValor: "81088",
    ticker: "GD35",
    mercado: "BYM",
    plazo: "24",
    moneda: "USD",
  },
  {
    ric: "ARTC25P3=ME",
    cajaValor: "5328",
    ticker: "TC25P",
    mercado: "MAE",
    plazo: "48",
    moneda: "ARS",
  },
]
