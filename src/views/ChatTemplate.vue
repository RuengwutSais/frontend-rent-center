<template>
  <div class="chat">
    <div class="conversation-list">
      <div
        class="conversation"
        v-for="(conversation, index) in last_chat"
        :key="index"
        :class="{ active: index === tabActive }"
        @click="
          setCurrentConversation(
            conversation.user_one === myUser.user_id
              ? conversation.user_one
              : conversation.user_two,
            index,
            conversation.conversation_id
          )
        "
      >
        <div
          class="d-flex flex-row mt-3"
          v-if="conversation.user_one === myUser.user_id"
          @click="loadMessage(conversation.user_two)"
        >
          <img
            class="avatar"
            :src="
              conversation.user_two_info.image_profile
                ? linkImage(conversation.user_two_info.image_profile)
                : require('../assets/img/user_avatar.png')
            "
            alt=""
          />
          <div class="details">
            <div class="name">
              {{
                conversation.user_two_info.first_name +
                " " +
                conversation.user_two_info.last_name
              }}
            </div>
            <div class="message">{{ conversation.messages[0].message }}</div>
            <div class="time">{{  formattedDate(conversation.created_at) }}</div>
          </div>
        </div>
        <div
          class="d-flex flex-row mt-3"
          v-else-if="conversation.user_two === myUser.user_id"
          @click="loadMessage(conversation.user_one)"
        >
          <img
            class="avatar"
            :src="
              conversation.user_one_info.image_profile
                ? linkImage(conversation.user_one_info.image_profile)
                : require('../assets/img/user_avatar.png')
            "
            alt=""
          />
          <div class="details">
            <div class="name">
              {{
                conversation.user_one_info.first_name +
                " " +
                conversation.user_one_info.last_name
              }}
            </div>
            <div class="message">{{ conversation.messages[0].message }}</div>
            <div class="time">{{ formattedDate(conversation.created_at) }}</div>
          </div>
        </div>
        <!-- <div class="d-flex flex-row">
          <img class="avatar" :src="conversation.avatar" alt="">
          <div class="details">
            <div class="name">{{ conversation.name }}</div>
            <div class="message">{{ conversation.lastMessage.content }}</div>
            <div class="time">{{ conversation.lastMessage.time }}</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="chat-window" v-if="currentConversation" ref="chatWindow">
      <div class="header">
        <img class="avatar" :src="currentConversation.avatar" alt="" />
        <div class="info">
          <div class="name">{{ currentConversation.name }}</div>
          <div class="status">{{ currentConversation.status }}</div>
        </div>
      </div>
      <div class="messages" ref="messageContainer">
        <div
          class="message"
          v-for="(message, index) in chatRealtime"
          :key="index"
          :class="{ outgoing: message.messages[0].message_type === 'me' }"
        >
          <img
            class="avatar"
            :src="
              message.user_one == myUser.user_id
                ? linkImage(message.user_one_info.image_profile)
                : message.user_one != myUser.user_id &&
                  message.user_one_info.image_profile
                ? linkImage(message.user_one_info.image_profile)
                : require('../assets/img/user_avatar.png')
            "
            alt=""
          />
          <div class="content">{{ message.messages[0].message }}</div>
        </div>
      </div>
      <div class="input">
        <input
          type="text"
          placeholder="พิมพ์ข้อความ..."
          v-model="newMessage"
          @keyup.enter="sendMessage()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "ChatPage",
  data() {
    return {
      conversations: [
        {
          id: 1,
          name: "Alice",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          status: "online",
          lastMessage: {
            content: "Hi there! How are you?",
            time: "9:30 AM",
          },
          messages: [
            {
              id: 1,
              from: "me",
              content: "I'm good. How about you?",
              time: "9:35 AM",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
              id: 2,
              from: "other",
              content: "I'm doing well, thanks for asking!",
              time: "9:37 AM",
              avatar: "https://randomuser.me/api/portraits/women/22.jpg",
            },
          ],
        },
        {
          id: 2,
          name: "Bob",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          status: "offline",
          lastMessage: {
            content: "See you later!",
            time: "Yesterday",
          },
          messages: [
            {
              id: 1,
              from: "other",
              content: "Goodbye!",
              time: "Yesterday",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
              id: 2,
              from: "me",
              content: "ค!",
              time: "Yesterday",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            },
          ],
        },
      ],
      myUser: [],
      last_chat: [],
      chatRealtime: [],
      currentConversation: null,
      tabActive: null,
      tempConverId: null,
      newMessage: "",
      tempId: "",
    };
  },
  methods: {
    linkImage(image) {
      return this.$API_URL + "/" + image;
    },
    setCurrentConversation(conversation, index, tempConverId) {
      this.currentConversation = conversation;
      this.tabActive = index;
      this.tempConverId = tempConverId;
    },
    async sendMessage() {
      const form_send_to = {
        user_one: this.myUser.user_id,
        user_two: this.tempId,
        message: this.newMessage,
      };
      console.log("this.tempId: ", this.tempId);
      this.currentConversation = this.tempId;
      this.tabActive = 0;
      this.$socket.emit("sendMessage", form_send_to);
      this.newMessage = "";
      this.scrollChatToBottom();
    },
    scrollChatToBottom() {
      const messageContainer = this.$refs.messageContainer;
      messageContainer.scrollTop = messageContainer.scrollHeight;
    },
    gettingAllPeople() {
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      this.$axios.get(this.$API_URL + "/get/chat/", headers).then((res) => {
        this.last_chat = res.data.chat;
      });
    },
    async loadMessage(id) {
      this.tempId = id;
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      await this.$axios
        .post(this.$API_URL + `/1on1/${id}`, {}, headers)
        .then((res) => {
          console.log(res.data);
          this.chatRealtime = res.data.chat;
          console.log("chat realtime: ", this.chatRealtime);
        });
      await this.scrollChatToBottom();
    },
    showImageUser(message) {
      if (message.user_two !== this.myUser.user_id) {
        return "../assets/img/user_avatar.png";
      }
      return message.user_two_info.image_profile !== null
        ? message.user_two_info.image_profile
        : "../assets/img/user_avatar.png";
    },
    formattedDate(date) {
      const momentDate = moment(date);
      const day = momentDate.format('D');
      const month = momentDate.format('MMM');
      const year = momentDate.format('YYYY');
      const time = momentDate.format('HH:mm');
      console.log(month)
      const thaiMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
      ];

      const thaiMonth = thaiMonths[momentDate.month()];

      return `${day} ${thaiMonth} ${year} : ${time} `;
    }
  },
  mounted() {
    const myUser = JSON.parse(localStorage.getItem("profiles"));
    this.myUser = myUser;
    this.gettingAllPeople();

    this.$socket.on("reloadMessage", (data) => {
      this.chatRealtime = data;
      console.log("reloadMessage");
      this.$nextTick(() => {
        this.scrollChatToBottom();
      });
      const length = data.length;
      this.tempConverId = data[length - 1].conversation_id;
      console.log("this.tempConverId: active when chat: ", this.tempConverId);
    });
    this.$socket.on("loadChatAllFromOne", (data) => {
      this.last_chat = data;
    });
    this.$socket.on("loadChatAllFromTwo", (data) => {
      const findConId = data.findIndex(
        (find) => find.conversation_id === this.tempConverId
      );
      this.last_chat = data;
      this.tabActive = findConId;
    });
    this.$socket.on("sendTo", async (data, checkUserActive) => {
      if (checkUserActive === this.currentConversation) {
        console.log("doing จิงอะปาว");
        this.chatRealtime = data;
        this.$nextTick(() => {
          this.scrollChatToBottom();
        });
      }
      // this.scrollChatToBottom()
    });

  },
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  height: 92vh;
  font-family: 'Kanit';

  .conversation-list {
    flex-basis: 30%;
    background-color: #f0f2f5;
    padding: 0.5rem;

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
        justify-content: center;
        align-items: center;

        .avatar {
          width: 2rem;
          height: 2rem;
          margin-right: 0.5rem;
          border-radius: 50%;
        }

        .content {
          flex-grow: 1;
          background-color: #f0f2f5;
          padding: 0.5rem;
          border-radius: 1rem;
          text-align: start;

        }

        &.outgoing {
          flex-direction: row-reverse;

          .content {
            background-color: #0084ff;
            color: #fff;
            text-align: end;
          }
          .avatar {
            margin-right: 0;
            margin-left: 0.5rem;
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
