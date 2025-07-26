"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Schedule, ScheduleFormData } from "../types/schedule"

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
    ric: editingSchedule?.ric || "",
    description: editingSchedule?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.day && formData.time && formData.iterationTime && formData.ric) {
      onSubmit(formData)
      if (!editingSchedule) {
        setFormData({ day: "", time: "", iterationTime: "", ric: "", description: "" })
      }
    }
  }

  const isEditing = !!editingSchedule

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Schedule" : "Nuevo Schedule de Alertas"}</CardTitle>
        <CardDescription>Configure las alertas para recibir información sobre instrumentos financieros</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Día de la semana</Label>
              <Select value={formData.day} onValueChange={(value) => setFormData((prev) => ({ ...prev, day: value }))}>
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

          <div className="space-y-2">
            <Label htmlFor="ric">RIC (Código del Instrumento)</Label>
            <Input
              id="ric"
              placeholder="Ej: AAPL.O, MSFT.O, GOOGL.O"
              value={formData.ric}
              onChange={(e) => setFormData((prev) => ({ ...prev, ric: e.target.value.toUpperCase() }))}
              required
            />
            <p className="text-sm text-muted-foreground">
              Ingrese el código RIC del instrumento financiero a monitorear
            </p>
          </div>

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
