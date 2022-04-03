import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear()

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('publisher connected to nats');

    const publisher = new TicketCreatedPublisher(stan)
    try {
        await publisher.publish({
            id: '1',
            title: 'test',
            price: 900
        })
        console.log('published')
    } catch (error) {
        console.log(error)
    }

})