export type Schedule = {
  id: string
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'
  time: string
  iterationTime: '15min' | '30min' | '1h' | '2h' | '4h' | 'daily' | 'weekly'
  ric: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastExecuted?: string
  nextExecution?: string
}

export type CreateScheduleRequest = {
  day: Schedule['day']
  time: string
  iterationTime: Schedule['iterationTime']
  ric: string
  description?: string
}

export type UpdateScheduleRequest = CreateScheduleRequest & {
  isActive: boolean
}

export type PatchScheduleRequest = Partial<UpdateScheduleRequest>

export type Instrument = {
  ric: string
  name: string
  exchange: string
  currency: string
  type: string
  sector: string
}

export type Alert = {
  id: string
  scheduleId: string
  ric: string
  message: string
  data: Record<string, unknown>
  sentAt: string
  status: 'sent' | 'failed' | 'pending'
}

export type ScheduleStats = {
  totalSchedules: number
  activeSchedules: number
  inactiveSchedules: number
  uniqueInstruments: number
  totalAlertsToday: number
  schedulesByDay: Record<Schedule['day'], number>
  schedulesByFrequency: Record<Schedule['iterationTime'], number>
}

export type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Array<{
      field: string
      message: string
    }>
  }
  message?: string
  timestamp?: string
  pagination?: Pagination
}
