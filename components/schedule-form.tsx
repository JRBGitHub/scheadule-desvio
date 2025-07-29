"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Schedule, ScheduleFormData, InstrumentData } from "../types/schedule"
import { instrumentOptions, getPresetInstruments } from "../data/instrument-options"

interface ScheduleFormProps {
  onSubmit: (data: ScheduleFormData) => void
  editingSchedule?: Schedule | null
  onCancel?: () => void
}

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const ITERATION_OPTIONS = [
  { value: "15min", label: "Cada 15 minutos" },
  { value: "30min", label: "Cada 30 minutos" },
  { value: "1h", label: "Cada hora" },
  { value: "2h", label: "Cada 2 horas" },
  { value: "4h", label: "Cada 4 horas" },
  { value: "daily", label: "Diario" },
  { value: "weekly", label: "Semanal" },
]

export default function ScheduleForm({ onSubmit, editingSchedule, onCancel }: ScheduleFormProps) {
  const [formData, setFormData] = useState<ScheduleFormData>({
    day: editingSchedule?.day || "",
    time: editingSchedule?.time || "",
    iterationTime: editingSchedule?.iterationTime || "",
    instrument: editingSchedule?.instrument || {
      ric: "",
      cajaValor: "",
      ticker: "",
      mercado: "",
      plazo: "",
      moneda: "",
    },
    description: editingSchedule?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { instrument } = formData
    if (
      formData.day &&
      formData.time &&
      formData.iterationTime &&
      instrument.ric &&
      instrument.cajaValor &&
      instrument.ticker &&
      instrument.mercado &&
      instrument.plazo &&
      instrument.moneda
    ) {
      onSubmit(formData)
      if (!editingSchedule) {
        setFormData({
          day: "",
          time: "",
          iterationTime: "",
          instrument: { ric: "", cajaValor: "", ticker: "", mercado: "", plazo: "", moneda: "" },
          description: "",
        })
      }
    }
  }

  const handleInstrumentChange = (field: keyof InstrumentData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instrument: {
        ...prev.instrument,
        [field]: value,
      },
    }))
  }

  const loadPresetInstrument = (preset: InstrumentData) => {
    setFormData((prev) => ({
      ...prev,
      instrument: preset,
    }))
  }

  const isEditing = !!editingSchedule
  const presetInstruments = getPresetInstruments()

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Schedule" : "Nuevo Schedule de Alertas"}</CardTitle>
        <CardDescription>Configure las alertas para recibir información sobre instrumentos financieros</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Instrumentos Predefinidos */}
          <div className="space-y-3">
            <Label>Instrumentos Predefinidos (Opcional)</Label>
            <div className="flex flex-wrap gap-2">
              {presetInstruments.map((preset, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => loadPresetInstrument(preset)}
                >
                  {preset.ticker} ({preset.mercado}) - {preset.moneda}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Haz clic en un instrumento para cargar sus datos automáticamente
            </p>
          </div>

          <Separator />

          {/* Configuración de Horario */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuración de Horario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Día de la semana</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, day: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar día" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horario</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iterationTime">Frecuencia de notificaciones</Label>
              <Select
                value={formData.iterationTime}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, iterationTime: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  {ITERATION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Datos del Instrumento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Datos del Instrumento Financiero</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ric">RIC (Código Reuters)</Label>
                <Select value={formData.instrument.ric} onValueChange={(value) => handleInstrumentChange("ric", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar RIC" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.rics.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cajaValor">Caja Valor</Label>
                <Select
                  value={formData.instrument.cajaValor}
                  onValueChange={(value) => handleInstrumentChange("cajaValor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Caja Valor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.cajaValores.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticker">Ticker</Label>
                <Select
                  value={formData.instrument.ticker}
                  onValueChange={(value) => handleInstrumentChange("ticker", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Ticker" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.tickers.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mercado">Mercado</Label>
                <Select
                  value={formData.instrument.mercado}
                  onValueChange={(value) => handleInstrumentChange("mercado", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Mercado" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.mercados.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plazo">Plazo (horas)</Label>
                <Select
                  value={formData.instrument.plazo}
                  onValueChange={(value) => handleInstrumentChange("plazo", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.plazos.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moneda">Moneda</Label>
                <Select
                  value={formData.instrument.moneda}
                  onValueChange={(value) => handleInstrumentChange("moneda", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.monedas.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descripción adicional del schedule..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? "Actualizar Schedule" : "Crear Schedule"}
            </Button>
            {isEditing && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
