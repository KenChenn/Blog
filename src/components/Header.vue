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
        <RouterLink to="/SwordArtOnline">回到SAO</RouterLink>
        <RouterLink to="/VtextAndVmodel">VtextAndVmodel</RouterLink>
        <RouterLink to="/Vfor">Vfor</RouterLink>
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