<template>
  <div>
    <div class="box">
      <!--<div class="banner_high">
            <img src="">
        </div> -->
    <h1>เข้าสู่ระบบ</h1>
    <div class="in">
      <label for="name">กรอกอีเมล</label>
      <div>
        <input type="email" name="email" v-model="user.email">
      </div>
      <div class="button_action">
        <button @click="user.email = user.email+'@bumail.net' ">@bumail.net</button> 
        <button @click="user.email = user.email+'@gmail.com' ">@gmail.com</button>  
        <button @click="user.email = user.email+'@hotmail.com' ">@hotmail.com</button>
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
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      }
    }
  },
    methods:{
      async LoginUser()
      {
        console.log(this.user.email)
        console.log(this.user.password)
        const bodyraw = {
          email: this.user.email,
          password: this.user.password
        }
        await this.$axios.post(this.$API_URL+'/login', bodyraw)
        .then(response => {
          console.log(response)
          let jsonData = JSON.stringify(response.data)
          localStorage.setItem("profiles", jsonData)
          let logProfile = JSON.parse(jsonData)
          console.log("token :",logProfile.token)
        })
        .catch(error => {
          console.log(error)
        });
        
      }
    },
    mounted(){
      console.log("Loging",this.$API_URL)
    }
}
</script> 


