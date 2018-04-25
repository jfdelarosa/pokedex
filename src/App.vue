<template lang="pug">
  #app
    header
    .black
    .container
      chatbox
</template>

<script>
import 'normalize.css';
import chatbox from './components/chatbox'

export default {
  name: 'App',
  components: {
    chatbox
  }
}
</script>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body{
  background: #e2e1e0;
}
header{
  background: #F2514B;
  height: 30vh;
}
.container{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.black{
  background: #272d2d;
  height: 8vh;
}
</style>
