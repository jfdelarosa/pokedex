<template lang="pug">
.chatbox
  .chatbox__header hola
  ul.chatbox__content
    li.chatbox__content__message(:class="item.from" v-for="item in items") {{item.message}}
  .chatbox__footer
    form(v-on:submit.prevent="formSubmit")
      input.chatbox__footer__input(placeholder="Escribe una pregunta..." v-model="question")
      button.chatbox__footer__button Enviar
</template>

<script>
export default {
  name: 'chatbox',
  data(){
    return {
      question: "",
      items: []
    }
  },
  mounted(){
    
  },
  methods: {
    formSubmit(){
      fetch("http://localhost:8081/send", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: this.question
        })
      }).then(response => {
        return response.json();
      }).then(result => {
        this.items.push({
          message: result.current_response.message,
          from: "bot"
        });
      });
      this.items.push({
        message: this.question,
        from: "me"
      });
      this.question = "";
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
      overflow: auto;
      transform: rotate(180deg);
      direction: rtl;
      list-style: none;
      display: flex;
      flex-direction: column-reverse;
      &__message{
        transform: rotate(180deg);
        direction: ltr;
        padding: 0.5rem 1rem;
        margin-bottom: 0.5rem;
        $radius: 6px;
        &.me{
          align-self: flex-end;
          background: #69dc9e;
          border-radius: $radius;
          border-top-right-radius: 0;
        }
        &.bot{
          align-self: flex-start;
          background: #50d8d7;
          border-radius: $radius;
          border-top-left-radius: 0;
        }
      }
    }
    &__footer{
      padding: 1rem;
      border-top: 1px solid #eee;
      form{
        display: flex;
      }
      &__input, &__button{
        display: inline-block;
        padding: 0.5rem 1rem;
      } 
      &__input{
        flex-grow: 4;
        border-radius: 5px;
        margin-right: 1rem;
        border: 1px solid #c3c3c3;        
      }
      &__button{
        flex-grow: 1;
        border-radius: 5px;
        color: white;
        background: #2c9fdd;
        border: none;
      }
    }
  }
</style>