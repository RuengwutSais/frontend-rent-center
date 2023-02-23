<template>
    <div>
    <ul>
      <li v-for="message in messages" :key="message.message_id">{{ message.sender_id }}: {{ message.message }}</li>
    </ul>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="newMessage" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
// import io from 'socket.io'
// eslint-disable-next-line
export default {
  data() {
    return {
      messages: [],
      newMessage: ''
    };
  },
  mounted() {
    const userone = 'gubankkub'
    this.$socket.emit('connection', {userone: userone});
    this.$socket.on('connection', userone, () => {    
    //   console.log(`Connected to the server: ${this.socket.id}`);
    })
    this.$socket.on('disconnect', () => {
      console.log(`Disconnected from the server: ${this.socket.id}`);
    });
  
    this.$socket.on('receiveMessage', (conversationId, senderId, message) => {
      this.messages.push({ conversation_id: conversationId, sender_id: senderId, message });
    });
  },
  methods: {
    sendMessage() {
      const conversationId = 1; // Replace this with the actual conversation id
      const senderId = 1; // Replace this with the actual sender id
  
      this.$socket.emit('sendMessage', conversationId, senderId, this.newMessage);
      this.newMessage = '';
    }
  },
}
</script>

<style>

</style>