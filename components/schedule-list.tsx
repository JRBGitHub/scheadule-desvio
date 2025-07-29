"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Trash2, Edit, Clock, Calendar, TrendingUp, DollarSign, Building2 } from "lucide-react"
import type { Schedule } from "../types/schedule"

interface ScheduleListProps {
  schedules: Schedule[]
  onDelete: (id: string) => void
  onEdit: (schedule: Schedule) => void
  onToggleActive: (id: string) => void
}

export default function ScheduleList({ schedules, onDelete, onEdit, onToggleActive }: ScheduleListProps) {
  if (schedules.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay schedules configurados</h3>
          <p className="text-muted-foreground text-center">
            Crea tu primer schedule para comenzar a recibir alertas sobre instrumentos financieros
          </p>
        </CardContent>
      </Card>
    )
  }

  const getIterationLabel = (iteration: string) => {
    const labels: Record<string, string> = {
      "15min": "Cada 15 min",
      "30min": "Cada 30 min",
      "1h": "Cada hora",
      "2h": "Cada 2 horas",
      "4h": "Cada 4 horas",
      daily: "Diario",
      weekly: "Semanal",
    }
    return labels[iteration] || iteration
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Schedules Configurados</h2>
        <Badge variant="secondary">{schedules.length} schedule(s)</Badge>
      </div>

      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className={`transition-all ${!schedule.isActive ? "opacity-60" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {schedule.instrument.ticker} ({schedule.instrument.ric})
                  </CardTitle>
                  <CardDescription>{schedule.description || "Sin descripción"}</CardDescription>

                  {/* Información del instrumento */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      <Building2 className="h-3 w-3 mr-1" />
                      {schedule.instrument.mercado}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {schedule.instrument.moneda}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Caja: {schedule.instrument.cajaValor}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Plazo: {schedule.instrument.plazo}h
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={schedule.isActive} onCheckedChange={() => onToggleActive(schedule.id)} />
                  <Button variant="ghost" size="sm" onClick={() => onEdit(schedule)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(schedule.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />

              {/* Información de horario */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{schedule.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{schedule.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{getIterationLabel(schedule.iterationTime)}</Badge>
                </div>
              </div>

              {/* Detalles completos del instrumento */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Detalles del Instrumento</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="font-medium">RIC:</span> {schedule.instrument.ric}
                  </div>
                  <div>
                    <span className="font-medium">Ticker:</span> {schedule.instrument.ticker}
                  </div>
                  <div>
                    <span className="font-medium">Mercado:</span> {schedule.instrument.mercado}
                  </div>
                  <div>
                    <span className="font-medium">Caja Valor:</span> {schedule.instrument.cajaValor}
                  </div>
                  <div>
                    <span className="font-medium">Plazo:</span> {schedule.instrument.plazo}h
                  </div>
                  <div>
                    <span className="font-medium">Moneda:</span> {schedule.instrument.moneda}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                Creado: {schedule.createdAt.toLocaleDateString("es-ES")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
