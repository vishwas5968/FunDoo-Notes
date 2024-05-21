import { kafka } from './client.js';
import { consumerInit } from './consumer.js';

export const producerInit = async (req,next) =>{
    const producer = kafka.producer();
    await producer.connect();
    console.log('connecting');
    // const data = await Notes.findOne({ _id: '663da3bbfe659609dc6b0a07' });
    const data = await producer.send({
      topic: "user",
      messages: [{
        partition: 0,
        key: 'name',
        value: JSON.stringify(req.body)
      }]
    });
    console.log('disconnecting');
    await producer.disconnect();
    // await consumerInit();
  // await producer.disconnect()
}