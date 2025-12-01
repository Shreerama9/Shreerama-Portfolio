import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const bookingData = await request.json()

    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get webhook URL from environment variable
    const webhookUrl = process.env.BOOKING_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('BOOKING_WEBHOOK_URL environment variable not set')
      return NextResponse.json(
        { error: 'Webhook configuration error' },
        { status: 500 }
      )
    }

    // Prepare webhook payload
    const webhookPayload = {
      event: 'booking.created',
      data: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone || 'Not provided',
        date: bookingData.date,
        time: bookingData.time,
        datetime: bookingData.datetime,
        message: bookingData.message || 'No message provided',
        timestamp: bookingData.timestamp,
        source: 'Portfolio Website'
      }
    }

    // Send webhook (wrapped in try-catch to not fail booking if webhook fails)
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })

      if (!webhookResponse.ok) {
        console.error('Webhook failed with status:', webhookResponse.status)
        console.warn('Booking confirmed but webhook delivery failed')
      } else {
        console.log('Webhook delivered successfully')
      }
    } catch (webhookError) {
      // Log webhook error but don't fail the booking
      console.error('Webhook delivery error:', webhookError.message)
      console.warn('Booking confirmed but webhook unreachable')
    }

    // Return success response regardless of webhook status
    return NextResponse.json({
      success: true,
      message: 'Booking confirmed successfully',
      booking: {
        id: `booking_${Date.now()}`,
        datetime: `${bookingData.date} ${bookingData.time}`
      }
    })

  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}
