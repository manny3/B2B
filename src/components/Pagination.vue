<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{'disabled': !pagination.has_pre}"
          @click.prevent="getProducts(pagination.current_page -1)"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active': pagination.current_page === page}"
        ><a
            class="page-link"
            href="#"
            @click.prevent="getProducts(page)"
          >{{page}}</a></li>
        <li
          class="page-item"
          :class="{'disabled': !pagination.has_next}"
          @click.prevent="getProducts(pagination.current_page +1)"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  // :pages="{ 頁碼資訊 }"
  // @emitPages="更新頁面事件"
  export default {
    name: "Layout",
    props: ["pages"],
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        uid: ""
      };
    },
    methods: {
      updatePage(page) {
        this.$emit("emitPages", page);
      }
    }
  };
</script>