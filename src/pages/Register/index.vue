<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        Register a new user
        <span class="go"
          >I have an account
          <router-link target="_blank" to="/login">login</router-link>
        </span>
      </h3>
      <div class="content">
        <label>phone number:</label>
        <input
          placeholder="Please enter your phone number"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>Verification code:</label>
        <input
          placeholder="Please enter the received verification code"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button style="height: 38px; width: 150px; margin-left: 10px;" @click="getCode">
          Obtain verification code
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>Login password:</label>
        <input
          placeholder="Please enter the password"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[a-zA-Z]\w{5,17}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>Confirm password:</label>
        <input
          placeholder="Please enter the password"
          v-model="password1"
          name="password1"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          v-model="agree"
          name="agree"
          v-validate="{ required: true, agree: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>Agree to the agreement and register the Shangpinhui User Agreement</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">Complete registration</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>About Us</li>
        <li>Contact us</li>
        <li>Contact customer service</li>
        <li>Merchant settlement</li>
        <li>Marketing Center</li>
      </ul>
      <!-- <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "", //手机号
      code: "", //验证码
      password: "", //密码
      password1: "", //确认密码
      agree: true, //是否同意
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      try {
        let { phone } = this;
        phone && (await this.$store.dispatch("getCode", phone));
        //将组件code的属性值变为获取到的[验证码自己填写]
        this.code = this.$store.state.user.code;
      } catch (err) {
        alert(err.message);
      }
    },
    //用户注册
    async userRegister() {
      const success = await this.$validator.validateAll();
      //表单验证成功 向服务器发请求
      if (success) {
        try {
          const { phone, code, password} = this;
            (await this.$store.dispatch("userRegister", {
              phone,
              code,
              password,
            }));
          this.$router.push({ name: "login" });
        } catch (err) {
          alert(err.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 125px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>