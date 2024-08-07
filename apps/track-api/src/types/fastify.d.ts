import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: { id: string }
    res: FastifyReply
  }

  export interface FastifyReply {
    startTime: number
    setHeader: (key: string, value: string) => unknown
    end: () => void
  }
}
