<template>
  <div id="app">
    <!-- 背景图片 -->
    <div
      class="bg"
      style="background-image: url(https://static.xhxly.cn//1uPIAS.jpg)"
    ></div>
    <div
      class="bg blur"
      style="background-image: url(https://static.xhxly.cn//1uPIAS.jpg)"
    ></div>
  
    <!-- 音乐播放器主体结构 -->
    <div class="music-wrapper">
      <!-- 顶部栏 -->
      <div class="topBar">
        <div class="back"><i class="iconfont">&#xe61e;</i></div>
        <!-- 歌曲信息 -->
        <div class="info">
          <!-- 标题 -->
          <div class="title">
            {{title}}
          </div>
          <!-- 作者 -->
          <div class="author">
            {{author}}
          </div>
        </div>
        <div class="share"><i class="iconfont share">&#xe639;</i></div>
      </div>
  
      <!-- CD封面 -->
      <div class="main">
        <div
          class="CD"
					:style="'background-image: url(' + bgurl + ');\
					transform: rotate(' + rotateDeg + 'deg)'"
        ></div>
      </div>

      <!-- 播放音乐 -->
      <audio ref="player" :src="src" @canplay="handleCanPlay" @timeupdate="handleTimeUpdate"></audio>
  
      <!-- 进度条 -->
      <div class="progress">
        <div class="curTime">{{transferSecToTime(audio.currentTime)}}</div>
        <div class="progress-line">
          <div class="whole-line"></div>
          <div class="already-line" :style='"width:" + progress + "%"'></div>
          <div class="play-point" :style='"left:" + progress + "%"'></div>
        </div>
        <div class="AllTime">{{transferSecToTime(audio.duration)}}</div>
      </div>
  
      <!-- 底部控制条 -->
      <div class="toolBar">
        <div class="heart"><i class="iconfont share">&#xe68d;</i></div>
        <div class="last"><i class="iconfont share">&#xe6e1;</i></div>
        <div class="play" v-if="!isPlaying" v-on:click="playMusic"><i class="iconfont share">&#xe6ce;</i></div>
        <div class="pause" v-if="isPlaying" v-on:click="pauseMusic"><i class="iconfont share">&#xe643;</i></div>
        <div class="next"><i class="iconfont share">&#xe718;</i></div>
        <div class="list" @click="isVisible=true"><i class="iconfont share">&#xe6d3;</i></div>
      </div>

			<!-- 评论列表 -->
			<div class="comment-list" v-if="isVisible">
				<div class="comment-list__back" @click="isVisible=false">
					<i class="iconfont">&#xe61e;</i>
				</div>
				<div class="comment-list__count">
					评论（{{comments.length}}）
				</div>
				<div class="comment-list__item" v-for="comment in comments" :key="comment.id">
					<div class="comment-list__item-meta">
						<div class="comment-list__item-meta__name">
							{{comment.name}}
						</div>
						<div class="comment-list__item-meta__date">
							{{comment.createdAt}}
						</div>
					</div>
					<div class="comment-list__item-comment">
						{{comment.comment}}
					</div>
				</div>
				<div class="comment-pub">
					<input v-model="inputtedComment" placeholder="说点什么吧">
					<div class="pub-button" @click="addComment">发送</div>
				</div>
			</div>
			
    </div>
  </div>
</template>

<script>
export default({
    el: '#app',
    data: function() {
return {
      //音乐标题
      title: '音乐标题',
      //歌手名称
      author: '歌手名称',
      //音乐来源
      src:"https://static.xhxly.cn/Reality.mp3",
      //封面来源
      bgurl:"https://static.xhxly.cn//1uPIAS.jpg",
      //播放状态检测
      isPlaying:false,
      //旋转角度变量
      rotateDeg:0,
      //定时器变量
      timeSet:0,
      //音乐信息
      audio:{
        duration:0,
        currentTime:0
      },
      //评论区展开状态
      isVisible:false,
      //评论区预设内容
      comments :[{
        name:"旻",
        createdAt:"2021/08/08",
        comment:"笑了",
      },{
        name:"肠炎",
        createdAt:"2011/08/15",
        comment:"感人",
      },{
        name:"走了",
        createdAt:"2017/09/22",
        comment:"呵呵",
      }],
      //评论内容
      inputtedComment:""
    };
},
    computed:{
      //计算音乐播放百分比
      progress(){
        var currentTime = this.audio.currentTime;
        var duration = this.audio.duration;
        var progress = (currentTime/duration)*100;
        return progress;
      }
    },
    methods: {
      //按下播放键播放音乐
      playMusic(){
        this.$refs.player.play();
        this.isPlaying = true;
        this.startRotate();
      },
      //按下暂停键暂停音乐
      pauseMusic(){
        this.$refs.player.pause();
        this.isPlaying = false;
        this.stopRotate();
      },
      //使CD封面开始旋转
      startRotate(){
        var rotateTimes = 5;
        var rotateSteps = 0.08;
        var that = this;
        var clockNum = setInterval(function(){
          that.rotateDeg += rotateSteps;
        },rotateTimes);
        this.clockNum = clockNum;
      },
      //使CD封面停止旋转
      stopRotate(){
        clearInterval(this.clockNum);
      },
      //准备进度条与时长
      handleCanPlay(event){
        this.audio.duration = event.target.duration;
      },
      //实时检测播放进度
      handleTimeUpdate(event){
        this.audio.currentTime = event.target.currentTime;
      },
      //将时间格式转换为分秒制
      transferSecToTime(time) {
        var tempTime = Math.floor(time);
        var min = 0;
        var sec = 0;
      
        if (tempTime > 60) {
          min = Math.floor(tempTime / 60);
          sec = tempTime % 60;
        } else {
          sec = tempTime;
        }
      
        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec
      
        return min + ':' + sec
      },
      addComment(){
        var name = "tester";
        var createdAt = new Date().toLocaleDateString();
        this.comments.push({
          name : name,
          createdAt : createdAt,
          comment : this.inputtedComment,
        });
        this.inputtedComment = '';
      },
    },
  })
