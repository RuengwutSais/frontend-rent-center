<template>
  <div class="chat" :class="!showChatWindow ? 'block-chat' : 'flex-chat'">
    <div class="conversation-list" v-if="!showChatWindow">
      <div
      v-if="last_chat.length > 0"
      >
        <div
          class="conversation mt-2"
          v-for="(conversation, index) in last_chat"
          :key="index"
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
            class="d-flex flex-row py-2 px-3 w-100 white-background"
            v-if="conversation.user_one === myUser.user_id"
            @click="
              loadMessage(
                conversation.user_two,
                conversation.user_two_info.image_profile,
                conversation.user_two_info.first_name,
                conversation.user_two_info.last_name
              )
            "
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
              <div class="time">{{ formattedDate(conversation.created_at) }}</div>
            </div>
          </div>
          <div
            class="d-flex flex-row py-2 px-3 w-100 white-background"
            v-else-if="conversation.user_two === myUser.user_id"
            @click="
              loadMessage(
                conversation.user_one,
                conversation.user_one_info.image_profile,
                conversation.user_two_info.first_name,
                conversation.user_two_info.last_name
              )
            "
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
      <div v-else class="d-flex flex-column justify-content-center align-items-center h-100">
        <div class="w-250px">
          <img
            class="w-100"
            src="../assets/img/chat/emptyMessage.png"
            alt=""
          />
        </div>
        <div>
          <p class="kanit m-0">
            <strong> ไม่มีข้อความถึงคุณ </strong>
          </p>
        </div>
      </div>
    </div>
    <div class="chat-window" v-if="showChatWindow">
      <div class="header">
        <div class="back-button mb-2" @click="goBack">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <img class="avatar" :src="currentImage" alt="" />
        <div class="info">
          <div class="name">{{ currentName }}</div>
          <div class="status"></div>
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
          maxlength="50"
          @keyup.enter="sendMessage()"
        />
        <div class="sent-message">
          <b-button variant="primary" @click="sendMessage()">
            <i class="fa-solid fa-paper-plane"></i>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ChatPage",
  data() {
    return {
      conversations: [],
      myUser: [],
      last_chat: [],
      chatRealtime: [],
      currentConversation: null,
      tabActive: null,
      tempConverId: null,
      newMessage: "",
      tempId: "",
      currentImage: "",
      showChatWindow: false,
      currentName: "",
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
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
      if (this.newMessage === "") {
        return false;
      }
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
    async gettingAllPeople() {
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      await this.$axios
        .get(this.$API_URL + "/get/chat/", headers)
        .then((res) => {
          console.log('res: ', res)
          this.last_chat = res.data.chat;
        });
    },
    goBack() {
      // Toggle visibility of chat window
      this.showChatWindow = false;
    },
    async loadMessage(id, images, first_name, last_name) {
      this.showChatWindow = true;
      this.tempId = id;
      this.currentName = first_name + " " + last_name;
      this.currentImage = images
        ? this.linkImage(images)
        : require("../assets/img/user_avatar.png");
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
      const now = moment();
      const timeDiffMinutes = now.diff(momentDate, "minutes");
      const timeDiffHours = now.diff(momentDate, "hours");
      const timeDiffDays = now.diff(momentDate, "days");
      const timeDiffMonths = now.diff(momentDate, "months");
      if (timeDiffMinutes < 60) {
        return `${timeDiffMinutes} นาทีที่ผ่านมา`;
      } else if (timeDiffHours < 24) {
        return `${timeDiffHours} ชั่วโมงที่ผ่านมา`;
      } else if (timeDiffDays < 30) {
        return `${timeDiffDays} วันที่ผ่านมา`;
      } else if (timeDiffMonths < 12) {
        return `${timeDiffMonths} เดือนที่ผ่านมา`;
      }
    },
    activeFirst() {
      this.tabActive = 0;
      console.log("tihs.last_chat[0]: ", this.last_chat);
      this.last_chat[0].user_one === this.myUser.user_id
        ? this.loadMessage(
            this.last_chat[0].user_two,
            this.last_chat[0].user_two_info.image_profile,
            this.last_chat[0].user_two_info.first_name,
            this.last_chat[0].user_two_info.last_name
          )
        : this.loadMessage(
            this.last_chat[0].user_one,
            this.last_chat[0].user_one_info.image_profile,
            this.last_chat[0].user_one_info.first_name,
            this.last_chat[0].user_one_info.last_name
          );
    },
  },
  async mounted() {
    const myUser = JSON.parse(localStorage.getItem("profiles"));
    this.myUser = myUser;
    await this.gettingAllPeople();
    console.log("this.isMobile: ", this.isMobile);
    // if(!this.isMobile) {
    //   this.activeFirst();
    // }
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
.white-background {
  background: #fff;
  box-shadow: 0px 4px 24px rgba(136, 152, 170, 0.15);
}
.block-chat {
  display: block !important;
}
.flex-chat {
  display: flex;
}
.chat {
  display: flex;
  height: 92vh;
  font-family: "Kanit";
  flex-direction: row;
  width: 100%;

  .conversation-list {
    height: 100vh;
    overflow-y: auto;
    // flex-basis: 30%;
    // background-color: #fafafa;
    // width: 30%;

    .conversation {
      background-color: #fff;
      display: flex;
      align-items: center;
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
        white-space: normal;
        text-overflow: ellipsis;
      }

      .time {
        color: #8c8c8e;
      }

      &.active {
        background-color: #f8f8f8;
        font-weight: bold;
      }
    }
  }

  .chat-window {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    // width: 70%;

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
      padding: 1.5rem;

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
            white-space: normal;
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
      width: 100%;
      input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 1rem;
        outline: none;
      }
      .sent-message {
        position: absolute;
        bottom: 3%;
        right: 10px;
      }
    }
  }
  @media (max-width: 768px) {
    .chat-window {
      width: 100%;
    }
    .conversation-list {
      width: 100%;
    }
  }
}
// @media (max-width: 768px) {
// .chat {
//   flex-direction: column;
// }
// }
</style>
