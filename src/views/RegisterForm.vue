<template>
    <div>
        <div class="box">
       <!--<div class="banner_high">
            <img src="">
        </div> -->
        <h1>สมัครสมาชิก</h1>
        <div class="in">
            <label for="name">*กรอกชื่อจริง</label>
            <div>
                <input v-model="user.firstname" type="text" placeholder="ชื่อจริง" maxlength="25" @blur="validateFirstName" :class="{'input_error': user.firstnameError}">
            </div>
            <div v-if="user.firstnameError">
                <i class="fa-solid fa-circle-xmark error-icon"></i>
                <p class="message_error">{{ user.firstnameError }}</p>
            </div>
            <label for="name">*กรอกนามสกุล</label>
            <div>
                <input v-model="user.lastname" type="text" placeholder="นามสกุล" maxlength="25" @blur="validateLastName" :class="{'input_error': user.lastnameError}">
            </div>
            <div v-if="user.lastnameError">
                <i class="fa-solid fa-circle-xmark error-icon"></i>
                <p class="message_error">{{ user.lastnameError }}</p>
            </div>
        </div>
        <div class="in">
            <label for="name">*กรอกอีเมล</label>
            <div>
                <input type="email" name="email" placeholder="อีเมล" v-model="user.email" @blur="validateEmail" :class="{'input_error': user.emailError}">
            </div>
            <div v-if="user.emailError">
                <i class="fa-solid fa-circle-xmark error-icon"></i>
                <p class="message_error">{{ user.emailError }}</p>
            </div>
        </div>
        <div class="in">
            <label for="name">*กรอกรหัสผ่าน</label>
            <div>
                <input v-model="user.password" type="password" placeholder="รหัสผ่าน" required @blur="validatePassword" :class="{'input_error': user.passwordError}"/>
            </div>
            <div v-if="user.passwordError">
                <i class="fa-solid fa-circle-xmark error-icon"></i>
                <p class="message_error">{{ user.passwordError }}</p>
            </div>
            <div class="password_bar">
                <div :class="{'bar':true, 'green':(user.password.length > 2)}" ></div> 
                <div :class="{'bar':true, 'green':(user.password.length > 4)}" ></div> 
                <div :class="{'bar':true, 'green':(user.password.length > 6)}" ></div>  
                <div :class="{'bar':true, 'green':(user.password.length > 8)}" ></div> 
                <div :class="{'bar':true, 'green':(user.password.length > 10)}" ></div> 
            </div>
            <label for="name">*กรอกรหัสผ่านอีกครั้ง</label>
            <div>
                <input v-model="user.confirmPass" type="password" placeholder="รหัสผ่านอีกครั้ง" @blur="checkConfirmPass" required :class="{'input_error': user.passwordMismatch}"/>
            </div>
            <div v-if="user.passwordMismatch">
                <i class="fa-solid fa-circle-xmark error-icon"></i>
                <p class="message_error">รหัสผ่านไม่ตรงกัน ,กรุณากรอกอีกครั้ง</p>
            </div>
        </div>
        <div class="in">
            <label for="name">*กรอกเบอร์โทรศัพท์</label>
            <div>
                <input maxlength="10" v-model="user.phoneNumber" type="tel" placeholder="เบอร์โทรศัพท์" @input="filterNumber" @blur="validatePhone" :class="{'input_error': user.phoneError}">
            </div>
            <div v-if="user.phoneError">
                <i class="fa-solid fa-circle-xmark error-icon"></i>
                <p class="message_error">{{ user.phoneError }}</p>
            </div>
        </div>
        <button class="log" @click="registerUser">สมัครสมาชิก</button>
        <span>หากมีบัญชีอยู่แล้ว <a href="/login">เข้าสู่ระบบ</a> </span> 
    </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                user:{
                    email: "",
                    emailError: "",
                    password: "",
                    passwordError: "",
                    confirmPass: "",
                    passwordMismatch: false,
                    firstname: "",
                    firstnameError: "",
                    lastname: "",
                    lastnameError: "",
                    phoneNumber: "",
                    phoneError: "",
                }
                
            }
        },
        toggle() {
            this.isActive = ! this.enable ;
        },
        methods: {
            validateEmail()
            {
                let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!this.user.email){
                    this.user.emailError = 'กรุณากรอกอีเมล'
                }
                else if (!emailRegex.test(this.user.email)) 
                {
                    this.user.emailError = 'กรุณากรอกอีเมลที่ถูกต้อง'
                } 
                else 
                {
                    this.user.emailError = ''
                }
            },
            validateFirstName(){
                if(!this.user.firstname)
                {
                    this.user.firstnameError = 'กรุณากรอกชื่อจริง'
                }
                else
                {
                    this.user.firstnameError = ''
                }
            },
            validateLastName(){
                if(!this.user.lastname)
                {
                    this.user.lastnameError = 'กรุณากรอกนามสกุล'
                }
                else
                {
                    this.user.lastnameError = ''
                }
            },
            validatePassword()
            {
                if(!this.user.password || this.user.password.length < 8 )
                {
                    this.user.passwordError = 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร'
                }
                else
                {
                    this.user.passwordError = ''
                }
                
            },
            checkConfirmPass()
            {
                this.user.passwordMismatch = this.user.password !== this.user.confirmPass;
            },
            filterNumber() 
            {
                this.user.phoneNumber = this.user.phoneNumber.replace(/[^\d]/g, '')
            },
            validatePhone()
            {
                if(!this.user.phoneNumber)
                {
                    this.user.phoneError = 'กรุณากรอกเบอร์โทรศัพท์'
                }
                else{
                    this.user.phoneError = ''
                }
            },

            async registerUser(){
                if(this.user.email && this.user.firstname && this.user.lastname && this.user.password === this.user.confirmPass)
                {

                    console.log('firstname: '+this.user.firstname)
                    console.log('lastname: '+this.user.lastname)
                    console.log('email: '+this.user.email)
                    console.log('password: '+this.user.password)
                    console.log('phone: '+this.user.phoneNumber)
                    const bodyraw = {
                    first_name: this.user.firstname,
                    last_name: this.user.lastname,
                    email: this.user.email,
                    password: this.user.password,
                    phone: this.user.phoneNumber
                }
                await this.$axios.post(this.$API_URL+'/register', bodyraw)
                .then(response => {
                    console.log('respon1:',response)
                    
                    
                    
                })
                .catch(error => {
                    console.log('respon error',error)
                    // const userRespon = error.response.data
                    // console.log('respon2:',userRespon)
                });
                }
            else
                {
                    this.validateEmail();
                    this.validateFirstName();
                    this.validateLastName();
                    this.validatePassword();
                    this.validatePhone();
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
@import url('@/assets/scss/registerstyle.scss');
</style>
