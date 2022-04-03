import nats, { Message, Stan } from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TickerCreatedListener } from './events/ticket-created-listener';
console.clear()


const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  stan.on('close', () => {
    console.log('NATS connection closed')
    process.exit()
  })
  console.log('listener connected to |NATS')

  new TickerCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())



