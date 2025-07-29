import { type NextRequest } from 'next/server'
import { z } from 'zod'
import type { ApiResponse, Schedule } from '@/types/api'

const querySchema = z.object({
  page: z.string().optional().transform(Number).default('1'),
  limit: z.string().optional().transform(Number).default('10'),
  isActive: z.string().optional().transform(val => val === 'true'),
  ric: z.string().optional(),
  day: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']).optional()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    const validatedQuery = querySchema.parse(query)

    // TODO: Implementar lógica de base de datos
    const schedules: Schedule[] = []
    
    return Response.json({
      success: true,
      data: schedules,
      pagination: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    } satisfies ApiResponse<Schedule[]>)
  } catch (error) {
    console.error('Error in schedules GET:', error)
    return Response.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Ha ocurrido un error interno del servidor'
        },
        timestamp: new Date().toISOString()
      } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}

const createScheduleSchema = z.object({
  day: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  iterationTime: z.enum(['15min', '30min', '1h', '2h', '4h', 'daily', 'weekly']),
  ric: z.string().regex(/^[A-Z0-9]+\.[A-Z]+$/),
  description: z.string().max(500).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedBody = createScheduleSchema.parse(body)

    // TODO: Implementar lógica de base de datos
    const newSchedule: Schedule = {
      id: 'temp-id', // Generar UUID real
      ...validatedBody,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return Response.json(
      {
        success: true,
        data: newSchedule,
        message: 'Schedule creado exitosamente'
      } satisfies ApiResponse<Schedule>,
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in schedules POST:', error)
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Los datos proporcionados no son válidos',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          timestamp: new Date().toISOString()
        } satisfies ApiResponse<never>,
        { status: 422 }
      )
    }

    return Response.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Ha ocurrido un error interno del servidor'
        },
        timestamp: new Date().toISOString()
      } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}
