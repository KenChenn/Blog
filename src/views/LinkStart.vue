<script >
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter.js'
import anime from 'animejs'
import $ from 'jquery'


export default {
    data() {
        return {
            countDownSecond: 5, //倒數計時變數
        }
    },
    computed: {
        ...mapState(counter, ["headerShow"])    //匯入pinia的變數
    },
    methods: {
        ...mapActions(counter, ["setHeaderShow"]), //匯入pinia的函式
        countDown() {    //函式_倒數計時
            this.countDownSecond--
            if (this.countDownSecond != 0) {
                setTimeout(() => {
                    this.countDown()
                }, 1000)
            } else {
                let animationHtml = document.querySelectorAll(".particule") //將動畫創建出來的所有div抓起來
                animationHtml.forEach(item => {      //針對抓出來的NodList進行遍歷
                    item.parentNode.removeChild(item)   //將div刪除
                })
                document.body.removeAttribute("style") //清除body留下的所有樣式
                this.$router.push('/SwordArtOnline')
                //動畫執行期間網頁CPU使用率約在10%上下
                //透過導入的方式過去分頁的話，網頁CPU使用率會在3~5%，直接在分頁刷新或是利用網址直接到分頁的話，CPU使用率趨近於0%，待研究
            }
        },
        shuttle() { //函式_畫面切換成光軌道
            $('.first').attr("style","display:none")
            this.countDown()
            document.body.style.backgroundColor = "black"
            document.body.style.overflow = "hidden"
            document.body.style.position = "absolute"
            document.body.style.width = "100%"
            document.body.style.height = "100%"

            let numberOfEls = 1000;
            let duration = 1000;
            let midScreenX = window.innerWidth / 2;
            let midScreenY = window.innerHeight / 2;
            let radius = Math.sqrt(midScreenX * midScreenX + midScreenY * midScreenY);
            let fragment = document.createDocumentFragment();

            for (let i = 0; i < numberOfEls; i++) {
                let hue = Math.round(360 / numberOfEls * i);
                let angle = Math.random() * Math.PI * 2;
                let el = document.createElement('div');
                el.classList.add('particule');
                el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)';
                el.style.width = '1px';
                el.style.height = '1px';
                anime({
                    targets: el,
                    width: ['1px', '10px'],
                    height: ['1px', '10px'],
                    left: [midScreenX + 'px', Math.cos(angle) * radius + midScreenX + 'px'],
                    top: [midScreenY + 'px', Math.sin(angle) * radius + midScreenY + 'px'],
                    delay: (duration / numberOfEls) * i,
                    duration: duration,
                    easing: 'easeInExpo',
                    loop: true
                });
                fragment.appendChild(el);
            }

            document.body.appendChild(fragment);
        },
        linkStart(){
            let audio = document.createElement("audio")
            audio.src="./src/assets/music/LS_Kirito.mp3"
            audio.play();
            setTimeout(() => {
                this.shuttle()
                }, 1000)
        },
        title() {
            $(window).on("load", function () {
                $('.effect').each(function () {
                    $(this).addClass('active');
                })
                $('.fade').addClass('active');
            });

            $(document).ready(function () {

                $('.cta').click(function () {
                    $('html, body').animate({
                        scrollTop: $("#anchor").offset().top
                    }, 800);
                });

                $('.first').bind('mousewheel', function (e) {
                    return false;
                });

            });
        }
    },
    created() {
        this.setHeaderShow(false)   //不顯示Header
        // this.countDown()
        // this.shuttle()

    },
    mounted() {
        this.title()

    },
}



</script>

<template>
    <section class="first">
        <div class="wrap">
            <h1 class="effect">SWORD ART ONLINE</h1>
            <p class="fade">これは、プログラミングであっても遊びではない</p>
            <a class="cta outline fade" @click="this.linkStart()"><span>Link Start</span></a>
        </div>
    </section>
</template>

<style lang="scss">  //加了scoped就會無法使用，可能跟元素是臨時創建的有關，待研究
  // 首頁特效
h1,h2,h3 {
    font-family:'SAOWelcome-Bold';
}

