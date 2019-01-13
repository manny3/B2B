<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
      </thead>
      <tbody>
        <!-- <tr
          v-for="(item) in orders"
          :key="item.id"
        > -->
        <!-- v-if="orders.length" -->
        <tr
          v-for="(item, key) in sortOrder"
          :key="key"
          :class="{'text-secondary': !item.is_paid}"
        >
          <!-- <td>{{ item.paid_date }}</td> -->
          <td>{{ item.create_at | date }}</td>

          <!-- <td>{{ item.email }}</td> -->
          <td><span
              v-text="item.user.email"
              v-if="item.user"
            ></span></td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="(product, i) in item.products"
                :key="i"
              >
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ item.total}}</td>
          <td><span
              v-if="item.is_paid"
              class="text-success"
            >已付款</span>
            <span
              v-else
              class="text-muted"
            >尚未付款</span></td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pages="pagination"
      @emitPages="getOrders"
    ></Pagination>
  </div>
</template>

<script>
  import Pagination from "../Pagination";

  export default {
    data() {
      return {
        orders: {},
        pagination: {},
        isLoading: false,
        isNew: false
      };
    },
    components: {
      Pagination
    },
    methods: {
      getOrders(currentPage = 1) {
        const api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/orders?page=${currentPage}`;
        //api申請路徑、api申請的path
        const vm = this;
        //確保http結束後可以把data存到vm裡
        console.log(process.env.APIPATH, process.env.CUSTOMPATH);
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          console.log(response.data);
          if (response.data.success) {
            vm.isLoading = false;
            vm.orders = response.data.orders;
            vm.pagination = response.data.pagination;
          }
        });
      }
    },
    computed: {
      sortOrder() {
        const vm = this;
        let newOrder = [];
        if (vm.orders.length) {
          newOrder = vm.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          });
        }
        return newOrder;
      }
    },
    created() {
      this.getOrders();
    }
  };
</script>