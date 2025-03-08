import { NextResponse } from 'next/server'
import { PrismaClient, ExchangePoint, Review } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

type ExchangePointWithReviews = ExchangePoint & {
  reviews: { rating: number }[]
}

type ExchangePointWithStats = Omit<ExchangePointWithReviews, 'reviews'> & {
  averageRating: number
  reviewCount: number
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = searchParams.get('radius') || '10' // Default 10km radius

  try {
    let exchangePoints = await prisma.exchangePoint.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: Number(lat) - Number(radius) / 111, // Approximate 1 degree = 111km
              lte: Number(lat) + Number(radius) / 111,
            },
          },
          {
            longitude: {
              gte: Number(lng) - Number(radius) / (111 * Math.cos(Number(lat) * Math.PI / 180)),
              lte: Number(lng) + Number(radius) / (111 * Math.cos(Number(lat) * Math.PI / 180)),
            },
          },
        ],
      },
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calculate average rating
    const exchangePointsWithStats: ExchangePointWithStats[] = exchangePoints.map((point: ExchangePointWithReviews) => ({
      ...point,
      averageRating: point.reviews.length > 0
        ? point.reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / point.reviews.length
        : 0,
      reviewCount: point.reviews.length,
      reviews: undefined,
    }))

    return NextResponse.json(exchangePointsWithStats)
  } catch (error) {
    console.error('Error fetching exchange points:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exchange points' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const exchangePoint = await prisma.exchangePoint.create({
      data: {
        name: body.name,
        type: body.type,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        cryptos: body.cryptos,
        fiatCurrencies: body.fiatCurrencies,
        workingHours: body.workingHours,
        fees: body.fees,
        status: 'ACTIVE',
        contactInfo: body.contactInfo,
        website: body.website,
      },
    })

    return NextResponse.json(exchangePoint)
  } catch (error) {
    console.error('Error creating exchange point:', error)
    return NextResponse.json(
      { error: 'Failed to create exchange point' },
      { status: 500 }
    )
  }
} 