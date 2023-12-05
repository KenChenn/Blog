<script>
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter.js'
import anime from 'animejs'

export default {
    data() {
        return {
            menuOpened: false,
            mouseDownStatus: false,
            startMouseY: "",
            nowMouseY: "",
            menuOpenSound: document.createElement("audio"),
            meanSelectSound: document.createElement("audio"),
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

        menuOpenOrClose() { //開啟或關閉主選單
            this.menuOpenSound.src = "./src/assets/music/sao_menu.mp3"
            switch (true) {
                case this.menuOpened == true && (this.startMouseY - this.nowMouseY) > 200 && this.mouseDownStatus == true:
                    this.menuOpenSound.play();
                    anime({
                        targets: '.icon_menu_man',
                        translateY: 0,
                        duration: 800,
                        delay: 50,
                    })
                    anime({
                        targets: '.icon_menu_friend',
                        translateY: 0,
                        duration: 800,
                        delay: 100,
                    })
                    anime({
                        targets: '.icon_menu_message',
                        translateY: 0,
                        duration: 800,
                        delay: 150,
                    })
                    anime({
                        targets: '.icon_menu_location',
                        translateY: 0,
                        duration: 800,
                        delay: 200,
                    })
                    anime({
                        targets: '.icon_menu_setting',
                        translateY: 0,
                        duration: 800,
                        delay: 250,
                    })
                    this.menuOpened = false;
                    break;

                case this.menuOpened == false && (this.nowMouseY - this.startMouseY) > 200 && this.mouseDownStatus == true:
                    this.menuOpenSound.play();
                    anime({
                        targets: '.icon_menu_setting',
                        translateY: 640,
                        duration: 800,
                        delay: 50,
                    })
                    anime({
                        targets: '.icon_menu_location',
                        translateY: 530,
                        duration: 800,
                        delay: 100,
                    })
                    anime({
                        targets: '.icon_menu_message',
                        translateY: 420,
                        duration: 800,
                        delay: 150,
                    })
                    anime({
                        targets: '.icon_menu_friend',
                        translateY: 310,
                        duration: 800,
                        delay: 200,
                    })
                    anime({
                        targets: '.icon_menu_man',
                        translateY: 200,
                        duration: 800,
                        delay: 250,
                    })
                    this.menuOpened = true;
                    break;
            }
        },
        menuSelect() {
            this.meanSelectSound.src = "./src/assets/music/menu_click.mp3"
            this.meanSelectSound.play();
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
        <div class="backGroundImg" @:mousedown="mouseDown" @:mousemove="mouseMove" @mouseup="mouseUp">
            <!-- 主設定 -->
            <img src="../assets/svg/Man.svg" class="icon_menu_man icon_menu" @click="this.menuSelect()">
            <img src="../assets/svg/Friend.svg" class="icon_menu_friend icon_menu" @click="this.menuSelect()">
            <img src="../assets/svg/Message.svg" class="icon_menu_message icon_menu" @click="this.menuSelect()">
            <img src="../assets/svg/Location.svg" class="icon_menu_location icon_menu" @click="this.menuSelect()">
            <img src="../assets/svg/Config.svg" class="icon_menu_setting icon_menu" @click="this.menuSelect()">

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
            <!-- 主設定 > 個人資訊 > 角色框 -->
            <div class="characterDiv">
                <svg width="560" height="891" viewBox="0 0 560 891" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" class="character">
                    <g class="layer">
                        <title>Layer 1</title>
                        <rect y="155.5" x="1317.5" width="365" id="Menu-3 gradient" height="695" fill="url(#g_b)"
                            display="none" />
                        <g id="3rd_indicator" />
                        <g id="Menu-1">
                            <g opacity="0.4" id="svg_205">
                                <g id="Men">
                                    <g id="svg_234" display="none">
                                        <path id="svg_235" fill="#EBA601"
                                            d="m857,666.75c0,37.55 -30.45,68 -68,68s-68,-30.45 -68,-68s30.45,-68 68,-68s68,30.45 68,68zm-68,-65.17c-35.99,0 -65.17,29.18 -65.17,65.17s29.18,65.17 65.17,65.17s65.17,-29.18 65.17,-65.17s-29.18,-65.17 -65.17,-65.17z" />
                                        <circle r="56.67" id="svg_236" fill="#EBA601" cy="666.75" cx="789" />
                                        <path id="svg_237" fill="#FBFBFB"
                                            d="m768.54,691.68l-19.71,0l2.08,-10.92l18.72,-4.16l0,-4.16l-4.42,-4.16l-0.78,-14.04l6.76,-6.76l7.28,0l6.76,6.76l-0.78,14.04l-4.42,4.16l0,2.58l-8.68,1.93l-2.81,14.73zm37.46,-16.43l0,-4.53l4.82,-4.54l0.85,-15.3l-7.37,-7.36l-7.93,0l-7.37,7.36l0.85,15.3l4.82,4.54l0,4.53l-20.4,4.53l-2.27,11.9l56.67,0l-2.27,-11.9l-20.4,-4.53z" />
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="1st" fill="#4d4d4d" display="none">
                            <circle r="68" id="svg_246" cy="1161" cx="789" />
                            <circle r="68" id="svg_247" cy="996.25" cx="789" />
                            <circle r="68" id="svg_248" cy="831.5" cx="789" />
                            <circle r="68" id="svg_249" cy="666.75" cx="789" />
                            <circle r="68" id="svg_250" cy="502" cx="789" />
                        </g>
                        <g id="main">
                            <g id="main_window">
                                <g id="svg_251" display="none">
                                    <rect y="6" x="1" width="506" id="svg_252" height="593" fill="#D7D7D7" />
                                    <path id="svg_253" fill="#FBFBFB"
                                        d="m506,7l0,591l-504,0l0,-591l504,0m2,-2l-508,0l0,595l508,0l0,-595z" />
                                </g>
                                <g id="svg_254">
                                    <g id="svg_255">
                                        <rect y="295.5" x="1" width="506" id="svg_256" height="593" fill="#D7D7D7" />
                                        <path id="svg_257" fill="#FBFBFB"
                                            d="m506,296.5l0,591l-504,0l0,-591l504,0m2,-2l-508,0l0,595l508,0l0,-595z" />
                                    </g>
                                    <circle r="0" id="svg_264" fill="#4d4d4d" display="none" cy="648.5" cx="60" />
                                    <polygon points="76.5,587.5 60,608.5 43.5,587.5 " id="1st-bottom_triangle"
                                        fill="#FBFBFB" />
                                </g>
                                <polygon points="460.5,494.5 555.5,447 460.5,399.5 " id="1st_indicator" fill="#FBFBFB" />
                                <rect y="-0.5" x="-1" width="510" id="svg_277" height="595" fill="#FBFBFB" />
                                <rect y="89" x="33" width="442" id="svg_278" height="2" fill="#4D4D4D" />
                            </g>
                            <g id="2-Character_Woman" display="none">
                                <g id="svg_279">
                                    <defs
                                        transform="translate(-1 0) translate(0 -1) translate(0 1) translate(-1 0) translate(1 0) translate(1 0) translate(-1 0) translate(-1 0) translate(-141 -56)">
                                        <rect y="560.5" x="327" width="140" id="w_a" height="90" />
                                        <linearGradient y2="Infinity" y1="Infinity" x2="Infinity" x1="Infinity" id="g_b">
                                            <stop stop-opacity="0" stop-color="#fff" offset="0" />
                                            <stop stop-color="#fff" offset="0.25" />
                                            <stop stop-color="#fff" offset="0.5" />
                                            <stop stop-color="#fff" offset="0.75" />
                                            <stop stop-opacity="0" stop-color="#fff" offset="1" />
                                        </linearGradient>
                                        <linearGradient y2="0" y1="1" x2="0.5" x1="0.5" id="w_c">
                                            <stop stop-opacity="0" stop-color="#4D4D4D" offset="0" />
                                            <stop stop-opacity="0" stop-color="#4D4D4D" offset="0.85" />
                                            <stop stop-opacity="0.5" stop-color="#4D4D4D" offset="1" />
                                        </linearGradient>
                                        <radialGradient r="50.39" id="w_d" gradientUnits="userSpaceOnUse"
                                            gradientTransform="matrix(1,0,0,0.4000000059604645,-143,281.95001220703125)"
                                            cy="563.25" cx="397">
                                            <stop stop-opacity="0.5" stop-color="#4D4D4D" offset="0" />
                                            <stop stop-opacity="0" stop-color="#4D4D4D" offset="1" />
                                        </radialGradient>
                                        <linearGradient y2="0" y1="1" x2="0.5" x1="0.5" id="m_d">
                                            <stop stop-opacity="0" stop-color="#4D4D4D" offset="0" />
                                            <stop stop-opacity="0" stop-color="#4D4D4D" offset="0.85" />
                                            <stop stop-opacity="0.5" stop-color="#4D4D4D" offset="1" />
                                        </linearGradient>
                                        <radialGradient r="50.39" id="m_e" gradientUnits="userSpaceOnUse"
                                            gradientTransform="matrix(1,0,0,0.4000000059604645,-143,281.95001220703125)"
                                            cy="563.25" cx="397">
                                            <stop stop-opacity="0.5" stop-color="#4D4D4D" offset="0" />
                                            <stop stop-opacity="0" stop-color="#4D4D4D" offset="1" />
                                        </radialGradient>
                                    </defs>
                                    <clipPath
                                        transform="translate(-1 0) translate(0 -1) translate(0 1) translate(-1 0) translate(1 0) translate(1 0) translate(-1 0) translate(-1 0) translate(-141 -56)"
                                        id="w_b">
                                        <use x="-143" y="-56" xlink:href="#w_a" overflow="visible" id="svg_280" />
                                    </clipPath>
                                    <polygon
                                        points="293.7099914550781,518.75 283.5,673 274.5,703.5 280.04998779296875,732.5 301,643.75 309.6000061035156,643.75 286.8500061035156,766.5 261.8900146484375,776.25 261.8900146484375,782.25 270.54998779296875,782.25 270.54998779296875,813.5 260.54998779296875,824.75 247.45001220703125,824.75 237.45001220703125,813.5 237.45001220703125,782.25 246.1099853515625,782.25 246.1099853515625,776.25 221.14999389648438,766.5 198.39999389648438,643.75 207,643.75 227.95001220703125,732.5 233.5,703.5 224.5,673 214.29000854492188,518.75 193,513.25 193,508.25 228.17001342773438,508.25 252.75,648.75 255.25,648.75 279.8299865722656,508.25 315,508.25 315,513.25 "
                                        opacity="0.9" id="svg_281" fill="url(#w_c)" clip-path="url(#w_b)" />
                                </g>
                                <g id="svg_282">
                                    <ellipse ry="18.75" rx="68.75" id="svg_283" fill="url(#w_d)" cy="507.25" cx="254" />
                                </g>
                                <polygon
                                    points="293.7099914550781,495.75 283.5,341.5 274.5,311 280.04998779296875,282 301,370.75 309.6000061035156,370.75 286.8500061035156,248 261.8900146484375,238.25 261.8900146484375,232.25 270.54998779296875,232.25 270.54998779296875,201 260.54998779296875,189.75 247.45001220703125,189.75 237.45001220703125,201 237.45001220703125,232.25 246.1099853515625,232.25 246.1099853515625,238.25 221.14999389648438,248 198.39999389648438,370.75 207,370.75 227.95001220703125,282 233.5,311 224.5,341.5 214.29000854492188,495.75 193,501.25 193,506.25 228.17001342773438,506.25 252.75,365.75 255.25,365.75 279.8299865722656,506.25 315,506.25 315,501.25 "
                                    opacity="0.9" id="svg_284" fill="#4D4D4D" />
                            </g>
                            <g id="2-Character_Man">
                                <g id="svg_285">
                                    <defs
                                        transform="translate(-1 0) translate(0 -1) translate(0 1) translate(-1 0) translate(1 0) translate(1 0) translate(-1 0) translate(-1 0) translate(-141 -56)">
                                        <rect y="560.5" x="327" width="140" id="m_b" height="90" />
                                    </defs>
                                    <clipPath
                                        transform="translate(-1 0) translate(0 -1) translate(0 1) translate(-1 0) translate(1 0) translate(1 0) translate(-1 0) translate(-1 0) translate(-141 -56)"
                                        id="m_c">
                                        <use x="-143" y="-56" xlink:href="#b" overflow="visible" id="svg_286" />
                                    </clipPath>
                                    <polygon
                                        points="256.25,644.25 283.75,508.25 322.75,508.25 322.75,513.75 300.25,519.75 281.75,684.75 286.75,723.75 305.25,643.75 316.75,643.75 293.75,769.25 263.75,776.25 262.75,780.75 269.25,786.75 271.25,813.5 261.25,824.75 246.75,824.75 236.75,813.5 238.75,786.75 245.25,780.75 244.25,776.25 214.25,769.25 191.25,643.75 202.75,643.75 221.25,723.75 226.25,684.75 207.75,519.75 185.25,513.75 185.25,508.25 224.25,508.25 251.75,644.25 "
                                        opacity="0.9" id="svg_287" fill="url(#m_d)" clip-path="url(#m_c)" />
                                </g>
                                <g id="svg_288">
                                    <ellipse ry="18.75" rx="68.75" id="svg_289" fill="url(#m_e)" cy="507.25" cx="254" />
                                </g>
                                <polygon
                                    points="256.25,370.25 283.75,506.25 322.75,506.25 322.75,500.75 300.25,494.75 281.75,329.75 286.75,290.75 305.25,370.75 316.75,370.75 293.75,245.25 263.75,238.25 262.75,233.75 269.25,227.75 271.25,201 261.25,189.75 246.75,189.75 236.75,201 238.75,227.75 245.25,233.75 244.25,238.25 214.25,245.25 191.25,370.75 202.75,370.75 221.25,290.75 226.25,329.75 207.75,494.75 185.25,500.75 185.25,506.25 224.25,506.25 251.75,370.25 "
                                    opacity="0.9" id="svg_290" fill="#4D4D4D" />
                            </g>
                            <g id="1-Skills">
                                <g id="raw" fill="#4D4D4D">
                                    <path id="svg_291"
                                        d="m254,527.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_292" cy="552" cx="254" />
                                    <path id="svg_293"
                                        d="m254,114.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_294" cy="139" cx="254" />
                                </g>
                                <g transform="rotate(30 254 345.5)" id="30" fill="#4D4D4D">
                                    <path id="svg_295"
                                        d="m254,527.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_296" cy="552" cx="254" />
                                    <path id="svg_297"
                                        d="m254,114.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_298" cy="139" cx="254" />
                                </g>
                                <g id="60" fill="#4D4D4D">
                                    <path transform="rotate(60 75.166 448.75)" id="svg_299"
                                        d="m75.17,424.25c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <path transform="rotate(60 432.834 242.25)" id="svg_301"
                                        d="m432.83,217.75c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle transform="rotate(60 432.834 242.25)" r="19" id="svg_302" cy="242.25"
                                        cx="432.83" />
                                    <circle transform="rotate(60 75.09 448.754)" r="19" id="svg_430" cy="448.75"
                                        cx="75.09" />
                                </g>
                                <g transform="rotate(90 254 345.5)" id="90" fill="#4D4D4D">
                                    <path id="svg_303"
                                        d="m254,527.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_304" cy="552" cx="254" />
                                    <path id="svg_305"
                                        d="m254,114.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_306" cy="139" cx="254" />
                                </g>
                                <g transform="rotate(120 254 345.5)" id="120" fill="#4D4D4D">
                                    <path id="svg_307"
                                        d="m254,527.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_308" cy="552" cx="254" />
                                    <path id="svg_309"
                                        d="m254,114.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_310" cy="139" cx="254" />
                                </g>
                                <g transform="rotate(150 254 345.5)" id="150" fill="#4D4D4D">
                                    <path id="svg_311"
                                        d="m254,527.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_312" cy="552" cx="254" />
                                    <path id="svg_313"
                                        d="m254,114.5c-13.53,0 -24.5,10.97 -24.5,24.5s10.97,24.5 24.5,24.5s24.5,-10.97 24.5,-24.5s-10.97,-24.5 -24.5,-24.5zm0,46.5c-12.15,0 -22,-9.85 -22,-22s9.85,-22 22,-22s22,9.85 22,22s-9.85,22 -22,22z" />
                                    <circle r="19" id="svg_314" cy="139" cx="254" />
                                </g>
                            </g>
                            <g id="1-Details" display="none">
                                <g id="bottom">
                                    <g stroke-miterlimit="10" id="svg_315">
                                        <line y2="526.63" y1="537.13" x2="254" x1="254" stroke-width="4.38" stroke="#FBFBFB"
                                            id="svg_316" fill="none" />
                                        <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_317" fill="#FBFBFB"
                                            cy="521.5" cx="254" />
                                        <line y2="526.63" y1="537.13" x2="254" x1="254" stroke-width="1.75" stroke="#4D4D4D"
                                            id="svg_318" fill="#4D4D4D" />
                                        <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_319" fill="none"
                                            cy="521.5" cx="254" />
                                    </g>
                                    <g id="svg_320">
                                        <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                            id="svg_321" fill="none" cy="552" cx="254" />
                                        <circle r="10.06" id="svg_322" fill="#4D4D4D" cy="552" cx="254" />
                                    </g>
                                </g>
                                <g id="45-bottom">
                                    <g id="svg_323">
                                        <g stroke-miterlimit="10" id="svg_324">
                                            <polyline stroke-width="4.38" stroke="#FBFBFB"
                                                points="389.4990234375,480.9990234375 317.5,409 282.125,409 " id="svg_325"
                                                fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_326"
                                                fill="#FBFBFB" cy="409" cx="277" />
                                            <polyline stroke-width="1.75" stroke="#4D4D4D"
                                                points="389.4990234375,480.9990234375 317.5,409 282.125,409 " id="svg_327"
                                                fill="none" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_328" fill="none"
                                                cy="409" cx="277" />
                                        </g>
                                        <g id="svg_329">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_330" fill="none" cy="491.52" cx="400.02" />
                                            <circle r="10.06" id="svg_331" fill="#4D4D4D" cy="491.52" cx="400.02" />
                                        </g>
                                    </g>
                                    <g id="svg_332">
                                        <g stroke-miterlimit="10" id="svg_333">
                                            <polyline stroke-width="4.38" stroke="#FBFBFB"
                                                points="118.5,480.9990234375 190.5,409 225.875,409 " id="svg_334"
                                                fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_335"
                                                fill="#FBFBFB" cy="409" cx="231" />
                                            <polyline stroke-width="1.75" stroke="#4D4D4D"
                                                points="118.5,480.9990234375 190.5,409 225.875,409 " id="svg_336"
                                                fill="none" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_337" fill="none"
                                                cy="409" cx="231" />
                                        </g>
                                        <g id="svg_338">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_339" fill="none" cy="491.52" cx="107.98" />
                                            <circle r="10.06" id="svg_340" fill="#4D4D4D" cy="491.52" cx="107.98" />
                                        </g>
                                    </g>
                                </g>
                                <g id="67.5-bottom">
                                    <g id="svg_341">
                                        <g stroke-miterlimit="10" id="svg_342">
                                            <line y2="374.25" y1="418.83" x2="323.41" x1="431.04" stroke-width="4.38"
                                                stroke="#FBFBFB" id="svg_343" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_344"
                                                fill="#FBFBFB" cy="372.29" cx="318.67" />
                                            <line y2="374.25" y1="418.83" x2="323.41" x1="431.04" stroke-width="1.75"
                                                stroke="#4D4D4D" id="svg_345" fill="#4D4D4D" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_346" fill="none"
                                                cy="372.29" cx="318.67" />
                                        </g>
                                        <g id="svg_347">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_348" fill="none" cy="424.52" cx="444.78" />
                                            <circle r="10.06" id="svg_349" fill="#4D4D4D" cy="424.52" cx="444.78" />
                                        </g>
                                    </g>
                                    <g id="svg_350">
                                        <g stroke-miterlimit="10" id="svg_351">
                                            <line y2="374.25" y1="418.83" x2="184.59" x1="76.96" stroke-width="4.38"
                                                stroke="#FBFBFB" id="svg_352" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_353"
                                                fill="#FBFBFB" cy="372.29" cx="189.33" />
                                            <line y2="374.25" y1="418.83" x2="184.59" x1="76.96" stroke-width="1.75"
                                                stroke="#4D4D4D" id="svg_354" fill="#4D4D4D" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_355" fill="none"
                                                cy="372.29" cx="189.33" />
                                        </g>
                                        <g id="svg_356">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_357" fill="none" cy="424.52" cx="63.22" />
                                            <circle r="10.06" id="svg_358" fill="#4D4D4D" cy="424.52" cx="63.22" />
                                        </g>
                                    </g>
                                </g>
                                <g id="svg_1">
                                    <g id="svg_359">
                                        <g stroke-miterlimit="10" id="svg_360">
                                            <line y2="345.5" y1="345.5" x2="317.13" x1="445.63" stroke-width="4.38"
                                                stroke="#FBFBFB" id="svg_361" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_362"
                                                fill="#FBFBFB" cy="345.5" cx="312" />
                                            <line y2="345.5" y1="345.5" x2="317.13" x1="445.63" stroke-width="1.75"
                                                stroke="#4D4D4D" id="svg_363" fill="#4D4D4D" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_364" fill="none"
                                                cy="345.5" cx="312" />
                                        </g>
                                        <g id="svg_365">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_366" fill="none" cy="345.5" cx="460.5" />
                                            <circle r="10.06" id="svg_367" fill="#4D4D4D" cy="345.5" cx="460.5" />
                                        </g>
                                    </g>
                                    <g id="svg_368">
                                        <g stroke-miterlimit="10" id="svg_369">
                                            <line y2="345.5" y1="345.5" x2="190.88" x1="62.38" stroke-width="4.38"
                                                stroke="#FBFBFB" id="svg_370" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_371"
                                                fill="#FBFBFB" cy="345.5" cx="196" />
                                            <line y2="345.5" y1="345.5" x2="190.88" x1="62.38" stroke-width="1.75"
                                                stroke="#4D4D4D" id="svg_372" fill="#4D4D4D" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_373" fill="none"
                                                cy="345.5" cx="196" />
                                        </g>
                                        <g id="svg_374">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_375" fill="none" cy="345.5" cx="47.5" />
                                            <circle r="10.06" id="svg_376" fill="#4D4D4D" cy="345.5" cx="47.5" />
                                        </g>
                                    </g>
                                </g>
                                <g id="67.5">
                                    <g id="svg_377">
                                        <g stroke-miterlimit="10" id="svg_378">
                                            <polyline stroke-width="4.38" stroke="#FBFBFB"
                                                points="431.03802490234375,272.1679992675781 331.2550048828125,313.5 286.125,313.5 "
                                                id="svg_379" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_380"
                                                fill="#FBFBFB" cy="313.5" cx="281" />
                                            <polyline stroke-width="1.75" stroke="#4D4D4D"
                                                points="431.03802490234375,272.1679992675781 331.2550048828125,313.5 286.125,313.5 "
                                                id="svg_381" fill="none" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_382" fill="none"
                                                cy="313.5" cx="281" />
                                        </g>
                                        <g id="svg_383">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_384" fill="none" cy="266.48" cx="444.78" />
                                            <circle r="10.06" id="svg_385" fill="#4D4D4D" cy="266.48" cx="444.78" />
                                        </g>
                                    </g>
                                    <g id="svg_386">
                                        <g stroke-miterlimit="10" id="svg_387">
                                            <polyline stroke-width="4.38" stroke="#FBFBFB"
                                                points="76.96200561523438,272.1679992675781 176.7449951171875,313.5 221.875,313.5 "
                                                id="svg_388" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_389"
                                                fill="#FBFBFB" cy="313.5" cx="227" />
                                            <polyline stroke-width="1.75" stroke="#4D4D4D"
                                                points="76.96200561523438,272.1679992675781 176.7449951171875,313.5 221.875,313.5 "
                                                id="svg_390" fill="none" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_391" fill="none"
                                                cy="313.5" cx="227" />
                                        </g>
                                        <g id="svg_392">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_393" fill="none" cy="266.48" cx="63.22" />
                                            <circle r="10.06" id="svg_394" fill="#4D4D4D" cy="266.48" cx="63.22" />
                                        </g>
                                    </g>
                                </g>
                                <g id="45">
                                    <g id="svg_395">
                                        <g stroke-miterlimit="10" id="svg_396">
                                            <polyline stroke-width="4.38" stroke="#FBFBFB"
                                                points="389.4990234375,210.00100708007812 315,284.5 308.2080078125,284.5 "
                                                id="svg_397" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_398"
                                                fill="#FBFBFB" cy="284.5" cx="303.08" />
                                            <polyline stroke-width="1.75" stroke="#4D4D4D"
                                                points="389.4990234375,210.00100708007812 315,284.5 308.2080078125,284.5 "
                                                id="svg_399" fill="none" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_400" fill="none"
                                                cy="284.5" cx="303.08" />
                                        </g>
                                        <g id="svg_401">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_402" fill="none" cy="199.48" cx="400.02" />
                                            <circle r="10.06" id="svg_403" fill="#4D4D4D" cy="199.48" cx="400.02" />
                                        </g>
                                    </g>
                                    <g id="svg_404">
                                        <g stroke-miterlimit="10" id="svg_405">
                                            <polyline stroke-width="4.38" stroke="#FBFBFB"
                                                points="118.5,210.00100708007812 193,284.5 199.7919921875,284.5 "
                                                id="svg_406" fill="none" />
                                            <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_407"
                                                fill="#FBFBFB" cy="284.5" cx="204.92" />
                                            <polyline stroke-width="1.75" stroke="#4D4D4D"
                                                points="118.5,210.00100708007812 193,284.5 199.7919921875,284.5 "
                                                id="svg_408" fill="none" />
                                            <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_409" fill="none"
                                                cy="284.5" cx="204.92" />
                                        </g>
                                        <g id="svg_410">
                                            <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                                id="svg_411" fill="none" cy="199.48" cx="107.98" />
                                            <circle r="10.06" id="svg_412" fill="#4D4D4D" cy="199.48" cx="107.98" />
                                        </g>
                                    </g>
                                </g>
                                <g id="top">
                                    <g stroke-miterlimit="10" id="svg_413">
                                        <line y2="161.88" y1="153.88" x2="254" x1="254" stroke-width="4.38" stroke="#FBFBFB"
                                            id="svg_414" fill="none" />
                                        <circle stroke-width="5.25" stroke="#FBFBFB" r="5.13" id="svg_415" fill="#FBFBFB"
                                            cy="167" cx="254" />
                                        <line y2="161.88" y1="153.88" x2="254" x1="254" stroke-width="1.75" stroke="#4D4D4D"
                                            id="svg_416" fill="#4D4D4D" />
                                        <circle stroke-width="2.63" stroke="#4D4D4D" r="5.13" id="svg_417" fill="none"
                                            cy="167" cx="254" />
                                    </g>
                                    <g id="svg_418">
                                        <circle stroke-width="1.75" stroke-miterlimit="10" stroke="#4D4D4D" r="14.88"
                                            id="svg_419" fill="none" cy="139" cx="254" />
                                        <circle r="10.06" id="svg_420" fill="#4D4D4D" cy="139" cx="254" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>







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

        .icon_menu {
            //iocn大小
            width: 100px;
            height: 100px;
        }

        .icon_menu_setting {
            //第一層設定_齒輪
            position: absolute;
            top: -20%;
            right: 48%;
        }

        .icon_menu_setting:hover {
            content: url("../assets/svg/Config_on.svg");
        }

        .icon_menu_location {
            //第一層設定_地圖
            position: absolute;
            top: -20%;
            right: 48%;
        }

        .icon_menu_location:hover {
            content: url("../assets/svg/Location_on.svg");
        }

        .icon_menu_message {
            //第一層設定_訊息
            position: absolute;
            top: -20%;
            right: 48%;
        }

        .icon_menu_message:hover {
            content: url("../assets/svg/Message_on.svg");
        }

        .icon_menu_friend {
            //第一層設定_好友
            position: absolute;
            top: -20%;
            right: 48%;
        }

        .icon_menu_friend:hover {
            content: url("../assets/svg/Friend_on.svg");
        }

        .icon_menu_man {
            //第一層設定_個人資訊
            position: absolute;
            top: -20%;
            right: 48%;
        }

        .icon_menu_man:hover {
            content: url("../assets/svg/Man_on.svg");
        }

        .bloodDiv {
            width: 400px;
            height: 100px;
            position: absolute;
            top: 1%;
            left: 1%;
            position: relative;

            .blood {
                width: 100%;
                height: 100%;
            }

            .text {
                font-size: 26px;
                margin: 0;
                color: white;
                font-family: 'SAOUITT-Regular';
                position: absolute;
                top: 13%;
                left: 9%;
            }
        }

        .characterDiv {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 10%;
            left: 5%;

            .character {
                width: 100%;
                height: 100%;
            }
        }


    }
}
</style>
