import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = process.env.JINA_EMBEDDING_TOKEN
  if (!token) {
    return NextResponse.json({ ok: false, message: 'JINA_EMBEDDING_TOKEN is not set' }, { status: 500 })
  }

  try {
    const { coachId, text } = await req.json()

    if (!text && !coachId) {
      return NextResponse.json({ ok: false, message: 'Provide text or coachId' }, { status: 400 })
    }

    const input = text ?? coachId

    const res = await fetch('https://api.jina.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'jina-embeddings-v3',
        input: [input],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Jina API error:', err)
      return NextResponse.json({ ok: false, message: 'Jina API error', detail: err }, { status: 502 })
    }

    const data = await res.json()
    const embedding = data.data?.[0]?.embedding

    return NextResponse.json({ ok: true, coachId, embedding })
  } catch (err) {
    console.error('Embed error:', err)
    return NextResponse.json({ ok: false, message: 'Internal error' }, { status: 500 })
  }
}
