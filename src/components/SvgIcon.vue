<script setup>
import {computed} from 'vue'
const props=defineProps({
    iconClass:{
        type:String,
        required:true,
    },
    className:{
        type:String,
        default: ()=>'',
    }
})

const iconName = computed(()=>{
    console.log(`#icon-${props.iconClass}`);
    return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
    return props.className ? 'svg-icon' + props.className : 'svg-icon';
})

</script>

<template>
<svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
</svg>
</template>


<style scoped lang="scss">
// .svg-icon{
//     fill:currentColor
// }
</style>