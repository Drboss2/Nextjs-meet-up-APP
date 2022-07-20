import { Fragment } from "react"
import Head from "next/head";
import MeeetupDetails from "../../components/meetups/MeetupDetails"
import {MongoClient,ObjectId} from 'mongodb';

function MeeetupDetail(props){
   return (
      <Fragment>
         <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
         </Head>
         <MeeetupDetails 
         image={props.meetupData.image}
         title={props.meetupData.title}
         address={props.meetupData.address}
         description={props.meetupData.description}       
         />
      </Fragment>
   )
}

export async function getStaticPaths(){
   const client = await MongoClient.connect('mongodb+srv://voke:123@nodeexpress.5wbm2.mongodb.net/nextjs?retryWrites=true&w=majority')
   const db = client.db();

   const meetupsCollections = db.collection('meetups')

   const meetups = await meetupsCollections.find({},{_id:1}).toArray()

   client.close()

   return {
      fallback:false,
      paths:meetups.map((item)=>({
         params:{meetupId:item._id.toString()},
      })),
     
   }
}

export async function getStaticProps(context){
   const ids = context.params.meetupId;

   console.log(ids)

   const client = await MongoClient.connect('mongodb+srv://voke:123@nodeexpress.5wbm2.mongodb.net/nextjs?retryWrites=true&w=majority')
   const db = client.db();

   const meetupsCollections = db.collection('meetups')

   const selectedMeetups = await meetupsCollections.findOne({_id:ObjectId(ids)})
   
   client.close()

   return{
      props:{
         meetupData:{
           id:selectedMeetups._id.toString(),
           title:selectedMeetups.title,
           address:selectedMeetups.address,
           image:selectedMeetups.image,
           description:selectedMeetups.description

         },
      }
   }
}

export default MeeetupDetail