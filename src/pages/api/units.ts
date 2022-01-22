import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const HANDLE_REQUEST: { [key: string]: any } = {
  'GET': async ({ query }: NextApiRequest) => {
    return prisma.unit.findMany({ where: { id: Number(query.id) } })
  },
  'PUT': async ({ query, body: data }: NextApiRequest) => {
    return prisma.unit.update({ data, where: { id: Number(query.id) } })
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await HANDLE_REQUEST[req.method!](req)
    res.status(200).json(response)
  } catch (error) {
    res.status(500)
  }
}