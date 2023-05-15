<template>
  <div class="chat">
    <div class="conversation-list">
      <div class="conversation" v-for="(conversation, index) in conversations" :key="index" :class="{ 'active': conversation === currentConversation }" @click="setCurrentConversation(conversation)">
        <img class="avatar" :src="conversation.avatar" alt="">
        <div class="details">
          <div class="name">{{ conversation.name }}</div>
          <div class="message">{{ conversation.lastMessage.content }}</div>
          <div class="time">{{ conversation.lastMessage.time }}</div>
        </div>
      </div>
    </div>
    <div class="chat-window" v-if="currentConversation">
      <div class="header">
        <img class="avatar" :src="currentConversation.avatar" alt="">
        <div class="info">
          <div class="name">{{ currentConversation.name }}</div>
          <div class="status">{{ currentConversation.status }}</div>
        </div>
      </div>
      <div class="messages">
        <div class="message" v-for="(message, index) in currentConversation.messages" :key="index" :class="{ 'outgoing': message.from === 'me' }">
          <img class="avatar" :src="message.avatar" alt="">
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <div class="input">
        <input type="text" placeholder="Type a message" v-model="newMessage" @keyup.enter="sendMessage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  data() {
    return {
      conversations: [
        {
          id: 1,
          name: 'Alice',
          avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
          status: 'online',
          lastMessage: {
            content: 'Hi there! How are you?',
            time: '9:30 AM',
          },
          messages: [
            {
              id: 1,
              from: 'me',
              content: 'I\'m good. How about you?',
              time: '9:35 AM',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            {
              id: 2,
              from: 'other',
              content: 'I\'m doing well, thanks for asking!',
              time: '9:37 AM',
              avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            },
          ],
        },
        {
          id: 2,
          name: 'Bob',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          status: 'offline',
          lastMessage: {
            content: 'See you later!',
            time: 'Yesterday',
          },
          messages: [
            {
              id: 1,
              from: 'other',
              content: 'Goodbye!',
              time: 'Yesterday',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
          ],
        },
      ],
      currentConversation: null,
      newMessage: '',
    }
  },
  methods: {
    setCurrentConversation(conversation) {
      this.currentConversation = conversation;
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      const message = {
        id: this.currentConversation.messages.length + 1,
        from: 'me',
        content: this.newMessage,
        time: new Date().toLocaleTimeString(),
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      };
      this.currentConversation.messages.push(message);
      this.newMessage = '';
    },
    sendMessageWithSocket() {
      const conversationId = 1; // Replace this with the actual conversation id
      const senderId = 1; // Replace this with the actual sender id
  
      this.$socket.emit('sendMessage', conversationId, senderId, this.newMessage);
      this.newMessage = '';
    }
  },
  mounted() {
  },
};
</script>


<style lang="scss" scoped>
.chat {
  display: flex;
  height: 92vh;

  .conversation-list {
    flex-basis: 30%;
    background-color: #f0f2f5;
    padding: 1rem;

    .conversation {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #e8ebf1;
      }

      .avatar {
        width: 2rem;
        height: 2rem;
        margin-right: 1rem;
        border-radius: 50%;
      }

      .name {
        font-weight: bold;
      }

      .message {
        flex-grow: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .time {
        color: #8c8c8e;
      }

      &.active {
        background-color: #fff;
        font-weight: bold;
      }
    }
  }

  .chat-window {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .header {
      padding: 1rem;
      border-bottom: 1px solid #d3d3d3;

      .avatar {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
        border-radius: 50%;
      }

      .name {
        font-weight: bold;
        font-size: 1.5rem;
      }

      .status {
        color: #8c8c8e;
      }
    }

    .messages {
      flex-grow: 1;
      overflow-y: auto;
      padding: 1rem;

      .message {
        display: flex;
        margin-bottom: 1rem;

        .avatar {
          width: 2rem;
          height: 2rem;
          margin-right: 1rem;
          border-radius: 50%;
        }

        .content {
          flex-grow: 1;
          background-color: #f0f2f5;
          padding: 0.5rem;
          border-radius: 1rem;
        }

        &.outgoing {
          flex-direction: row-reverse;

          .content {
            background-color: #0084ff;
            color: #fff;
          }
        }
      }
    }

    .input {
      padding: 1rem;
      border-top: 1px solid #d3d3d3;

      input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 1rem;
        outline: none;
      }
    }
  }
}

</style>