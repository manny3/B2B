<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>
  export default {
    name: "App"
    // created() {
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    //   //api申請路徑、api申請的path
    //   console.log(process.env.APIPATH, process.env.CUSTOMPATH);
    //   this.$http.get(api).then(response => {
    //     console.log(response.data);
    //   });
    // }
  };
</script>

<style lang="scss">
  @import "./assets/all.scss";
</style>
