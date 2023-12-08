<script>
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter'
export default {
    data() {
        return {
            title: "title",
            info: {
                name: "可口可樂",
                age: 2,
                type: "臘腸"
            },
            cool: "",
            selectText: "",
            lazyText: "",
            numberText: "",
            trimText: "",
            checkboxText: [],
            radioText: ""
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
    <button type="button" @click="getLocation">BTN</button>
    <button type="button" @click="setLocation(2)">BTN2</button>
    <!-- this不加有可以，只是單純告訴自己this可以指過去 -->
    <h1>{{ this.title }}</h1>
    <!-- v-text -->
    <p v-text="title"></p>
    <p v-text="info"></p>
    <p v-text="`info ${title}`"></p>
    <p v-text="'info' + info"></p>
    <p v-text="`info` + info"></p>
    <p>info{{ this.info }}</p>

    <!-- v-model (雙向綁定) -->
    <h2>V-model</h2>
    <input type="text" v-model="cool">
    <p>{{ this.cool }}</p>

    <select name="" id="" v-model="selectText">
        <option value="1">1</option>
        <option value="2">2</option>
    </select>
    <p>{{ this.selectText }}</p>

    <!-- lazy、number、trim -->
    <!-- 離開標籤才會把值填過去 -->
    <h1>lazy</h1>
    <input type="text" v-model.lazy="lazyText">
    <p>{{ this.lazyText }}</p>
    <!-- 將輸入的字串轉成Number -->
    <h1>number</h1>
    <input type="text" v-model.number="numberText">
    <p>{{ this.numberText }}</p>
    <!-- 將字串的前後空白刪除 -->
    <h1>trim</h1>
    <input type="text" v-model.trim="trimText">
    <p>{{ this.trimText }}</p>

    <!-- checkbox 複選 -->
    <!-- 複選的話要將變數設定為陣列，設定一般"""的話代表判斷是否勾選 -->
    <label for="">早餐</label>
    <input type="checkbox" v-model="checkboxText" name="meal" value="breakfast">
    <label for="">午餐</label>
    <input type="checkbox" v-model="checkboxText" name="meal" value="lunch">
    <label for="">晚餐</label>
    <input type="checkbox" v-model="checkboxText" name="meal" value="dinner">
    <p>{{ this.checkboxText }}</p>
    <!-- radio 單選 -->
    <label for="">早餐</label>
    <input type="radio" v-model="radioText" name="food" value="breakfast">
    <label for="">午餐</label>
    <input type="radio" v-model="radioText" name="food" value="lunch">
    <label for="">晚餐</label>
    <input type="radio" v-model="radioText" name="food" value="dinner">
    <p>{{ this.radioText }}</p>
</template>

<style scoped lang="scss"></style>