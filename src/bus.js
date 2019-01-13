import Vue from 'vue'

Vue.prototype.$bus = new Vue()
//將event bus掛載vue底下

// Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式
