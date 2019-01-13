<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div
        class="col-md-4 mb-4"
        v-for="item in products"
        :key="item.id"
      >
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          >
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a
                href="#"
                class="text-dark"
              >{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                class="h5"
                v-if="!item.price"
              >{{ item.origin_price }} 元</div>
              <del
                class="h6"
                v-if="item.price"
              >原價 {{ item.origin_price }} 元</del>
              <div
                class="h5"
                v-if="item.price"
              >現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="item.id === status.loadingItem"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="item.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車列表 -->
    <div class="my-5 row justify-content-center">
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr
              v-for="item in cart.carts"
              :key="item.id"
            >
              <!-- v-if="cart.carts" -->
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <!-- <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div> -->
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colspan="3"
                class="text-right"
              >總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <!-- <tr v-if="cart.final_total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr> -->
          </tfoot>
        </table>

      </div>
    </div>
    <!-- <table class="table mt-4">
      <thead>
        <tr>
          <th></th>
          <th width="120">品名</th>
          <th>數量</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in carts"
          :key="item.id"
        >
          <td><i class="fas fa-trash-alt"></i></td>
          <td>{{ item.product.title }}</td>
          <td>
            {{ item.qty}}
          </td>
          <td>
            {{ item.total }}
          </td>
        </tr>
        <tr>
          <td>
            總計
          </td>
          <td>
            {{ total }}
          </td>
        </tr>
        <tr>
          <td>
            折扣價
          </td>
          <td>
            {{ final_total }}
          </td>
        </tr>
      </tbody>

    </table> -->

    <!-- productModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >{{ product.title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="product.image"
              class="img-fluid"
              alt=""
            >
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                class="h4"
                v-if="!product.price"
              >{{ product.origin_price }} 元</div>
              <del
                class="h6"
                v-if="product.price"
              >原價 {{ product.origin_price }} 元</del>
              <div
                class="h4"
                v-if="product.price"
              >現在只要 {{ product.price }} 元</div>
            </div>
            <select
              name=""
              class="form-control mt-3"
              v-model="product.num"
            >
              <option
                :value="num"
                v-for="num in 10"
                :key="num"
              >
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <!-- <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  //$未定義，所以要打上這一行

  export default {
    data() {
      return {
        products: [],
        product: {},
        cart: {},
        // carts: [],
        final_total: 1,
        total: 1,
        status: {
          loadingItem: "" //判斷畫面上讀取哪一個
        },
        isLoading: false
      };
    },
    methods: {
      getProducts() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/products`; //客戶端
        vm.isLoading = true;
        this.$http.get(url).then(response => {
          vm.products = response.data.products;
          console.log(response);
          vm.isLoading = false;
        });
      },
      getProduct(id) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/product/${id}`;
        vm.status.loadingItem = id;
        this.$http.get(url).then(response => {
          vm.product = response.data.product;
          $("#productModal").modal("show");
          console.log(response);
          vm.status.loadingItem = "";
        });
      },
      addtoCart(id, qty = 1) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty
        };
        this.$http.post(url, { data: cart }).then(response => {
          console.log(response);
          vm.status.loadingItem = "";
          vm.getCart();
          $("#productModal").modal("hide");
        });
      },
      getCart() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`; //客戶端
        vm.isLoading = true;
        this.$http.get(url).then(response => {
          vm.cart = response.data.data;
          // const res = response.data.data;
          // vm.carts = res.carts;
          // vm.final_total = res.final_total;
          // vm.total = res.total;
          console.log(response);
          vm.isLoading = false;
        });
      },
      removeCartItem(id) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/cart/${id}`; //客戶端
        vm.isLoading = true;
        this.$http.delete(url).then(() => {
          vm.getCart();
          vm.isLoading = false;
        });
      }
    },
    created() {
      this.getProducts();
      this.getCart();
    }
  };
</script>