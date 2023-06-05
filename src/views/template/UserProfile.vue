<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green" :inputUser="inputUser" :getProfile="getProfile" > </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card @getProfile="getProfile" :image="linkImage" :user="inputUser"> </user-card>
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
        image_profile: ''
      }
    }
  },
  computed: {
    linkImage() {
      if(this.inputUser.image_profile) {
        return this.$API_URL +  '/' + this.inputUser.image_profile
      }
      return null
    },
  },
  methods: {
    async getProfile(){
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      }
      await this.$axios.get(this.$API_URL + '/getprofile',headers).then((res) => {
        localStorage.setItem("profiles", JSON.stringify(res.data.data))
        const profiles = JSON.parse(localStorage.getItem('profiles'))
        this.inputUser.email = profiles.email
        this.inputUser.firstname = profiles.first_name
        this.inputUser.lastname = profiles.last_name
        this.inputUser.phone = profiles.phone
        this.inputUser.lineid = profiles.Line_id
        this.inputUser.image_profile = profiles.image_profile
      })
    }
  },
  async mounted() {
    await this.getProfile()
    const profiles = JSON.parse(localStorage.getItem('profiles'))
    this.inputUser.email = profiles.email
    this.inputUser.firstname = profiles.first_name
    this.inputUser.lastname = profiles.last_name
    this.inputUser.phone = profiles.phone
    this.inputUser.lineid = profiles.Line_id
    this.inputUser.image_profile = profiles.image_profile
  }
};
</script>
