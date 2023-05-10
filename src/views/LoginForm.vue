<template>
  <div class="login-wrapper">
    <div class="box">
      <h1>เข้าสู่ระบบ</h1>
      <div class="in">
        <label for="name">กรอกอีเมล</label>
        <div>
          <input
            type="email"
            name="email"
            v-model="user.email"
            placeholder="อีเมล"
          />
        </div>
      </div>
      <div class="in">
        <label for="name">กรอกรหัสผ่าน</label>
        <div>
          <input
            class="passwordInput"
            type="password"
            name="password"
            v-model="user.password"
            placeholder="อย่างน้อย 8 ตัวอักษร"
            required
          />
          <span class="toggle-password" @click="togglePassword()">
            <i class="far fa-eye"></i>
          </span>
        </div>
      </div>
      <div class="div-check-bar">
        <div>
          <input type="checkbox" id="remember-me" v-model="rememberMe" />
          <label for="">จดจำฉัน</label>
        </div>
      </div>
      <button class="log" @click="LoginUser">เข้าสู่ระบบ</button>
      <span>หากยังไม่มีบัญชี <a href="/register">สมัครสมาชิก</a> </span>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        emailError: "",
      },
      rememberMe: false,
    };
  },
  validations: {
    user: {
      email: required,
      password: required,
    },
  },
  methods: {
    async LoginUser() {
      const bodyraw = {
        email: this.user.email,
        password: this.user.password,
      };
      await this.$axios
        .post(this.$API_URL + "/login", bodyraw)
        .then(async (res) => {
          const status = res.data.status;
          if (status) {
            const jsonData = res.data.data;
            const token = jsonData["token"];
            delete jsonData.token;
            await localStorage.setItem("profiles", JSON.stringify(jsonData));
            await localStorage.setItem("token", token);
            console.log("doing first");
            if (localStorage.getItem("profiles")) {
              this.$router.push("/landingpage");
            }
          }
        })
        .catch((error) => {
          console.log("what error", error.response.data);
        });
      if (this.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    },
    togglePassword() {
      const passwordInput = document.querySelector(".passwordInput");
      const togglePassword = document.querySelector(".toggle-password");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.innerHTML = '<i class="far fa-eye-slash"></i>';
      } else {
        passwordInput.type = "password";
        togglePassword.innerHTML = '<i class="far fa-eye"></i>';
      }
      console.log("Click Eye");
    },
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("profiles"))) {
      this.$router.push("/landingpage");
    }
    if (localStorage.getItem("rememberMe") === "true") {
      this.rememberMe = true;
    }
  },
};
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/_loginstyle.scss");
</style>
