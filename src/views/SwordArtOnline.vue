<script>
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter.js'
import anime from 'animejs'

export default {
    data() {
        return {
            menuOpened:false,
            startMouseY:"",
            nowMouseY:"",
        }
    },
    computed: {
        ...mapState(counter, ["headerShow"])    //匯入pinia的變數
    },
    methods: {
        ...mapActions(counter, ["setHeaderShow"]), //匯入pinia的函式
        
        mouseDown(event){
                    this.startMouseY=event.clientY
                    setTimeout(() => {
                        this.menuOpenOrClose();
                    }, 150)
        },

        mouseMove(event){
            this.nowMouseY = event.clientY
        },

        menuOpenOrClose(){
            let audio = document.createElement("audio")
            audio.src="./src/assets/music/sao_menu.mp3"
            switch(true){
                case this.menuOpened == true && (this.startMouseY-this.nowMouseY) > 500:
                    audio.play();
                    anime({
                        targets: '.icon_menu_man',
                        translateY: 0,
                        duration: 800,
                        delay: 100,
                    })
                    anime({
                        targets: '.icon_menu_friend',
                        translateY: 0,
                        duration: 800,
                        delay: 200,
                    })
                    anime({
                        targets: '.icon_menu_message',
                        translateY: 0,
                        duration: 800,
                        delay: 300,
                    })
                    anime({
                        targets: '.icon_menu_location',
                        translateY: 0,
                        duration: 800,
                        delay: 400,
                    })
                    anime({
                        targets: '.icon_menu_setting',
                        translateY: 0,
                        duration: 800,
                        delay: 500,
                    })
                    this.menuOpened = false;
                    break;

                case this.menuOpened == false && (this.nowMouseY-this.startMouseY) > 500:
                audio.play();
                    anime({
                        targets: '.icon_menu_setting',
                        translateY: 640,
                        duration: 800,
                        delay: 100,
                    })
                    anime({
                        targets: '.icon_menu_location',
                        translateY: 530,
                        duration: 800,
                        delay: 200,
                    })
                    anime({
                        targets: '.icon_menu_message',
                        translateY: 420,
                        duration: 800,
                        delay: 300,
                    })
                    anime({
                        targets: '.icon_menu_friend',
                        translateY: 310,
                        duration: 800,
                        delay: 400,
                    })
                    anime({
                        targets: '.icon_menu_man',
                        translateY: 200,
                        duration: 800,
                        delay: 500,
                    })
                    this.menuOpened = true;
                    break;
            }
        }
    },
    created() {
        this.setHeaderShow(false) //不顯示Header
    },
    mounted() {
        // document.querySelector(".backGroundImg").style.backgroundImage = "url('src/assets/image/2.jpg')"
    }
}
</script>

<template>
    <div class="outer">
        <div class="backGroundImg" @:mousedown="mouseDown" @:mousemove="mouseMove">
        <!-- 主設定 -->
        <img src="../assets/svg/Man.svg" class="icon_menu_man icon_menu" >
        <img src="../assets/svg/Friend.svg" class="icon_menu_friend icon_menu">
        <img src="../assets/svg/Message.svg" class="icon_menu_message icon_menu">
        <img src="../assets/svg/Location.svg" class="icon_menu_location icon_menu">
        <img src="../assets/svg/Config.svg" class="icon_menu_setting icon_menu">
        
            

        </div>
    </div>
</template>

<style scoped lang="scss">
.outer {
    height: 100vh;
    width: 100vw;


    .backGroundImg {
        height: 100%;
        width: 100%;
        background-image: url('../assets/image/2.jpg');
        opacity: 0.7; //調整圖片透明度
        background-size: 100% 100%; //設定大小讓圖片符合瀏覽器
        position: relative;

        .icon_menu{     //iocn大小
            width: 100px;
            height:100px;
        }
        
        .icon_menu_setting{ //第一層設定_齒輪
            position: absolute;
            top: -20%;
            right: 48%;
        }
        .icon_menu_setting:hover{
            content: url("../assets/svg/Config_on.svg");
        }

        .icon_menu_location{ //第一層設定_地圖
            position: absolute;
            top: -20%;
            right: 48%;
        }
        .icon_menu_location:hover{
            content: url("../assets/svg/Location_on.svg");
        }

        .icon_menu_message{ //第一層設定_訊息
            position: absolute;
            top: -20%;
            right: 48%;
        }
        .icon_menu_message:hover{
            content: url("../assets/svg/Message_on.svg");
        }
        
        .icon_menu_friend{ //第一層設定_好友
            position: absolute;
            top: -20%;
            right: 48%;
        }
        .icon_menu_friend:hover{
            content: url("../assets/svg/Friend_on.svg");
        }

        .icon_menu_man{ //第一層設定_個人資訊
            position: absolute;
            top: -20%;
            right: 48%;
        }
        .icon_menu_man:hover{
            content: url("../assets/svg/Man_on.svg");
        }
    }
}</style>
