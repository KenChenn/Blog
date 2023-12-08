<script>
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter'
export default{
    //語法糖
    data(){ //data = function(){}
        return{
            arr:[1,2,3,4,5],
            arr2:[
                {
                    name:"可口可樂",
                    type:"科基",
                    age:1
                },
                {
                    name:"零卡可樂",
                    type:"哈士奇",
                    age:2
                },
                {
                    name:"百事可樂",
                    type:"柴犬",
                    age:3
                },
            ],
            arr3:[1,2,3,4,5,6,7,8,9]
        }
    },
    computed: {
        ...mapState(counter, ["headerShow"])    //匯入pinia的變數
    },
    methods: {
        ...mapActions(counter, ["getLocation", "setLocation","setHeaderShow"])
    },
    created(){
        this.setHeaderShow(true) 
    },
    mounted() {
        this.setLocation(2)
    }
}
</script>

<template>
    <h3>V-for</h3>
    <!-- arr -->
    <p v-for="item in arr">{{item}}</p>
    <p v-for="(item, index) in arr">{{index}}</p>
    <!-- arr2 -->
    <ol v-for="element in arr2">
        <li>{{ element.name }}</li>
        <li>{{ element.type }}</li>
        <li>{{ element.age }}</li>
        <p>------------------------</p>
    </ol>
    
    <select name="" id="">
        <option value="">請選擇</option>
        <option v-for="xxx in arr3" value=item>{{ xxx }}</option>
    </select>

</template>

<style>
</style>