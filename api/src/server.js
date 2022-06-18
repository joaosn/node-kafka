import express from 'express';
import { Kafka,logLevel  } from 'kafkajs';
import routes from './routes';


const app = express();
/**
 * Faz conexão com Kafka
 */
const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN,
    retry: {
      initialRetryTime: 300,
      retries: 10
    }
});

/**
 * Disponebiliza producer para todas rotas
 */
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'numero-group-receiver' })
app.use((req,res,next) => {
  req.producer = producer;
  return next();
});

/**
 * Cadastra Rotas da aplicação
 */
app.use(routes);


/**
 * inicio do App e recebendo msg do kafka
 */
async function run(){
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic:'numeros-response'});
    await consumer.run({
      eachMessage:async ({topic ,partition,message}) => {
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
          console.log(`- ${prefix} ${message.key}#${message.value}`);  
      }
  })
  
    app.listen(3000);
}

run().catch(console.error);






