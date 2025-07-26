export interface Schedule {
  id: string
  day: string
  time: string
  iterationTime: string
  ric: string
  description?: string
  isActive: boolean
  createdAt: Date
}

export interface ScheduleFormData {
  day: string
  time: string
  iterationTime: string
  ric: string
  description?: string
}
