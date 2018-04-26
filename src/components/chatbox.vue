<template lang="pug">
.chatbox
  .chatbox__header hola
  .chatbox__content
    ul.chatbox__content__container
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
      const base = "http://localhost:8081";
      const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      };
      fetch(base + "/send", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          q: this.question
        })
      }).then(response => {
        return response.json();
      }).then(result => {
        const intent = result.current_response.intent_info.name;
        const entities = result.current_response.parameters.entities;

        this.items.push({
          message: result.current_response.default_answer,
          from: "bot"
        });

        //for (let i = 0; i < entities.length; i++) {
          return fetch(base + "/pokeapi/" + intent + "/" + entities[0].name);
        //}
      }).then(response => {
        return response.json();
      }).then(result => {
        this.items.push({
          message: result.data,
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
      &__container{
        list-style: none;
        display: flex;
        flex-direction: column-reverse;
      }
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