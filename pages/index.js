import Head from 'next/head'
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage =(props)=>{
  return(
    <>
      <Head>
        <title>React Next js meet app</title>
        <meta name="description" content='nice next js app'/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  )
}
export async function getStaticProps(){

  const client = await MongoClient.connect('mongodb+srv://voke:123@nodeexpress.5wbm2.mongodb.net/nextjs?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollections = db.collection('meetups')

  const getmeetups = await meetupsCollections.find().toArray();

  client.close()

  return{
    props:{
      meetups: 
        getmeetups.map((item,index)=>({
          title:item.title,
          image:item.image,
          address:item.address,
          description:item.description,
          id:item._id.toString()
        }))
    },
    revalidate:1
  }
}

export default HomePage