</script>

<style>
@font-face {
    font-family: "iconfont"; /* project id 1622128 */
    src: url("http://at.alicdn.com/t/font_1622128_z6hlqa9uqe.eot");
    src: url("http://at.alicdn.com/t/font_1622128_z6hlqa9uqe.eot?#iefix")
        format("embedded-opentype"),
      url("http://at.alicdn.com/t/font_1622128_z6hlqa9uqe.woff2")
        format("woff2"),
      url("http://at.alicdn.com/t/font_1622128_z6hlqa9uqe.woff")
        format("woff"),
      url("http://at.alicdn.com/t/font_1622128_z6hlqa9uqe.ttf")
        format("truetype"),
      url("http://at.alicdn.com/t/font_1622128_z6hlqa9uqe.svg#iconfont")
        format("svg");
  }
  
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 50px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    transform: scale(0.5);
    transform-origin: left top;
    width: 720px;
    height: 1280px;
    padding: 0;
    margin: 0;
  }
  
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(15px);
    transform: scale(1.1);
  }
  
  .blur {
    filter: blur(100px);
  }
  
  .music-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .topBar {
    margin: 0 4%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    color: #fefffe;
  }
  
  .topBar .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .topBar .info .author {
    color: #e5e4e3;
    font-size: 28px;
  }
  
  .topBar .share i {
    font-size: 60px;
  }
  
  .main {
    margin: 0 4%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
  
  .main .CD {
    height: 400px;
    width: 400px;
    background-color: white;
    border-radius: 50%;
    background: center;
  }
  
  .progress {
    color: #8e857b;
    font-size: 20px;
    margin: 0 4%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .progress .progress-line {
    width: 75%;
    position: relative;
    display: flex;
    align-items: center;
    color: #8e857b;
  }
  
  .progress .progress-line .already-line {
    width: 50%;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: #a9a39c;
  }
  .progress .progress-line .play-point {
    left: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    background-color: #fefffe;
  }
  
  .progress .progress-line .whole-line {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #8c8379;
  }
  
  .toolBar {
    color: #fefffe;
    margin: 0 4%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  
  .comment-list__back {
    position: absolute;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
  
  .comment-list__back i {
    font-size: 48px;
    color: white;
    margin-left: 20px;
  }
  
  .comment-list__count {
    color: white;
    font-size: 48px;
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
  
  .comment-list__item {
    padding: 0 20px 20px;
    color: white;
    margin-bottom: 20px;
    border-bottom: 1px solid white;
  }
  
  .comment-list__item:first-child {
    padding-top: 20px;
  }
  
  .comment-list__item-meta {
    margin-bottom: 10px;
  }
  
  .comment-list__item-meta__name {
    font-size: 36px;
  }
  
  .comment-list__item-meta__date {
    font-size: 24px;
    color: #b19c9c;
  }
  
  .comment-list__item-comment {
    font-size: 36px;
    color: #b19c9c;
  }
  
  .comment-pub {
    width: 92%;
    position: absolute;
    display: flex;
    background-color: #1c1b1e;
    padding: 0 4%;
    height: 80px;
    bottom: 0;
    justify-content: space-between;
    align-items: center;
  }

  .comment-pub input {
    width: 70%;
    height: 100%;
    font-size: 30px;
    border: none;
    outline: none;
    background-color: #1c1b1e;
    color: #757575;
  }

  .comment-pub .pub-button {
    cursor: pointer;
    display: flex;
    color: #464648;
    align-items: center;
    height: 100%;
    font-size: 30px;
    color: #a9a39c;
  }
</style>