.effect {
    font-size: 6vw;
    margin-bottom: 10%;
    text-transform: uppercase;
    letter-spacing: 0.2vw;
    font-weight: 700;
    display: inline-block;
    position: relative;
    -webkit-background-clip: text;
    background-clip: text;
    background: -webkit-linear-gradient(0deg, #222 50%, transparent 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: 100% 0;
    background-size: 200% 100%;
    transition: 0.6s all cubic-bezier(0.860, 0.000, 0.070, 1.000) 0.8s;
}

.effect:before {
    content: "";
    height: 100%;
    width: 100%;
    background: #eaeaea;
    z-index: 2;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: left;
    transform: scaleX(0);
}

.effect:after {
    content: "";
    height: 100%;
    width: 100%;
    background: #222;
    z-index: 2;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: left;
    transform: scaleX(0);
}

.effect.active {
    background-position: 0 0;
}

.effect.active:before {
    animation: anime 1.2s cubic-bezier(0.860, 0.000, 0.070, 1.000) forwards;
}

.effect.active:after {
    animation: anime 1.2s 0.5s cubic-bezier(0.860, 0.000, 0.070, 1.000) forwards;
}

@keyframes anime {
    0% {
        transform-origin: left;
        transform: scaleX(0);
    }

    50% {
        transform-origin: left;
        transform: scaleX(1);
    }

    51% {
        transform-origin: right;
    }

    100% {
        transform-origin: right;
        transform: scaleX(0);
    }
}

.cta {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-size: 0.7em;
    font-weight: 700;
    cursor: pointer;
    display: inline-block;
    line-height: 2em;
    padding: 2px 10px;
    background: #222;
    margin-top: 20px;
    transition: 0.2s all ease-out;
    -webkit-transition: 0.2s all ease-out;
    -moz-transition: 0.2s all ease-out;
    color: #fff;
    transition: 0.3s all ease-out;
    -webkit-transition: 0.3s all ease-out;
    -moz-transition: 0.3s all ease-out;
    letter-spacing: 1px;
}

a.cta.outline {
    position: relative;
    background: transparent;
    border: 1px solid #222;
    overflow: hidden;
}

.cta.outline:before {
    content: "";
    height: 100%;
    z-index: -1;
    width: 100%;
    background: #222;
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    transform: scaleX(0);
    -webkit-transform: scaleX(0);
    -moz-transform: scaleX(0);
    transition: 0.6s transform cubic-bezier(1.000, 0.610, 0.165, 1.000);
    -webkit-transition: 0.6s transform cubic-bezier(1.000, 0.610, 0.165, 1.000);
    -moz-transition: 0.6s transform cubic-bezier(1.000, 0.610, 0.165, 1.000);
    transform-origin: right;
    -webkit-transform-origin: right;
}

.cta.outline span {
    position: relative;
    z-index: 3;
    -webkit-background-clip: text;
    background-clip: text;
    background: -webkit-linear-gradient(0deg, #FFF 50%, #222 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: 100% 0;
    background-size: 200% 100%;
    color: transparent;
    transition: 0.6s all cubic-bezier(1.000, 0.610, 0.165, 1.000) 0.2s;
    -webkit-transition: 0.6s all cubic-bezier(1.000, 0.610, 0.165, 1.000) 0.2s;
    -moz-transition: 0.6s all cubic-bezier(1.000, 0.610, 0.165, 1.000) 0.2s;
}

.cta.outline:hover:before {
    transform: scaleX(1);
    -webkit-transform: scaleX(1);
    -moz-transform: scaleX(1);
    transform-origin: left;
    -webkit-transform-origin: left;
}

.cta.outline:hover {
    box-shadow: none;
}

.cta.outline:hover span {
    background-position: 0 0;
}

.fade {
    font-size: 30px;
    opacity: 0;
    transform: translateY(20px);
    transition: 0.6s all ease-out 2s;
}

a.fade {
    transition: 0.6s all ease-out 2.6s;
}

.fade.active {
    transform: translateY(0);
    opacity: 1;
}


/* bullshit */

section {
    text-align: center;
    padding: 0 20%;
    height: 100vh;
}

.wrap {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

p {
    margin: 10px 0 0 0;
}



// 穿梭特效
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.particule {
    position: absolute;
}</style>
