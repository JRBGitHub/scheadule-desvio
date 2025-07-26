"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Bell } from "lucide-react"
import ScheduleForm from "../components/schedule-form"
import ScheduleList from "../components/schedule-list"
import type { Schedule, ScheduleFormData } from "../types/schedule"

export default function InvestmentScheduleManager() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [activeTab, setActiveTab] = useState("list")

  const handleCreateSchedule = (data: ScheduleFormData) => {
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      ...data,
      isActive: true,
      createdAt: new Date(),
    }
    setSchedules((prev) => [...prev, newSchedule])
    setActiveTab("list")
  }

  const handleEditSchedule = (data: ScheduleFormData) => {
    if (editingSchedule) {
      setSchedules((prev) =>
        prev.map((schedule) => (schedule.id === editingSchedule.id ? { ...schedule, ...data } : schedule)),
      )
      setEditingSchedule(null)
      setActiveTab("list")
    }
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id))
  }

  const handleEditClick = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setActiveTab("form")
  }

  const handleToggleActive = (id: string) => {
    setSchedules((prev) =>
      prev.map((schedule) => (schedule.id === id ? { ...schedule, isActive: !schedule.isActive } : schedule)),
    )
  }

  const handleCancelEdit = () => {
    setEditingSchedule(null)
    setActiveTab("list")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Investment Alert Manager</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Gestiona tus schedules de alertas para recibir información actualizada sobre instrumentos financieros según
            tu configuración personalizada.
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Schedules ({schedules.length})
              </TabsTrigger>
              <TabsTrigger value="form" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingSchedule ? "Editar" : "Nuevo"}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list" className="space-y-6">
            <ScheduleList
              schedules={schedules}
              onDelete={handleDeleteSchedule}
              onEdit={handleEditClick}
              onToggleActive={handleToggleActive}
            />

            {schedules.length > 0 && (
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab("form")} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar Nuevo Schedule
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="form" className="flex justify-center">
            <ScheduleForm
              onSubmit={editingSchedule ? handleEditSchedule : handleCreateSchedule}
              editingSchedule={editingSchedule}
              onCancel={editingSchedule ? handleCancelEdit : undefined}
            />
          </TabsContent>
        </Tabs>

        {/* Stats Footer */}
        {schedules.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{schedules.length}</div>
                <div className="text-sm text-gray-600">Total Schedules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{schedules.filter((s) => s.isActive).length}</div>
                <div className="text-sm text-gray-600">Activos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{new Set(schedules.map((s) => s.ric)).size}</div>
                <div className="text-sm text-gray-600">Instrumentos Únicos</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
