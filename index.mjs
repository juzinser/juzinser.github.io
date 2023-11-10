import fastify from "fastify";
import path from "node:path";
// import FastifyStatic from "@fastify/static";

const __dirname = path.resolve(path.dirname('')); 
const app = fastify({
    logger: true
});

app.register(import('@fastify/static'), {
  root: path.join(__dirname, '/'),
  // prefix: '/',
  // constraints: { host: 'example.com' }
})

app.get('/', function (request, reply) {
    reply.sendFile('index.html');
  });
  

app.listen({port: 3124}, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  });