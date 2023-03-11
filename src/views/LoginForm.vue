<template>
  <div class="login-wrapper">
    <div class="box">
    <h1>เข้าสู่ระบบ</h1>
    <div class="in">
      <label for="name">กรอกอีเมล</label>
      <div>
        <input type="email" name="email" v-model="user.email" placeholder="อีเมล">
      </div>
    </div>
    <div class="in">
      <label for="name">กรอกรหัสผ่าน</label>
      <div>
        <input type="password" name="password" v-model="user.password" placeholder="อย่างน้อย 8 ตัวอักษร" required> 
      </div>
    </div>
    <div class="check_bar">
      <div>
        <input type="checkbox" name="" id="">
        <label for="">จดจำฉัน</label>
      </div>
    </div>
    <button class="log" @click="LoginUser">เข้าสู่ระบบ</button>
    <span>หากยังไม่มีบัญชี <a href="/register">สมัครสมาชิก</a> </span> 
  </div>
 </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      }
    }
  },
  validations: {
    user: {
      email : required,
      password : required
    }
  },
    methods:{
      async LoginUser()
      {
        const bodyraw = {
          email: this.user.email,
          password: this.user.password
        }
        await this.$axios.post(this.$API_URL+'/login', bodyraw)
        .then(async res => {
          const status = res.data.status
          if(status) {
            const jsonData = res.data.data
            const token = jsonData['token']
            delete jsonData.token
            await localStorage.setItem("profiles", JSON.stringify(jsonData))
            await localStorage.setItem("token", token)
            console.log('doing first')
            if(localStorage.getItem("profiles")) {
              this.$router.push('/landingpage')
            }
          }
        })
        .catch(error => {
          console.log('what error', error.response.data)
          // TODO doing something if error
        });
        
      }
    },
    mounted(){
      if(JSON.parse(localStorage.getItem('profiles'))) {
        this.$router.push('/landingpage')
      }
    }
}
</script>

