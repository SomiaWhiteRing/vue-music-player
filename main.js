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
      //音乐信息
      audio:{
        duration:0,
        currentTime:0
      },
      //评论区展开状态
      isVisible:false,
      //评论区资源内容
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
      }
    },
  })