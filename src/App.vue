<script >
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header.vue'
import { mapState, mapActions } from 'pinia'
import counter from './stores/counter.js'

export default{
    data(){
        return{

        }
    },
    computed:{
        ...mapState(counter, ["headerShow"])    //匯入pinia的變數
    },
    methods:{
      
    },components:{
      RouterLink,
      RouterView,
      Header,
    }
}
</script>

<template>
  <div v-if="headerShow" class="header">
    <Header />
  </div>
  <div class="contest">

  <RouterView />
</div>
</template>

<style scoped lang="scss">
.header{
  width: 100vw;
  height: 15vh;
}
.contest{
  width: 100vw;
  height: 85vh;
}
</style>
