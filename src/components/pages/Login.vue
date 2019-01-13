<template>
  <div>
    <form
      class="form-signin"
      @submit.prevent="signin"
    >
      <!-- 綁定登入事件 -->
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <label
        for="inputEmail"
        class="sr-only"
      >Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="user.username"
        required
        autofocus
      >
      <!-- 與定義資料結構及結合 -->
      <label
        for="inputPassword"
        class="sr-only"
      >Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      >
      <div class="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            value="remember-me"
          > Remember me
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        //定義資料結構
        user: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      signin() {
        const api = `${process.env.APIPATH}/admin/signin`;
        //依照上面放入伺服器路徑和signin就好
        // api/${process.env.CUSTOMPATH}/products;
        //api申請路徑、api申請的path
        const vm = this;
        //將get修改成post把用戶資料傳進來vm.user指data帳密
        this.$http.post(api, vm.user).then(response => {
          console.log(response.data);
          //判斷式，如果登入成攻將路徑改至首頁
          if (response.data.success) {
            vm.$router.push("/admin/products");
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
