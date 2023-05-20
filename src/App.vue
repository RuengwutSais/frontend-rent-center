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
    titleTemplate: '%s',
    meta: [
        {
          name: 'description',
          content: 'ยินดีต้อนรับสู่เว็บไซต์ศูนย์รวมข้อมูลที่อยู่อาศัยให้เช่า เว็บไซต์นี้ จัดทำขึ้นและดำเนินการโดย กลุ่มผู้จัดทำโครงงานของมหาวิทยาลัยกรุงเทพ ภาควิชาเทคโนโลยีสารสนเทศ คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
        },
        {
          property: 'og:image',
          content: 'https://cdn.discordapp.com/attachments/879213731219902515/1109515376565428245/bangkok-background.png',
        },
      ],
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

