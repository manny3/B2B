<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        @click="openModal(true)"
      >建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </thead>
      <tbody>
        <tr
          v-for="(item) in coupons"
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
          <td> <span
              v-if="item.is_enabled"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span></td>
          <td><button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >編輯</button></td>
        </tr>
      </tbody>
    </table>

    <!-- 新的優惠券 -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            ><span>新增優惠券</span></h5>
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
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCoupon.title"
                  placeholder="請輸入標題"
                >
              </div>

              <div class="form-group col-md-6">
                <label for="category">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="category"
                  v-model="tempCoupon.code"
                  placeholder="請輸入優惠碼"
                >
              </div>

              <hr>

              <div class="form-group">
                <label for="description">到期日</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempCoupon.due_date"
                  placeholder="日期"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="content">折扣百分比</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="tempCoupon.percent"
                  placeholder=""
                ></textarea>
              </div>

              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  >
                  <label
                    class="form-check-label"
                    for="is_enabled"
                  >
                    是否啟用
                  </label>
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupon"
            >更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  import $ from "jquery";

  export default {
    data() {
      return {
        coupons: {},
        tempCoupon: {},
        isLoading: false,
        isNew: false
      };
    },
    methods: {
      getCoupons() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/coupons`;
        //api申請路徑、api申請的path
        console.log(process.env.APIPATH, process.env.CUSTOMPATH);
        vm.isLoading = true;

        this.$http.get(api).then(response => {
          console.log(response.data);
          if (response.data.success) {
            vm.isLoading = false;
            vm.coupons = response.data.coupons;
            //   vm.pagination = response.data.pagination;
          }
        });
      },
      openModal(isNew, item) {
        const vm = this;
        if (isNew) {
          this.tempProduct = {};
          this.isNew = true;
        } else {
          this.tempCoupon = Object.assign({}, item);
          this.isNew = false;
        } //如果是新增tempProduct為新物件、isNew = true，如果不是則相反，
        //由於物件傳參考特性不能使用tempProduct=item，否則兩個值會依樣，Object.assign（es6方式），將item值寫到空物件避免傳參考特性
        $("#couponModal").modal("show");
      },
      updateCoupon() {
        let api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/coupon`;
        let httpMethod = "post";
        const vm = this;

        if (!vm.isNew) {
          api = `${process.env.APIPATH}/api/${
            process.env.CUSTOMPATH
          }/admin/coupon/${vm.tempCoupon.id}`;
          httpMethod = "put";
        }
        console.log(process.env.APIPATH, process.env.CUSTOMPATH);
        this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
          console.log(response.data);
          if (response.data.success) {
            $("#couponModal").modal("hide");
            vm.getCoupons();
            vm.isLoading = false;
            //   vm.pagination = response.data.pagination;
          } else {
            console.log("新增失敗");
          }
        });
      }
    },

    created() {
      this.getCoupons();
    }
  };
</script>