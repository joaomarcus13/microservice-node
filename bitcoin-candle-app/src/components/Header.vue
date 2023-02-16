<template>
  <div id="header">
    <img :src="logo || 'https://static.vecteezy.com/system/resources/previews/008/505/801/original/bitcoin-logo-color-illustration-png.png'" alt="bitcoin logo" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import logo from '../assets/logo.png'
@Options({
  components: {
  },
})
export default class Header extends Vue {
  
}
</script>

<style>
   #header {
  background-image: linear-gradient(to right, #4d05e8, #4871f7);
  padding: 30px 10px;
  margin-bottom: 10px;
}

#header * {
  vertical-align: middle;
}

#header img {
  width: 70px;
}

#header span {
  font-family: "header";
  color: white;
  font-size: 200%;
  margin-left: 20px;
  text-shadow: 2px 2px #333;
}
</style>
