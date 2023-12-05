<script>
import { RouterLink,RouterView } from 'vue-router';
export default{
    data(){
        return{

        }
    },
    components:{
        RouterLink,
    }
}
</script>

<template>
    <div class="headerShow">
        <RouterLink to="/">LinkStart</RouterLink>
        <RouterLink to="/Home">Home</RouterLink>
        <!-- <RouterLink to=""> -->
    </div>
</template>

<style  scoped lang="scss">
.headerShow{
    width: 100%;
    height: 100%;
    background-color: aqua;
}
</style>