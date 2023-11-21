import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '../database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if(user){
    const {data} = await supabase.from("users").select();

    //Add user info
    if(data?.length == 0 && user.email){
      await supabase.from("users").insert({
        email: user.email,
        role: 2,
        id: user.id,
      });
    }
  }

  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: '/dashboard'
}