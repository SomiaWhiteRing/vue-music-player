const vm = new Vue({
    el: '#app',
    data: {
      //音乐标题
      title: '音乐标题',
      //歌手名称
      author: '歌手名称',
      //音乐来源
      src:"https://static.xhxly.cn/Reality.mp3",
      //播放状态检测
      isPlaying:false,
    },
    methods: {
      playMusic(){
        this.$refs.player.play();
        this.isPlaying = true;
      },
      pauseMusic(){
        this.$refs.player.pause();
        this.isPlaying = false;
      },
    },
  })