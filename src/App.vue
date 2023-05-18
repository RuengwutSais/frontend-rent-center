<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo: {
    title: 'RESIDENCE RENT CENTER', 
    titleTemplate: '%s'
  },
  mounted() {
    const profile = JSON.parse(localStorage.getItem('profiles'));
    const token = localStorage.getItem('token')
    if(profile && token) {
      console.log('really: ')
      const userId = profile.user_id
      console.log('user_id: ', userId)

      // เอาไว้ส่ง ข้อมูล
      this.$socket.emit('connection', {user_id: profile.user_id});
  
      // เอาไว้รับ
      this.$socket.on('connection', (data) => {    
        console.log('data: ', data)
      })

      this.$socket.on('disconnect', () => {
        console.log(`Disconnected from the server: ${this.socket.id}`);
        this.$socket.emit('disconnect', { user_id: userId });
      });

      this.$socket.on('receiveMessage', (conversationId, senderId, message) => {
        this.messages.push({ conversation_id: conversationId, sender_id: senderId, message });
      });
    }
  }
}
</script>

