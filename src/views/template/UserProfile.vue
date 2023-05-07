<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green" :inputUser="inputUser" :getProfile="getProfile" > </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card :user="inputUser"> </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/views/template";

export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  data() {
    return {
      inputUser: {
        email: '',
        lastname: '',
        firstname: '',
        address: '',
        phone: '',
        lineid: '',
      }
    }
  },
  methods: {
    getProfile(){
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      }
      this.$axios.get(this.$API_URL + '/getprofile',headers).then((res) => {
        localStorage.setItem("profiles", JSON.stringify(res.data.data))
      })
    }
  },
  created() {
    const profiles = JSON.parse(localStorage.getItem('profiles'))
    this.getProfile()
    this.inputUser.email = profiles.email
    this.inputUser.firstname = profiles.first_name
    this.inputUser.lastname = profiles.last_name
    this.inputUser.phone = profiles.phone
    this.inputUser.lineid = profiles.Line_id
  }
};
</script>
