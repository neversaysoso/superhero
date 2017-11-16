<template>
  <div class="funcbox">
    <div class="funclist" v-for="i in funclist" @click="i.click">
      <img class="funcimg" :src="i.img"/>
      {{i.text}}
    </div>
  </div>  
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  props: ["funclist"]
};
</script>