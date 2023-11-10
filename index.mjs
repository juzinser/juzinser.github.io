import fastify from "fastify";
import path from "node:path";

const secretKey = "";
const __dirname = path.resolve(path.dirname('')); 
const app = fastify({ logger: true });

app.register(import('@fastify/static'), {
  root: path.join(__dirname, '/')
})

app.get('/', (request, reply) => {
  reply.sendFile('index.html');
});

app.get('/captchaTest', (req,res) =>{
  const requestQuery = req.query["g-recaptcha-response"];

  if( requestQuery != undefined && requestQuery != '' && requestQuery != null && requestQuery.response != undefined && requestQuery.response != '' && requestQuery.response != null ){
    const response = requestQuery.response;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`;
    
    request(verificationUrl, (error, response, body) => {
      if(error)
        console.error(error);

      body = JSON.parse(body);

      if(body.success !== undefined && !body.success)
        res.send({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      else
        res.send({"responseCode" : 0,"responseDesc" : "Sucess"});
    });
  }else
    res.send({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
});
  

app.listen({port: 3124}, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});