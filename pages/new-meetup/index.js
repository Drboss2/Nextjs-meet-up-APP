import React from 'react'
import {useRouter} from 'next/router'
import NewMeetupFrom from "../../components/meetups/NewMeetupForm"

const newMeetupPage = () => {
   const router = useRouter()

   const addMeetupHandler = async (data)=>{
      const response = await fetch('/api/new-meetup',{
         method:'POST',
         body: JSON.stringify(data),
         headers:{
            'Content-Type':'application/json'
         }
      });

      const f =  await response.json()

      console.log(f)
      router.push('/')
   }

   return (
      <>
         <NewMeetupFrom onAddMeetup={addMeetupHandler}/>
      </>
  )
}

export default newMeetupPage