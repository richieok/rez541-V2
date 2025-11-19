import { json } from "@sveltejs/kit"

export async function POST({ request }) {
  const body = await request.formData()

  console.log([...body])

  console.log(`message: ${body.get('message')}`)

  return json({ success: false })
}
