import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserAttributes } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

interface UserData extends User {
  name: string
}

interface Database extends UserAttributes {
  data: {
    user: UserData
  }
}

export default async function supabase(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  res.status(200).json({ name: (user as UserData)?.name ?? '' })
}
