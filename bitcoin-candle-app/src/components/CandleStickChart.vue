<template>
  <apexchart
    type="candlestick"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueApexChart from 'vue3-apexcharts';
import { Prop } from 'vue-property-decorator';
import Candle from '@/models/Candle';

@Options({
  components: {
    apexchart: VueApexChart,
  },
})
export default class CandleStick extends Vue {
  @Prop()
  candles!: Candle[];
  chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Bitcoin last prices',
      align: 'left',
    },
    xaxis: {
      type: 'time',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  get series() {
    console.log(this.candles)
    const series = [{
      data: this.candles
    }]

    return series
  }
}
</script>

<style></style>
