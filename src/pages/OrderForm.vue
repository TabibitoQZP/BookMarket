<template>
  <div>
      
  </div>
</template>

<script>
export default {
  name:'OrderForm',
  data(){
    return{
      tableData: Array(10).fill({
        // date到时候应该会删掉...
        date: "21-2-29",
        ISBN: 1234567890,
        name: "魔女之旅",
        author: "白石定规",
        public: "PA",
        remain: 20,
        price: 32,
      }),
    }
  }
}
</script>

<style>

</style>