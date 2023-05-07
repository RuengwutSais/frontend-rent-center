<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">โปรไฟล์</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>อีเมล</label>
              <md-input v-model="inputUser.email" type="email" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>ชื่อ</label>
              <md-input v-model="inputUser.firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>นามสกุล</label>
              <md-input v-model="inputUser.lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>เบอร์โทรศัพท์</label>
              <md-input v-model="inputUser.phone" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>LineId</label>
              <md-input v-model="inputUser.lineid" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="updateProfile">Update Profile</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
    inputUser: {
      type: Object
    },
    getProfile: {
      type: Function
    }
  },
  methods: {
    updateProfile() {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      }
      const bodyJson = {
        email: this.inputUser.email,
        first_name: this.inputUser.firstname,
        last_name: this.inputUser.lastname,
        phone: this.inputUser.phone,
        Line_id: this.inputUser.lineid
      }
      this.$axios.post(this.$API_URL + "/edit/profile", bodyJson, headers).then((res) => {
        console.log('res: ', res)
        this.getProfile()
      })
    }
  }
};
</script>
<style></style>
