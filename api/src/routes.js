import express from 'express';

const routes = express.Router();

/**
 * com acesso ao meu producer vou conseguir enviar minhas msg ao kafka 
 */
routes.post('/escreverNumeros', async(req,res)=>{
    let msg  = { 
        user:'joao vitor',
        number:258
    };

    await req.producer.send({
        topic: 'issue-numeros',
        messages: [{value: JSON.stringify(msg)}],
    })
    return res.json({ok:true});
});

routes.get('/ping', async(req,res)=>{
    return res.json({ok:'ping'});
});

export default routes;