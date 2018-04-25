<template lang="pug">
.chatbox
  .chatbox__header hola
  .chatbox__content mundo
  .chatbox__footer que tal
</template>

<script>
export default {
  name: 'chatbox',
  data(){
    return {
      msg: "hello world"
    }
  }
}
</script>

<style lang="scss">
  .chatbox{
    background: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 0 auto;
    border-radius: 2px;
    height: 62vh;
    display: flex;
    justify-content:space-between;
    flex-basis: 70vw;
    flex-direction: column;
    &__header{
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    &__content{
      padding: 1rem;
    }
    &__footer{
      padding: 1rem;
      border-top: 1px solid #eee;
    }
  }
</style>