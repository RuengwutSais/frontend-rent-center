<template>
    <div class="register-wrapper">
      <div class="box">
        <h1>สมัครสมาชิก</h1>
        <div class="in">
          <label for="name">*กรอกชื่อจริง</label>
          <div>
            <input
              v-model="user.firstname"
              type="text"
              placeholder="ชื่อจริง"
              maxlength="25"
              :class="{ input_error: $v.user.firstname.$error }"
            />
          </div>
          <div v-if="$v.user.firstname.$error">
              <div v-if="!$v.user.firstname.required">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">
                      กรุณากรอกชื่อจริง
                  </p>
              </div>
          </div>
          <label for="name">*กรอกนามสกุล</label>
          <div>
            <input
              v-model="user.lastname"
              type="text"
              placeholder="นามสกุล"
              maxlength="25"
              :class="{ input_error: $v.user.lastname.$error }"
            />
          </div>
          <div v-if="$v.user.lastname.$error">
              <div v-if="!$v.user.lastname.required">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">
                      กรุณากรอกนามสกุล
                  </p>
              </div>
          </div>
        </div>
        <div class="in">
          <label for="name">*กรอกอีเมล</label>
          <div>
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              v-model="user.email"
              @blur="validateEmail"
              :class="{ input_error: $v.user.email.$error }"
            />
          </div>
          <div v-if="$v.user.email.$error">
              <div v-if="!$v.user.email.required">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">
                      กรุณากรอกอีเมล
                  </p>
              </div>
              <div v-if="!$v.user.email.email">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">
                      กรุณากรอกอีเมลให้ถูกต้อง
                  </p>
              </div>
          </div>
        </div>
        <div class="in">
          <label for="name">*กรอกรหัสผ่าน</label>
          <div>
            <input
              v-model="user.password"
              type="password"
              placeholder="รหัสผ่าน"
              required
              :class="{ input_error: $v.user.passowrd.$error }"
            />
          </div>
          <div v-if="$v.user.passowrd.$error">
              <div v-if="!$v.user.password.required">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">กรุณากรอกรหัสผ่าน</p>
              </div>
          </div>
          <div class="password_bar">
            <div :class="{ bar: true, green: user.password.length > 2 }"></div>
            <div :class="{ bar: true, green: user.password.length > 4 }"></div>
            <div :class="{ bar: true, green: user.password.length > 6 }"></div>
            <div :class="{ bar: true, green: user.password.length > 8 }"></div>
            <div :class="{ bar: true, green: user.password.length > 10 }"></div>
          </div>
          <label for="name">*กรอกรหัสผ่านอีกครั้ง</label>
          <div>
            <input
              v-model="user.confirmPass"
              type="password"
              placeholder="รหัสผ่านอีกครั้ง"
              @blur="checkConfirmPass"
              required
              :class="{ input_error: $v.user.confirmPass.$error }"
            />
          </div>
          <div v-if="$v.user.confirmPass.$error">
              <div v-if="!$v.user.confirmPass.required">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">กรุณากรอกรหัสผ่านยืนยัน</p>
              </div>
          </div>
        </div>
        <div class="in">
          <label for="name">*กรอกเบอร์โทรศัพท์</label>
          <div>
            <input
              maxlength="10"
              v-model="user.phoneNumber"
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              @input="filterNumber"
              @blur="validatePhone"
              :class="{ input_error: $v.user.phoneNumber.$error }"
            />
          </div>
          <div v-if="$v.user.phoneNumber.$error">
              <div v-if="!$v.user.phoneNumber.required">
                  <i class="fa-solid fa-circle-xmark error-icon"></i>
                  <p class="message_error">กรุณากรอกเบอร์โทรศัพท์</p>
              </div>
          </div>
        </div>
        <button class="log" @click="registerUser">สมัครสมาชิก</button>
        <span>หากมีบัญชีอยู่แล้ว <a href="/login">เข้าสู่ระบบ</a> </span>
      </div>
    </div>
  </template>
  
  <script>
  import { required, email, minLength } from "vuelidate/lib/validators"
  export default {
    data() {
      return {
        user: {
          email: "",        
          password: "",        
          confirmPass: "",
          passwordMismatch: false,
          firstname: "",        
          lastname: "",
          phoneNumber: "",
        },
      };
    },
    validations: {
      user: {
          email: { required, email },
          password: { required },
          confirmPass: { required },
          firstname: { required },
          lastname: { required },
          phoneNumber: { required, minLength: minLength(9) }
      }
    },
    toggle() {
      this.isActive = !this.enable;
    },
    methods: {
      validateEmail() {
        let emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.user.email) {
          this.user.emailError = "กรุณากรอกอีเมล";
        } else if (!emailRegex.test(this.user.email)) {
          this.user.emailError = "กรุณากรอกอีเมลที่ถูกต้อง";
        } else {
          this.user.emailError = "";
        }
      },
      validateFirstName() {
        if (!this.user.firstname) {
          this.user.firstnameError = "กรุณากรอกชื่อจริง";
        } else {
          this.user.firstnameError = "";
        }
      },
      validateLastName() {
        if (!this.user.lastname) {
          this.user.lastnameError = "กรุณากรอกนามสกุล";
        } else {
          this.user.lastnameError = "";
        }
      },
      validatePassword() {
        if (!this.user.password || this.user.password.length < 8) {
          this.user.passwordError = "กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร";
        } else {
          this.user.passwordError = "";
        }
      },
      checkConfirmPass() {
        this.user.passwordMismatch = this.user.password !== this.user.confirmPass;
      },
      filterNumber() {
        this.user.phoneNumber = this.user.phoneNumber.replace(/[^\d]/g, "");
      },
      validatePhone() {
        if (!this.user.phoneNumber) {
          this.user.phoneError = "กรุณากรอกเบอร์โทรศัพท์";
        } else {
          this.user.phoneError = "";
        }
      },
      async registerUser() {
          this.$v.user.$touch()
          if (this.$v.user.$invalid) {
              return false
          }
  
          // console.log("firstname: " + this.user.firstname);
          // console.log("lastname: " + this.user.lastname);
          // console.log("email: " + this.user.email);
          // console.log("password: " + this.user.password);
          // console.log("phone: " + this.user.phoneNumber);
  
        
          // const bodyraw = {
          //   first_name: this.user.firstname,
          //   last_name: this.user.lastname,
          //   email: this.user.email,
          //   password: this.user.password,
          //   phone: this.user.phoneNumber,
          // };
          // await this.$axios
          //   .post(this.$API_URL + "/register", bodyraw)
          //   .then((response) => {
          //     console.log("respon1:", response);
          //   })
          //   .catch((error) => {
          //     console.log("respon error", error);
          //     // const userRespon = error.response.data
          //     // console.log('respon2:',userRespon)
          //   });
        
      },
    },
    mounted() {
     if(JSON.parse(localStorage.getItem("profiles"))){
      this.$router.push('/landingpage')
     }
    }
  };
  </script>
  