<script>
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter.js'
import anime from 'animejs'
import { Faker } from '@faker-js/faker';


export default {
    data() {
        return {
            menuOpened: false,
            mouseDownStatus: false,
            startMouseY: "",
            nowMouseY: "",
            menuOpenSound: document.createElement("audio"),
            meanSelectSound: document.createElement("audio"),
            itemSize: 60,
            listData: [], //列表數據
            screenHeight: "", //可視區域高度
            visibleCount: "",//可顯示列表項數
            startOffset: 0, //偏移量
            start: 0, //起始索引
            end: "",
            startJudge: 0,
            dataLength: "",
            path:"",
            opening: "menu_man",
            menu: new Map([
                ["menu_man", false],
                ["menu_social", false],
                ["menu_message", false],
                ["menu_location", false],
                ["menu_setting", false]
            ]),
            menu_man: new Map([
                ["menu_man_items", false],
                ["menu_man_skills", false],
                ["menu_man_equipment", false],
            ]),
            menu_setting: new Map([
                ["menu_setting_option", false],
                ["menu_setting_help", false],
                ["menu_setting_logout", false],
            ]),
            menu_social: new Map([
                ["menu_social_friend", false],
                ["menu_social_party", false],
                ["menu_social_guild", false],
            ]),
            skillsArr: [
                {
                    skillName: "VtextAndVmodel",
                    iconKeyWord: "skills_VtextAndVmodel_icon",
                    path: "/VtextAndVmodel",
                },
                {
                    skillName: "Vfor",
                    iconKeyWord: "skills_Vfor_icon",
                    path: "/Vfor",
                },
                {
                    skillName: "Von",
                    iconKeyWord: "skills_Von_icon",
                    path: "/Von",
                },
                {
                    skillName: "Vbind",
                    iconKeyWord: "skills_Vbind_icon",
                    path: "/Vbind",
                },
                {
                    skillName: "VifAndVshow",
                    iconKeyWord: "skills_VifAndVshow_icon",
                    path: "/VifAndVshow",
                },
                {
                    skillName: "WatchAndComputed",
                    iconKeyWord: "skills_WatchAndComputed_icon",
                    path: "/WatchAndComputed",
                },
                {
                    skillName: "Props",
                    iconKeyWord: "skills_Props_icon",
                    path: "/Props",
                },
                {
                    skillName: "Emit",
                    iconKeyWord: "skills_Emit_icon",
                    path: "/Emit",
                },
                {
                    skillName: "DataFlow",
                    iconKeyWord: "skills_DataFlow_icon",
                    path: "/DataFlow",
                },
                {
                    skillName: "ProvideAndInject",
                    iconKeyWord: "skills_ProvideAndInject_icon",
                    path: "/ProvideAndInject",
                },
                {
                    skillName: "RouteFam",
                    iconKeyWord: "skills_RouteFam_icon",
                    path: "/RouteFam",
                },
                {
                    skillName: "Vslot",
                    iconKeyWord: "skills_Vslot_icon",
                    path: "/Vslot",
                },
            ]
        }
    },
    computed: {
        ...mapState(counter, ["headerShow"])    //匯入pinia的變數
    },
    methods: {
        ...mapActions(counter, ["setHeaderShow"]), //匯入pinia的函式

        mouseDown(event) {
            this.mouseDownStatus = true
            this.startMouseY = event.clientY
            setTimeout(() => {
                this.menuOpenOrClose();
            }, 150)
        },

        mouseUp() {
            this.mouseDownStatus = false
        },

        mouseMove(event) {
            this.nowMouseY = event.clientY
        },
        openDialog() {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            document.querySelector('#confirm-modal').showModal()
        },
        menuOpenOrClose() { //開啟或關閉主選單
            this.menuOpenSound.src = "./src/assets/music/sao_menu.mp3"
            switch (true) {
                case this.menuOpened == true && (this.startMouseY - this.nowMouseY) > 200 && this.mouseDownStatus == true:
                    this.menuOpenSound.play();
                    this.menuSelect()
                    this.menuOpened = false;
                    this.menu.set(this.opening, false)
                    anime({
                        targets: '.icon_menu_man',
                        translateY: 0,
                        duration: 150,
                        delay: 50,
                        easing: 'easeInOutSine'
                    })
                    anime({
                        targets: '.icon_menu_social',
                        translateY: 0,
                        duration: 150,
                        delay: 100,
                        easing: 'easeInOutSine'
                    })
                    anime({
                        targets: '.icon_menu_message',
                        translateY: 0,
                        duration: 150,
                        delay: 150,
                        easing: 'easeInOutSine'
                    })
                    anime({
                        targets: '.icon_menu_location',
                        translateY: 0,
                        duration: 150,
                        delay: 200,
                        easing: 'easeInOutSine'
                    })
                    anime({
                        targets: '.icon_menu_setting',
                        translateY: 0,
                        duration: 150,
                        delay: 250,
                        easing: 'easeInOutSine'
                    })
                    break;

                case this.menuOpened == false && (this.nowMouseY - this.startMouseY) > 200 && this.mouseDownStatus == true:
                    this.menuOpenSound.play();
                    this.menuSelect()
                    this.menuOpened = true
                    this.menu.set(this.opening, false)
                    anime({
                        targets: '.icon_menu_setting',
                        translateY: 660,
                        duration: 150,
                        delay: 50,
                        easing: 'easeInOutSine'
                    })
                    anime({
                        targets: '.icon_menu_location',
                        translateY: 570,
                        duration: 150,
                        delay: 100,
                        easing: 'easeInOutSine'

                    })
                    anime({
                        targets: '.icon_menu_message',
                        translateY: 480,
                        duration: 150,
                        delay: 150,
                        easing: 'easeInOutSine'

                    })
                    anime({
                        targets: '.icon_menu_social',
                        translateY: 390,
                        duration: 150,
                        delay: 200,
                        easing: 'easeInOutSine'

                    })
                    anime({
                        targets: '.icon_menu_man',
                        translateY: 300,
                        duration: 150,
                        delay: 250,
                        easing: 'easeInOutSine'
                    })
                    break;
            }
        },
        allMapClear() {
            this.menu_man.forEach((value, key) => {
                this.menu_man.set(key, false)
            })
            this.menu_social.forEach((value, key) => {
                this.menu_social.set(key, false)
            })
            this.menu_setting.forEach((value, key) => {
                this.menu_setting.set(key, false)
            })
        },
        menuSelect(target) {
            this.allMapClear()
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            this.menu.forEach((value, key) => {
                if (key == target) {
                    this.menu.set(key, true)
                } else {
                    this.menu.set(key, false)
                }
            })

        },
        manSelect(target) {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            this.menu_man.forEach((value, key) => {
                if (key == target) {
                    this.menu_man.set(key, true)
                } else {
                    this.menu_man.set(key, false)
                }
            })
        },
        socialSelect(target) {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            this.menu_social.forEach((value, key) => {
                if (key == target) {
                    this.menu_social.set(key, true)
                } else {
                    this.menu_social.set(key, false)
                }
            })
        },
        settingSelect(target) {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            this.menu_setting.forEach((value, key) => {
                if (key == target) {
                    this.menu_setting.set(key, true)
                } else {
                    this.menu_setting.set(key, false)
                }
            })
        },
        savePath(path){
            this.path = path
        },
        pushNewPage() {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            if (this.path != "") {
                this.$router.push(this.path)
            }
            document.querySelector('#confirm-modal').close()
        },
        cancel(){
            document.querySelector('#confirm-modal').close()
        },

        menuSettingSelectOn(target) {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
            if (document.getElementById(target)) {
                document.getElementById(target).src = 'src/assets/svg/select_On.svg'
            }
            if (document.getElementById(target + "_icon")) {
                document.getElementById(target + "_icon").src = 'src/assets/svg/' + target + '_icon_on.svg'
            }
            if (document.getElementById(target + "_text")) {
                document.getElementById(target + "_text").style.color = "white"
            }
        },
        listHeight() {
            return this.listData.length * this.itemSize
        },
        getTransform() {
            return `translated3d(0,${this.start}px,0)`
        },
        visibleData() {
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
        },
        scrollToTop() {
            this.$refs.list.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        scrollEvent(e) {
            this.screenHeight = document.getElementById("skillsList_container").clientHeight
            this.visibleCount = Math.ceil(this.screenHeight / this.itemSize)
            const scrollTop = this.$refs.list.scrollTop;
            this.start = Math.floor(scrollTop / this.itemSize);
            console.log(this.start, this.startJudge);
            if (this.start > this.startJudge) {
                this.listData = this.skillsArr[this.startJudge]
                this.skillsArr.push(this.listData)
            }
            this.startJudge = this.start
            this.end = this.start + this.visibleCount;
            this.startOffset = scrollTop - (scrollTop % this.itemSize);

            console.log("startJudge", this.startJudge, "start:", this.start, "end:", this.end, "startOffset:", this.startOffset, "visibleCount:", this.visibleCount, "screenHeight:", this.screenHeight);
        },

    },
    created() {
        this.setHeaderShow(false) //不顯示Header
        this.listData = this.skillsArr
        this.dataLength = this.skillsArr.length

    },
    mounted() {
        // document.querySelector(".backGroundImg").style.backgroundImage = "url('src/assets/image/2.jpg')"
    }

}
</script>

<template>
    <div class="outer">
        <div class="backGroundImg" @:mousedown="mouseDown" @:mousemove="mouseMove" @mouseup="mouseUp">
            <!-- 主設定 -->
            <img id="menu_man" src="../assets/svg/Man.svg" class="icon_menu_man icon_menu"
                v-show='!(this.menu.get("menu_man"))' @click='this.menuSelect("menu_man")'>
            <img id="menu_man" src="../assets/svg/Man_On.svg" class="icon_menu_man icon_menu"
                v-show='this.menu.get("menu_man")' @click='this.menuSelect("menu_man")'>
            <img id="menu_social" src="../assets/svg/Friend.svg" class="icon_menu_social icon_menu"
                v-show='!(this.menu.get("menu_social"))' @click='this.menuSelect("menu_social")'>
            <img id="menu_social" src="../assets/svg/Friend_On.svg" class="icon_menu_social icon_menu"
                v-show='this.menu.get("menu_social")' @click='this.menuSelect("menu_social")'>
            <img id="menu_message" src="../assets/svg/Message.svg" class="icon_menu_message icon_menu"
                v-show='!(this.menu.get("menu_message"))' @click='this.menuSelect("menu_message")'>
            <img id="menu_message" src="../assets/svg/Message_On.svg" class="icon_menu_message icon_menu"
                v-show='this.menu.get("menu_message")' @click='this.menuSelect("menu_message")'>
            <img id="menu_location" src="../assets/svg/Location.svg" class="icon_menu_location icon_menu"
                v-show='!(this.menu.get("menu_location"))' @click='this.menuSelect("menu_location")'>
            <img id="menu_location" src="../assets/svg/Location_On.svg" class="icon_menu_location icon_menu"
                v-show='this.menu.get("menu_location")' @click='this.menuSelect("menu_location")'>
            <img id="menu_setting" src="../assets/svg/Config.svg" class="icon_menu_setting icon_menu"
                v-show='!(this.menu.get("menu_setting"))' @click='this.menuSelect("menu_setting")'>
            <img id="menu_setting" src="../assets/svg/Config_On.svg" class="icon_menu_setting icon_menu"
                v-show='this.menu.get("menu_setting")' @click='this.menuSelect("menu_setting")'>



            <!-- 血條 -->
            <div class="bloodDiv">
                <p class="text">Ken</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="1620" height="376" viewBox="0 0 1620 376" class="blood">
                    <g id="1st">
                        <g id="bg">
                            <polygon id="gauge_bg" opacity=".09" fill="#fff"
                                points="951.315,104.5 930.53,140.5 332.95,140.5 332.95,53.5 1514.975,53.5 1485.53,104.5" />
                            <path opacity=".3" fill="#fff"
                                d="M0 0h91v194h-91v-47.5h32c9.665 0 17.5-7.835 17.5-17.5v-64c0-9.665-7.835-17.5-17.5-17.5h-32v-47.5z" />
                            <g id="with_status">
                                <linearGradient id="1st_bg_b" gradientUnits="userSpaceOnUse" x1="100.5" y1="129" x2="1620"
                                    y2="129">
                                    <stop offset="0" stop-color="#fff" stop-opacity=".3" />
                                    <stop offset="1" stop-color="#fff" stop-opacity=".05" />
                                </linearGradient>
                                <path fill="url(#1st_bg_b)"
                                    d="M1540.614 137.5l79.386-137.5h-1519.5v194h867v-35c0-11.874 9.626-21.5 21.5-21.5h551.614zm-589.299-33l-20.785 36h-597.58v-87h1182.025l-29.445 51h-534.215zm616.185 54.5v84c0 8.284-6.716 15-15 15h-182.75v-114h182.75c8.284 0 15 6.716 15 15zm-578.5-15h374.25v114h-374.25c-8.284 0-15-6.716-15-15v-84c0-8.284 6.716-15 15-15z" />
                            </g>
                        </g>
                        <g id="gauge">
                            <g id="green">
                                <g>
                                    <linearGradient id="1st_hp_a" gradientUnits="userSpaceOnUse" x1="921.217" y1="61"
                                        x2="921.217" y2="133">
                                        <stop offset="0" stop-color="#65A719" />
                                        <stop offset="1" stop-color="#87D529" />
                                    </linearGradient>
                                    <polygon fill="url(#1st_hp_a)"
                                        points="946.985,97 1481.2,97 1501.985,61 340.45,61 340.45,133 926.2,133" />
                                </g>
                                <g id="max (4%)">
                                    <polygon fill="#93C856" points="1481.2,97 1501.985,61 1455.784,61 1435,97" />
                                </g>
                            </g>

                            <g id="wrapper">
                                <path fill="#373737"
                                    d="M330.75 50.5v92h601.523l20.785-36h534.215l32.332-56h-1188.855zm1150.45 46.5h-534.215l-20.785 36h-585.75v-72h1161.535l-20.785 36z" />
                                <linearGradient id="1st_w_a" gradientUnits="userSpaceOnUse" x1="925.061" y1="49"
                                    x2="925.061" y2="142">
                                    <stop offset="0" stop-color="#373232" />
                                    <stop offset="1" stop-color="#161616" />
                                </linearGradient>
                                <path fill="url(#1st_w_a)"
                                    d="M1520.171 49h-1190.221v93h602.312l20.785-36h534.215l32.909-57zm-568.856 54l-20.785 36h-597.58v-87h1182.025l-29.445 51h-534.215z" />
                                <path fill="#FBFBFB"
                                    d="M1520.171 50.5h-1190.221v93h602.312l20.785-36h534.215l32.909-57zm-568.856 54l-20.785 36h-597.58v-87h1182.025l-29.445 51h-534.215z" />
                            </g>
                            <g id="Status">
                                <g id="lv96">
                                    <path fill="#4D4D4D"
                                        d="M1493.63 174.76v44.227c0 2.299-1.875 4.175-4.174 4.175h-16.577v-5.929h14.822v-15.308h-10.588c-2.359 0-4.234-1.875-4.234-4.174v-18.816c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v15.307h8.894v-15.307zm33.093 38.297c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517v5.93h-14.822v15.307h10.648c2.299 0 4.174 1.876 4.174 4.175v18.815zm-5.929-1.754v-15.308h-8.894v15.308h8.894zm-93.113 5.928h-20.752v-48.401h5.929v42.473h14.823v5.928zm22.506-48.401l-3.448 48.401h-13.855l-3.448-48.401h5.929l3.025 42.473h2.844l3.025-42.473h5.928zm10.042 13.855v5.929h-5.929v-5.929h5.929zm-5.929 28.618h5.929v5.929h-5.929v-5.929zm-224.935-42.473v48.401h-5.929v-42.471h-4.417v-5.93h10.346zm28.193 48.401h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.174-4.175h12.403c2.299 0 4.174 1.876 4.174 4.175v40.052c0 2.299-1.875 4.175-4.174 4.175zm-1.755-42.471h-8.894v15.307h8.894v-15.307zm0 21.235h-8.894v15.308h8.894v-15.308zm18.271-21.235v15.307h10.648c2.299 0 4.174 1.876 4.174 4.175v18.815c0 2.299-1.875 4.175-4.174 4.175h-16.577v-5.929h14.822v-15.308h-14.822v-27.165h20.751v5.93h-14.822zm41.986-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543zm33.093-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543zm-159.392 42.471h-5.929l7.744-54.33h5.929l-7.744 54.33zm-140.538-48.401v48.401h-5.929v-42.471h-4.417v-5.93h10.346zm28.193 48.401h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.174-4.175h12.403c2.299 0 4.174 1.876 4.174 4.175v40.052c0 2.299-1.875 4.175-4.174 4.175zm-1.755-42.471h-8.894v15.307h8.894v-15.307zm0 21.235h-8.894v15.308h8.894v-15.308zm18.271-21.235v15.307h10.648c2.299 0 4.174 1.876 4.174 4.175v18.815c0 2.299-1.875 4.175-4.174 4.175h-16.577v-5.929h14.822v-15.308h-14.822v-27.165h20.751v5.93h-14.822zm41.986-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543zm33.093-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543z" />
                                    <path fill="#FBFBFB"
                                        d="M1493.63 176.26v44.227c0 2.299-1.875 4.175-4.174 4.175h-16.577v-5.929h14.822v-15.308h-10.588c-2.359 0-4.234-1.875-4.234-4.174v-18.816c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v15.307h8.894v-15.307zm33.093 38.297c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517v5.93h-14.822v15.307h10.648c2.299 0 4.174 1.876 4.174 4.175v18.815zm-5.929-1.754v-15.308h-8.894v15.308h8.894zm-93.113 5.928h-20.752v-48.401h5.929v42.473h14.823v5.928zm22.506-48.401l-3.448 48.401h-13.855l-3.448-48.401h5.929l3.025 42.473h2.844l3.025-42.473h5.928zm10.042 13.855v5.929h-5.929v-5.929h5.929zm-5.929 28.618h5.929v5.929h-5.929v-5.929zm-224.935-42.473v48.401h-5.929v-42.471h-4.417v-5.93h10.346zm28.193 48.401h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.174-4.175h12.403c2.299 0 4.174 1.876 4.174 4.175v40.052c0 2.299-1.875 4.175-4.174 4.175zm-1.755-42.471h-8.894v15.307h8.894v-15.307zm0 21.235h-8.894v15.308h8.894v-15.308zm18.271-21.235v15.307h10.648c2.299 0 4.174 1.876 4.174 4.175v18.815c0 2.299-1.875 4.175-4.174 4.175h-16.577v-5.929h14.822v-15.308h-14.822v-27.165h20.751v5.93h-14.822zm41.986-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543zm33.093-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543zm-159.392 42.471h-5.929l7.744-54.33h5.929l-7.744 54.33zm-140.538-48.401v48.401h-5.929v-42.471h-4.417v-5.93h10.346zm28.193 48.401h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.174-4.175h12.403c2.299 0 4.174 1.876 4.174 4.175v40.052c0 2.299-1.875 4.175-4.174 4.175zm-1.755-42.471h-8.894v15.307h8.894v-15.307zm0 21.235h-8.894v15.308h8.894v-15.308zm18.271-21.235v15.307h10.648c2.299 0 4.174 1.876 4.174 4.175v18.815c0 2.299-1.875 4.175-4.174 4.175h-16.577v-5.929h14.822v-15.308h-14.822v-27.165h20.751v5.93h-14.822zm41.986-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543zm33.093-5.93v44.227c0 2.299-1.875 4.175-4.174 4.175h-12.343c-2.359 0-4.234-1.876-4.234-4.175v-40.052c0-2.299 1.875-4.175 4.234-4.175h16.517zm-5.929 5.93h-8.894v36.543h8.894v-36.543z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <!-- 主選單 > 個人資訊 -->
            <div class="menu_man_div" v-show='this.menu.get("menu_man")'>
                <div class="characterDiv">
                    <img src="../assets/svg/character.svg" class="menu_man_character menu_man">

                    <div class="myNameArea">
                        <p class="myName">xxx</p>
                    </div>
                    <div class="aboutMe">
                        <p>英文名 : </p>
                        <p>日文名 : </p>
                        <p>學歷 : </p>
                        <p>語言 : </p>
                        <p>前職 : </p>
                    </div>
                </div>
                <div class="menu_man_arrow_div menu_man">
                    <img src="../assets/svg/arrow.svg" class="menu_man_arrow">
                </div>
                <div class="skills_arrow_div" v-show="this.menu_man.get('menu_man_skills')">
                    <img src="../assets/svg/arrow.svg" class="skills_arrow">
                </div>
                <!-- 主選單 > 個人資訊 > 物品 -->
                <div class="menu_man_items_div menu_man" v-show='!(this.menu_man.get("menu_man_items"))'>
                    <img id="menu_man_items" src="../assets/svg/select.svg" class="menu_man_items menu_man_select"
                        @click='this.manSelect("menu_man_items")'>
                    <img id="menu_man_items_icon" src="../assets/svg/menu_man_items_icon.svg"
                        class="menu_man_items_icon menu_man_select_icon " @click='this.manSelect("menu_man_items")'>
                    <p id="menu_man_items_text" class="menu_man_titel_text" @click='this.manSelect("menu_man_items")'>Items
                    </p>
                </div>
                <div class="menu_man_items_div menu_man" v-show='this.menu_man.get("menu_man_items")'>
                    <img id="menu_man_items" src="../assets/svg/select_On.svg" class="menu_man_items menu_man_select"
                        @click='this.manSelect("menu_man_items")'>
                    <img id="menu_man_items_icon" src="../assets/svg/menu_man_items_icon_on.svg"
                        class="menu_man_items_icon menu_man_select_icon " @click='this.manSelect("menu_man_items")'>
                    <p id="menu_man_items_text" class="menu_man_titel_text" style="color: white;"
                        @click='this.manSelect("menu_man_items")'>Items</p>
                </div>
                <!-- 主選單 > 個人資訊 > 技能 -->
                <div class="menu_man_skills_div menu_man">
                    <img id="menu_man_skills" src="../assets/svg/select.svg" class="menu_man_skills menu_man_select"
                        v-show='!(this.menu_man.get("menu_man_skills"))' @click='this.manSelect("menu_man_skills")'>
                    <img id="menu_man_skills" src="../assets/svg/select_On.svg" class="menu_man_skills menu_man_select"
                        v-show='this.menu_man.get("menu_man_skills")' @click='this.manSelect("menu_man_skills")'>
                    <img id="menu_man_skills_icon" src="../assets/svg/menu_man_skills_icon.svg"
                        v-show='!(this.menu_man.get("menu_man_skills"))' class="menu_man_skills_icon menu_man_select_icon "
                        @click='this.manSelect("menu_man_skills")'>
                    <img id="menu_man_skills_icon" src="../assets/svg/menu_man_skills_icon_on.svg"
                        v-show='this.menu_man.get("menu_man_skills")' class="menu_man_skills_icon menu_man_select_icon "
                        @click='this.manSelect("menu_man_skills")'>
                    <p id="menu_man_skills_text" class="menu_man_titel_text"
                        v-show='!(this.menu_man.get("menu_man_skills"))' @click='this.manSelect("menu_man_skills")'>Skills
                    </p>
                    <p id="menu_man_skills_text" class="menu_man_titel_text" style="color: white;"
                        v-show='this.menu_man.get("menu_man_skills")' @click='this.manSelect("menu_man_skills")'>Skills</p>
                    <!-- 主選單 > 個人資訊 > 技能 詳細 -->

                    <div id="skillsList_container" class="skillsList_container" ref="list" @scroll="scrollEvent()"
                        v-show="this.menu_man.get('menu_man_skills')">
                        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }">
                            <div class="skillsList" :style="{ transform: getTransform }">
                                <div class="infinite-list-item" v-for="item in this.skillsArr" :key="item.id"
                                    :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px', marginBottom: '5px' }">
                                    <img src="../assets/svg/select.svg" @click="openDialog(),savePath(item.path)">
                                    <img :src="'src/assets/svg/' + item.iconKeyWord + '.svg'" class="skills_icon"
                                        @click="openDialog(),savePath(item.path)">
                                    <p class="skill_titel_Text" @click="openDialog(),savePath(item.path)">{{ item.skillName }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 主選單 > 個人資訊 > 裝備 -->
                <div class="menu_man_equipment_div menu_man" v-show='!(this.menu_man.get("menu_man_equipment"))'>
                    <img id="menu_man_equipment" src="../assets/svg/select.svg" class="menu_man_equipment menu_man_select"
                        @click='this.manSelect("menu_man_equipment")'>
                    <img id="menu_man_equipment_icon" src="../assets/svg/menu_man_equipment_icon.svg"
                        class="menu_man_equipment_icon menu_man_select_icon " @click='this.manSelect("menu_man_equipment")'>
                    <p id="menu_man_equipment_text" class="menu_man_titel_text"
                        @click='this.manSelect("menu_man_equipment")'>
                        Equipment</p>
                </div>
                <div class="menu_man_equipment_div menu_man" v-show='this.menu_man.get("menu_man_equipment")'>
                    <img id="menu_man_equipment" src="../assets/svg/select_On.svg"
                        class="menu_man_equipment menu_man_select" @click='this.manSelect("menu_man_equipment")'>
                    <img id="menu_man_equipment_icon" src="../assets/svg/menu_man_equipment_icon_on.svg"
                        class="menu_man_equipment_icon menu_man_select_icon " @click='this.manSelect("menu_man_equipment")'>
                    <p id="menu_man_equipment_text" class="menu_man_titel_text" style="color: white;"
                        @click='this.manSelect("menu_man_equipment")'>Equipment</p>
                </div>
            </div>




            <!-- 主選單 > 社交，同一className : -->
            <!-- 主選單 > 社交的箭頭 -->
            <div class="menu_social_div" v-show='this.menu.get("menu_social")'>
                <div class="menu_social_arrow_div menu_social">
                    <img src="../assets/svg/arrow.svg" class="menu_social_arrow">
                </div>
                <div class="menu_social_friend_div" v-show='!(this.menu_social.get("menu_social_friend"))'>
                    <img id="menu_social_friend_div" src="../assets/svg/select.svg" class=" menu_social_select"
                        @click='this.socialSelect("menu_social_friend")'>
                    <img id="menu_social_friend_icon" src="../assets/svg/menu_social_friend_icon.svg"
                        class="menu_social_friend_icon menu_social_select_icon "
                        @click='this.socialSelect("menu_social_friend")'>
                    <p id="menu_social_friend_text" class="menu_social_titel_text"
                        @click='this.socialSelect("menu_social_friend")'>Friend
                    </p>
                </div>
                <div class="menu_social_friend_div" v-show='this.menu_social.get("menu_social_friend")'>
                    <img id="menu_social_friend" src="../assets/svg/select_On.svg" class=" menu_social_select"
                        @click='this.socialSelect("menu_social_select")'>
                    <img id="menu_social_friend_icon" src="../assets/svg/menu_social_friend_icon_on.svg"
                        class="menu_social_friend_icon menu_social_select_icon "
                        @click='this.socialSelect("menu_social_friend")'>
                    <p id="menu_social_friend_text" class="menu_social_titel_text" style="color: white;"
                        @click='this.socialSelect("menu_social_friend")'>Friend</p>
                </div>
                <div class="menu_social_party_div" v-show='!(this.menu_social.get("menu_social_party"))'>
                    <img id="menu_social_party_div" src="../assets/svg/select.svg" class=" menu_social_select"
                        @click='this.socialSelect("menu_social_party")'>
                    <img id="menu_social_party_icon" src="../assets/svg/menu_social_party_icon.svg"
                        class="menu_social_party_icon menu_social_select_icon "
                        @click='this.socialSelect("menu_social_party")'>
                    <p id="menu_social_party_text" class="menu_social_titel_text"
                        @click='this.socialSelect("menu_social_party")'>Party
                    </p>
                </div>
                <div class="menu_social_party_div" v-show='this.menu_social.get("menu_social_party")'>
                    <img id="menu_social_party" src="../assets/svg/select_On.svg" class=" menu_social_select"
                        @click='this.socialSelect("menu_social_party")'>
                    <img id="menu_social_party_icon" src="../assets/svg/menu_social_party_icon_on.svg"
                        class="menu_social_party_icon menu_social_select_icon "
                        @click='this.socialSelect("menu_social_party")'>
                    <p id="menu_social_party_text" class="menu_social_titel_text" style="color: white;"
                        @click='this.socialSelect("menu_social_party")'>Party</p>
                </div>
                <div class="menu_social_guild_div" v-show='!(this.menu_social.get("menu_social_guild"))'>
                    <img id="menu_social_guild_div" src="../assets/svg/select.svg" class=" menu_social_select"
                        @click='this.socialSelect("menu_social_guild")'>
                    <img id="menu_social_guild_icon" src="../assets/svg/menu_social_guild_icon.svg"
                        class="menu_social_guild_icon menu_social_select_icon "
                        @click='this.socialSelect("menu_social_guild")'>
                    <p id="menu_social_guild_text" class="menu_social_titel_text"
                        @click='this.socialSelect("menu_social_guild")'>Guild
                    </p>
                </div>
                <div class="menu_social_guild_div" v-show='this.menu_social.get("menu_social_guild")'>
                    <img id="menu_social_guild" src="../assets/svg/select_On.svg" class=" menu_social_select"
                        @click='this.socialSelect("menu_social_guild")'>
                    <img id="menu_social_guild_icon" src="../assets/svg/menu_social_guild_icon_on.svg"
                        class="menu_social_guild_icon menu_social_select_icon "
                        @click='this.socialSelect("menu_social_guild")'>
                    <p id="menu_social_guild_text" class="menu_social_titel_text" style="color: white;"
                        @click='this.socialSelect("menu_social_guild")'>Guild</p>
                </div>


            </div>



            <!-- 主選單 > 設定，同一className : menu_setting -->
            <!-- 主選單 > 設定的箭頭 -->
            <div class="menu_setting_div" v-show='this.menu.get("menu_setting")'>
                <div class="menu_setting_arrow_div menu_setting">
                    <img src="../assets/svg/arrow.svg" class="menu_setting_arrow">
                </div>
                <!-- 主選單 > 設定 > 選項 -->
                <div class="menu_setting_option_div menu_setting" v-show='!(this.menu_setting.get("menu_setting_option"))'>
                    <img id="menu_setting_option" src="../assets/svg/select.svg"
                        class="menu_setting_option menu_setting_select" @click='this.settingSelect("menu_setting_option")'>
                    <img id="menu_setting_option_icon" src="../assets/svg/menu_setting_option_icon.svg"
                        class="menu_setting_option_icon menu_setting_select_icon"
                        @click='this.settingSelect("menu_setting_option")'>
                    <p id="menu_setting_option_text" class="menu_setting_titel_text"
                        @click='this.settingSelect("menu_setting_option")'>Option</p>
                </div>
                <div class="menu_setting_option_div menu_setting" v-show='this.menu_setting.get("menu_setting_option")'>
                    <img id="menu_setting_option" src="../assets/svg/select_On.svg"
                        class="menu_setting_option menu_setting_select" @click='this.settingSelect("menu_setting_option")'>
                    <img id="menu_setting_option_icon" src="../assets/svg/menu_setting_option_icon_on.svg"
                        class="menu_setting_option_icon menu_setting_select_icon"
                        @click='this.settingSelect("menu_setting_option")'>
                    <p id="menu_setting_option_text" class="menu_setting_titel_text" style="color: white;"
                        @click='this.settingSelect("menu_setting_option")'>Option</p>
                </div>
                <!-- 主選單 > 設定 > 幫助 -->
                <div class="menu_setting_help_div menu_setting" v-show='!(this.menu_setting.get("menu_setting_help"))'>
                    <img id="menu_setting_help" src="../assets/svg/select.svg" class="menu_setting_help menu_setting_select"
                        @click='this.settingSelect("menu_setting_help")'>
                    <img id="menu_setting_help_icon" src="../assets/svg/menu_setting_help_icon.svg"
                        class="menu_setting_help_icon menu_setting_select_icon"
                        @click='this.settingSelect("menu_setting_help")'>
                    <p id="menu_setting_help_text" class="menu_setting_titel_text"
                        @click='this.settingSelect("menu_setting_help")'>Help</p>
                </div>
                <div class="menu_setting_help_div menu_setting" v-show='this.menu_setting.get("menu_setting_help")'>
                    <img id="menu_setting_help" src="../assets/svg/select_On.svg"
                        class="menu_setting_help menu_setting_select" @click='this.settingSelect("menu_setting_help")'>
                    <img id="menu_setting_help_icon" src="../assets/svg/menu_setting_help_icon_on.svg"
                        class="menu_setting_help_icon menu_setting_select_icon"
                        @click='this.settingSelect("menu_setting_help")'>
                    <p id="menu_setting_help_text" class="menu_setting_titel_text" style="color: white;"
                        @click='this.settingSelect("menu_setting_help")'>Help</p>
                </div>
                <!-- 主選單 > 設定 > 登出 -->
                <div class="menu_setting_logout_div menu_setting" v-show='!(this.menu_setting.get("menu_setting_logout"))'>
                    <img id="menu_setting_logout" src="../assets/svg/select.svg"
                        class="menu_setting_logout menu_setting_select" @click='this.settingSelect("menu_setting_logout")'>
                    <img id="menu_setting_logout_icon" src="../assets/svg/menu_setting_logout_icon.svg"
                        class="menu_setting_logout_icon menu_setting_select_icon"
                        @click='this.settingSelect("menu_setting_logout")'>
                </div>
                <div class="menu_setting_logout_div menu_setting" v-show='this.menu_setting.get("menu_setting_logout")'>
                    <img id="menu_setting_logout" src="../assets/svg/select_On.svg"
                        class="menu_setting_logout menu_setting_select" @click='this.settingSelect("menu_setting_logout")'>
                    <img id="menu_setting_logout_icon" src="../assets/svg/menu_setting_logout_icon_on.svg"
                        class="menu_setting_logout_icon menu_setting_select_icon"
                        @click='this.settingSelect("menu_setting_logout")'>
                </div>
            </div>

        </div>
    </div>


    <dialog id="confirm-modal" class="modal">
        <div class="modal-content">
            <h3 class="modal-title">Alert</h3>
            <article class="modal-description">
                <div class="container">
                    <p class="alertMessage">確定要進行傳送嗎?</p>
                </div>
            </article>
            <div class="modal-options">
                <button class="btn btn-round option confirm" @click="pushNewPage()">
                    <div class="circle"></div>
                </button>
                <button class="btn btn-round option cancel" @click="cancel()">
                    <div class="cross"></div>
                </button>
            </div>
        </div>
    </dialog>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');
@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

.text-bold {
    font-weight: bold;
}

.btn {
    position: relative;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: hsl(0, 0%, 13%);
    text-decoration: none;
    background-color: lightblue;
    border: transparent;
    border-radius: 3px;
    outline: transparent;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition: 0.25s;

    &-danger {
        color: white;
        background-color: hsl(348, 86%, 61%);

        &:hover {
            background-color: hsl(348, 86%, 53%);
        }
    }

    &-round {
        border-radius: 50%;
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 360px;
    padding: 0;
    font-family: Roboto, sans-serif;
    border: transparent;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
        0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
        0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
        0 100px 80px rgba(0, 0, 0, 0.07);
    opacity: 0;
    animation: show-modal 0.6s forwards;

    &::backdrop {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(3px);
    }

    .modal-content {
        display: grid;
        place-items: center;

        .modal-title {
            font-size: 26px;

            font-family: 'SAOUI-Regular';


        }
        p {
            font-size: 22px;
            font-family: 'SAOUI-Regular';
            }


    }

    .modal-title {
        margin: 0;
        padding: 1rem 0;
    }

    .modal-description {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 98%;
        height: 0;
        background: linear-gradient(hsl(0, 0%, 70%) 0% 1%,
                hsl(0, 0%, 93%) 11% 89%,
                hsl(0, 0%, 70%) 99% 100%);
        overflow: hidden;
        animation: open-description 0.6s 0.2s cubic-bezier(0.745, 0.045, 0.255, 1) forwards; // ease-out-cubic
    }

    .modal-options {
        padding: 1rem 0;

        .option {
            width: 3rem;
            height: 3rem;
            background: transparent;
            border: 1px solid;

            &::before {
                position: absolute;
                content: "";
                top: 4px;
                left: 4px;
                right: 4px;
                bottom: 4px;
                background: currentColor;
                border-radius: inherit;
            }

            &:hover {
                filter: brightness(1.75);
            }
        }

        .confirm {
            margin-right: 3rem;
            color: #4a89dc;

            .circle {
                position: absolute;
                content: "";
                top: 14px;
                left: 14px;
                right: 14px;
                bottom: 14px;
                border: 5px solid white;
                border-radius: inherit;
            }
        }

        .cancel {
            color: #da4453;

            .cross {
                position: absolute;
                top: 14px;
                left: 14px;
                right: 14px;
                bottom: 14px;
                transform: rotate(45deg);

                &::before,
                &::after {
                    position: absolute;
                    content: "";
                    background: white;
                }

                &::before {
                    top: 0;
                    left: calc(50% - 3px);
                    width: 6px;
                    height: 100%;
                }

                &::after {
                    top: calc(50% - 3px);
                    left: 0;
                    width: 100%;
                    height: 6px;
                }
            }
        }
    }
}

@keyframes show-modal {
    to {
        opacity: 1;
    }
}

@keyframes open-description {
    to {
        height: 210px;
    }
}


div::-webkit-scrollbar {
    width: 0;
}


.outer {
    height: 100vh;
    width: 100vw;

    // p{
    //     font-family: 'SAOUI-Bold';
    // }

    .backGroundImg {
        height: 100%;
        width: 100%;
        background-image: url('../assets/image/2.jpg');
        opacity: 0.7; //調整圖片透明度
        background-size: 100% 100%; //設定大小讓圖片符合瀏覽器
        position: relative;

        p {
            font-family: 'SAOUI-Regular';
            user-select: none;
        }

        .icon_menu {
            //iocn大小
            width: 80px;
            height: 80px;
            user-select: none;
        }

        .icon_menu_setting {
            //第一層設定_齒輪
            position: absolute;
            top: -100px;
            right: 48%;
        }

        .icon_menu_setting:hover {
            cursor: pointer
        }

        .icon_menu_location {
            //第一層設定_地圖
            position: absolute;
            top: -100px;
            right: 48%;
        }

        .icon_menu_location:hover {
            cursor: pointer
        }

        .icon_menu_message {
            //第一層設定_訊息
            position: absolute;
            top: -100px;
            right: 48%;
        }

        .icon_menu_message:hover {
            cursor: pointer
        }

        .icon_menu_social {
            //第一層設定_好友
            position: absolute;
            top: -100px;
            right: 48%;
        }

        .icon_menu_social:hover {
            cursor: pointer
        }

        .icon_menu_man {
            //第一層設定_個人資訊
            position: absolute;
            top: -100px;
            right: 48%;
        }

        .icon_menu_man:hover {
            cursor: pointer
        }

        .bloodDiv {
            width: 300px;
            height: 80px;
            position: relative;
            position: absolute;
            top: 1%;
            left: 1%;

            .blood {
                width: 100%;
                height: 100%;
            }

            .text {
                font-size: 23px;
                margin: 0;
                color: white;
                font-family: 'SAOUITT-Regular';
                position: absolute;
                top: 13%;
                left: 9%;
            }
        }

        .menu_man_div {
            .menu_man_select {
                height: 60px;
                width: 220px;
            }

            .menu_man_select_icon {
                height: 45px;
                width: 45px;
                position: absolute;
                top: 8px;
                left: 11px;
            }

            .menu_man_titel_text {
                font-size: 32px;
                margin: 0;
                color: black;
                position: absolute;
                top: 8.5px;
                left: 75px;

            }

            .menu_man_arrow_div {
                height: 0;
                user-select: none;
                position: absolute;
                top: 19.5%;
                left: 52.5%;

                .menu_man_arrow {
                    width: 40%;
                }
            }

            .skills_arrow_div {
                height: 0;
                z-index: 1;
                user-select: none;
                position: absolute;
                top: 0.5%;
                right: 30.5%;

                .skills_arrow {
                    height: 478px;
                    width: 40px;
                }
            }

            .menu_man_items_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 20%;
                left: 54%;
            }

            .menu_man_skills_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 29%;
                left: 54%;

                .skillsList_container {
                    width: 240px;
                    height: 450px;
                    overflow: auto;
                    position: relative;
                    -webkit-overflow-scrolling: touch;
                    position: absolute;
                    top: -210px;
                    right: -470px;


                    .scrollTopBtn {
                        position: fixed;
                        border-radius: 50%;
                        font-size: 12px;
                        color: white;
                        background: goldenrod;
                        bottom: 101px;
                        right: 20px;
                        z-index: 10000;
                        width: 50px;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;

                    }



                    .skillsList {
                        left: 0;
                        right: 0;
                        top: 0;
                        position: absolute;
                        text-align: center;

                        .infinite-list-item {
                            position: relative;

                            .skills_icon {
                                height: 45px;
                                width: 45px;
                                position: absolute;
                                top: 8px;
                                left: 15px;
                            }

                            .skill_titel_Text {
                                font-size: 25px;
                                margin: 0;
                                color: black;
                                position: absolute;
                                top: 0px;
                                left: 66px;

                            }
                        }

                    }
                }


                .skills_list {
                    height: 0;
                    user-select: none;
                    position: relative;
                    display: none;


                    .skills_titel_text {
                        font-size: 25px;
                        margin: 0;
                        color: black;
                        position: absolute;
                        top: 15px;
                        left: 62px;

                    }

                    .skills_list_loop {


                        .skills_VtextAndVmodel_content {
                            position: absolute;
                            top: -288px;
                            right: -451px;
                        }

                        .skills_Vfor_content {
                            position: absolute;
                            top: -223px;
                            right: -451px;
                        }

                        .skills_Von_content {
                            position: absolute;
                            top: -158px;
                            right: -451px;
                        }

                        .skills_Vbind_content {
                            position: absolute;
                            top: -93px;
                            right: -451px;
                        }

                        .skills_VifAndVshow_content {
                            position: absolute;
                            top: -28px;
                            right: -451px;
                        }

                        .skills_WatchAndComputed_content {
                            position: absolute;
                            top: 37px;
                            right: -451px;
                        }

                        .skills_Props_content {
                            position: absolute;
                            top: 102px;
                            right: -451px;
                        }

                        .skills_Emit_content {
                            position: absolute;
                            top: 167px;
                            right: -451px;
                        }

                        .skills_DataFlow_content {
                            position: absolute;
                            top: 232px;
                            right: -451px;
                        }

                        .skills_ProvideAndInject_content {
                            position: absolute;
                            top: 297px;
                            right: -451px;
                        }

                        .skills_RouteFam_content {
                            position: absolute;
                            top: 362px;
                            right: -451px;
                        }

                        .skills_select {
                            height: 60px;
                            width: 220px;
                        }

                    }
                }
            }

            .menu_man_equipment_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 38%;
                left: 54%;
            }

        }

        .characterDiv {
            user-select: none;
            position: relative;
            position: absolute;
            top: 0%;
            left: 27%;

            .menu_man_character {
                height: 450px;
                width: 300px;
                position: absolute;
                top: 14px;
                left: -3px;
            }

            .me_photo {
                height: 190px;
                width: 105px;
                position: absolute;
                top: 87px;
                left: 79px;
            }

            .myNameArea {
                height: 100px;
                width: 260px;
                position: relative;

                .myName {
                    font-family: 'Mochiy Pop One', sans-serif;
                    font-size: 25px;
                    position: absolute;
                    top: 8px;
                    left: 97px;
                }
            }

            .aboutMe {
                height: 150px;
                width: 269px;
                position: relative;
                position: absolute;
                top: 313px;
                left: -2px;

                p {
                    font-family: 'Mochiy Pop One', sans-serif;
                    font-size: 16px;
                    text-align: center;
                    margin-top: 5px;
                }
            }

        }

        .menu_social_div {
            .menu_social_select {
                height: 60px;
                width: 220px;
            }

            .menu_social_select_icon {
                height: 45px;
                width: 45px;
                position: absolute;
                top: 8px;
                left: 11px;
            }

            .menu_social_friend_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 32%;
                left: 54%;
            }

            .menu_social_party_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 41%;
                left: 54%;
            }

            .menu_social_guild_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 50%;
                left: 54%;
            }

            .menu_social_titel_text {
                font-size: 32px;
                margin: 0;
                color: black;
                position: absolute;
                top: 8.5px;
                left: 75px;
            }

            .menu_social_arrow_div {
                height: 0;
                user-select: none;
                position: absolute;
                top: 32%;
                left: 52.5%;

                .menu_social_arrow {
                    width: 40%;
                }
            }


        }


        .menu_setting_div {
            .menu_setting_select {
                height: 60px;
                width: 220px;
            }

            .menu_setting_select_icon {
                height: 45px;
                width: 45px;
                position: absolute;
                top: 8px;
                left: 11px;
            }

            .menu_setting_titel_text {
                font-size: 32px;
                margin: 0;
                color: black;
                position: absolute;
                top: 8.5px;
                left: 75px;

            }

            .menu_setting_arrow_div {
                height: 0;
                user-select: none;
                position: absolute;
                top: 69%;
                left: 52.5%;

                .menu_setting_arrow {
                    width: 40%;
                }
            }

            .menu_setting_option_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 69%;
                left: 54%;

            }

            .menu_setting_help_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 78%;
                left: 54%;

            }

            .menu_setting_logout_div {
                width: 0;
                user-select: none;
                position: relative;
                position: absolute;
                top: 87%;
                left: 54%;

            }

        }
    }
}</style>
