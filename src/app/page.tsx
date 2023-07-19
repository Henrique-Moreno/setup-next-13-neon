import { db } from '@/db'
import { users } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allUsers = await db.select().from(users)

  async function addUser(data: any) {
    'use server'

    console.log(data)
 
    const fullName = data.get('full_name')?.toString()
    const phone = data.get('phone').toString()

    await db.insert(users).values({
      fullName,
      phone,
    })

    revalidatePath('/')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-50 flex-col gap-6'>
      <p>{JSON.stringify(allUsers, null, 2)}</p>

      <form action={addUser} className='flex flex-col gap-5'>
        <input type="text" name='full_name' placeholder='Full name' className='py-1 px-2 rounded-lg bg-zinc-900 border-solid border-2 border-zinc-50-500 '/>
        <input type="text" name='phone' placeholder='Phone' className='py-1 px-2 rounded-lg bg-zinc-900 border-solid border-2 border-zinc-50-500 '/>


        <button type='submit' className='border-solid border-2 border-sky-500 py-2 px-2' >Create</button>
      </form>
    
    </div>
  
  )
}
