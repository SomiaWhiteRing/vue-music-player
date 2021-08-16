const vm = new Vue({
    el: '#app',
    data: {
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
    },
    methods: {
      playMusic(){
        this.$refs.player.play();
        this.isPlaying = true;
        this.startRotate();
      },
      pauseMusic(){
        this.$refs.player.pause();
        this.isPlaying = false;
        this.stopRotate();
      },
      startRotate(){
        var rotateTimes = 5;
        var rotateSteps = 0.08;
        var that = this;
        var clockNum = setInterval(function(){
          that.rotateDeg += rotateSteps;
        },rotateTimes);
        this.clockNum = clockNum;
      },
      stopRotate(){
        clearInterval(this.clockNum);
      },
    },
  })