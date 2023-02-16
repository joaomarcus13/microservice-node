<template>  
   <Header />
   <CandleStick v-if="candles.length" :candles="candles"></CandleStick>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import Header from './components/Header.vue'
import store from './store';
import {createToast} from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import CandleStore from './store/modules/CandleStore';
import CandleStick from './components/CandleStickChart.vue';
import io from 'socket.io-client'
import Candle from './models/Candle';

@Options({
  components: {
    Header,
    CandleStick
  },
})
export default class App extends Vue {
  candleStore = getModule(CandleStore, store)
  socket = io(process.env.VUE_APP_SOCKET_SERVER)



  mounted() {
    this.candleStore.loadInitialCandles()
    this.socket.on(process.env.VUE_APP_SOCKET_EVENT_NAME, (msg: any) => {
      const candle = new Candle(msg)
      this.candleStore.addCandle(candle)
      createToast('new candle arrived',{type: 'success'})
    })
  }

  get candles() {
    console.log(this.candleStore.candles[0])
    return this.candleStore.candles
  }
}
</script>

<style>
 body{
  margin: 0;
 }
</style>
