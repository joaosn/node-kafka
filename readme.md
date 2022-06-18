# micro serviço com nodeJS+kafka

-Utilizando Kafka;
-Utilizando Node;

## Fluxo da app

- Api principal(station) //retirar alguma funcionalide dela
- Micro serviço de certificado devolve uma resposta (sincrona/acincrona);

## o que aprendi ?

- Conceitos basicos de Kafka
- micro-serviço
- configurar ambiente para uso do kafka
- como usar inicia com kafka
- conceita de mesagens (producer,comsumer)
- intregaçoes de ambientes
- docker

## como testar o uso do Kafka

- rodar docker-compose up -d para subir anbiente do kafka
- na pasta api e micro-numero rodar comando "npm run dev"
- apo isso so realizar chamada vai Insominia ex:
  [POST]http://localhost:3000/escreverNumeros

  após isso basta acompanhar no console da api e da micro-numero,
  ambos estão se comunicando usando o kafka,a cada chamada feita na rota
  vai aparecer um console.log, ou seja minha api esta chamado o kafka e o
  mesmo esta me respondendo

todas chamadas são feita via Rest

creditos:https://github.com/rocketseat-content/youtube-challenge-node-kafka/blob/master/api/package.json
