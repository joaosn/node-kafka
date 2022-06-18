//receber mensagen do kafka
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'numeros',
    brokers: ['localhost:9092']
});

const topic = 'issue-numeros';
const consumer = kafka.consumer({groupId:'numeros-group'});

const producer = kafka.producer();

async function run() {
    await consumer.connect();
    await consumer.subscribe({topic});
    await consumer.run({
        eachMessage:async ({topic ,partition,message}) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(`- ${prefix} ${message.key}#${message.value}`);

            let msg = { value:'seu numero é '+message.value};
            await producer.send({
                topic:'numeros-response',
                messages: [{value: JSON.stringify(msg)}],
            })
            
        }
    })
}

run().catch(console.error)
