import { Channel, connect } from "amqplib";
import { config } from "dotenv";
import { Server } from "socket.io";
import * as http from 'http'
import CandleController from "../controllers/CandleController";
import { Candle } from "../models/CandleModels";

config()

export default class CandleMessageChannel {
    private _channel: Channel
    private _candleCtrl: CandleController
    private _io: Server

    constructor(server: http.Server) {
        this._candleCtrl = new CandleController()
        this._io = new Server(server,{
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET","POST"]
            }
        })
        this._io.on('connection', () => {
            console.log('websocket connected')
        })
    }

    private async _createMessageChannel() {
        try {
            const connection = await connect(process.env.AMQP_SERVER)
            this._channel = await connection.createChannel()
            this._channel.assertQueue(process.env.QUEUE_NAME)
        } catch (error) {
            console.log('error connection rabbitmq')
        }
   }

    async consumeMessages(){
        await this._createMessageChannel();
        if(!this._channel) return
        this._channel.consume(process.env.QUEUE_NAME, async (msg) => {
            const candleObj = JSON.parse(msg.content.toString())
            console.log('message received')
            console.log(candleObj)
            this._channel.ack(msg)  // confirmando recebimento
            
            const candle: Candle = candleObj
            await this._candleCtrl.save(candle)
            console.log('candle saved to database')
            this._io.emit(process.env.SOCKET_EVENT_NAME, candle)
            console.log('new candle emited by websocket')
        })

        console.log('candle consumer started')
    }   

}