import { defineStore } from "pinia";

export default defineStore("counter",{
    //data(){}
        state(){
            return{
                location: 1,
                weatherInfo:{},
                headerShow: false, //是否顯示Header
            }
        },
    
    //computed
        getters:{
            locationInfo(){
                return `現在位置: ${this.location}`
            }
        },
    
    //methods
        actions:{
            setHeaderShow(boolean){
                if(boolean == true || boolean == false){
                    this.headerShow = boolean;
                }else{
                    console.error("setHeaderShow()的參數只接受boolean值");
                }
            },
            getLocation(){
                console.log(this.location);
            },
            setLocation(num){
                this.location = num;
            }
        }
    })