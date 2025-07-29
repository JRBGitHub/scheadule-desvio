"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Bell } from "lucide-react"
import ScheduleForm from "../components/schedule-form"
import ScheduleList from "../components/schedule-list"
import type { Schedule, ScheduleFormData } from "../types/schedule"

export default function InvestmentScheduleContent() {
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Investment Schedule</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => console.log("Notifications clicked")}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
              5
            </span>
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Schedule List</TabsTrigger>
          <TabsTrigger value="form" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {editingSchedule ? "Edit Schedule" : "New Schedule"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <ScheduleList
            schedules={schedules}
            onEdit={handleEditClick}
            onDelete={handleDeleteSchedule}
            onToggleActive={handleToggleActive}
          />
        </TabsContent>
        <TabsContent value="form" className="space-y-4">
          <ScheduleForm
            onSubmit={editingSchedule ? handleEditSchedule : handleCreateSchedule}
            initialData={editingSchedule}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
