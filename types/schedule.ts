export interface InstrumentData {
  ric: string
  cajaValor: string
  ticker: string
  mercado: string
  plazo: string
  moneda: string
}

export interface Schedule {
  id: string
  day: string
  time: string
  iterationTime: string
  instrument: InstrumentData
  description?: string
  isActive: boolean
  createdAt: Date
}

export interface ScheduleFormData {
  day: string
  time: string
  iterationTime: string
  instrument: InstrumentData
  description?: string
}

// Opciones para los combos (simulando datos que vendrán de la API)
export interface ComboOption {
  value: string
  label: string
}

export interface InstrumentOptions {
  rics: ComboOption[]
  cajaValores: ComboOption[]
  tickers: ComboOption[]
  mercados: ComboOption[]
  plazos: ComboOption[]
  monedas: ComboOption[]
}
