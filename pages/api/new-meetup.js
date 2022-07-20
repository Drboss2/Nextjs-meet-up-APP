import { MongoClient } from 'mongodb'

async   function handler(req,res){
   if(req.method === 'POST'){
      const data = req.body

      const client = await MongoClient.connect('mongodb+srv://voke:123@nodeexpress.5wbm2.mongodb.net/nextjs?retryWrites=true&w=majority')
      const db = client.db();

      const meetupsCollections = db.collection('meetups')
      const result = await meetupsCollections.insertOne(data)

      client.close();

      res.status(201).json({message:'created'})

   }
}

export default handler