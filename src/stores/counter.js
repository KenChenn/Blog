import { defineStore } from "pinia";

export default defineStore("counter",{
    //data(){}
        state(){
            return{
                headerShow: false, //是否顯示Header
            }
        },
    
    //computed
        getters:{
            
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
        }
    })