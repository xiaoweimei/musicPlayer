function $(selector){
	return document.querySelector(selector)
}
function $$(selector){
	return document.querySelectorAll(selector)
}
var musicList = [
  {
    src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
    title: '玫瑰',
    author: '贰佰',
    img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1681092323,875387886&fm=26&gp=0.jpg"
  },
  {
    src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
    title: 'IF YOU',
    author: 'Big Bang',
    img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2834261754,3295619847&fm=26&gp=0.jpg"
  }
  
]
var playBtn=$$('.fa')[1]
var backwardBtn=$('.fa-backward')
var forwardBtn=$('.fa-forward')
var titleNode=$('.title')
var progressBarNode=$('.bar')
var progressBar_now=$('.bar-now')
var authorNode=$('.author')
var timer
var time=$('.time')
var music = new Audio()
music.autoplay=true
var musicIndex = 0
function loadMusic(songObj){
	music.src=songObj.src
	titleNode.innerText = songObj.title
	authorNode.innerText=songObj.author
  document.body.style.backgroundImage='url('+songObj.img+')'
}
loadMusic(musicList[musicIndex])
playBtn.onclick = function(){
	if (playBtn.classList.contains('fa-play')){
		music.play()
	}else{
		music.pause()
	}
	playBtn.classList.toggle('fa-play')
	playBtn.classList.toggle('fa-pause')
}

progressBarNode.onclick = function(e){
  var percent = e.offsetX/parseInt(getComputedStyle(this).width)
  music.currentTime = percent * music.duration
  progressBar_now.style.width = percent*100+"%"
}
function updateProgress(){
  var percent = (music.currentTime/music.duration)*100+'%'
  progressBar_now.style.width = percent
  
  var minutes = parseInt(music.currentTime/60)
  var seconds = parseInt(music.currentTime%60)+''
  seconds = seconds.length == 2? seconds : '0'+seconds
  time.innerText = minutes + ':' + seconds
}

music.onplaying = function(){
  timer = setInterval(function(){
    updateProgress()
  }, 1000)
}
music.onpause = function(){
  clearInterval(timer)
}
function loadNextMusic(){
  musicIndex++
  musicIndex = musicIndex%musicList.length
  loadMusic(musicList[musicIndex])  
}
forwardBtn.onclick=function(){
  musicIndex++
  musicIndex = musicIndex%musicList.length
  loadMusic(musicList[musicIndex]) 
}
backwardBtn.onclick=function(){
  musicIndex = (musicList.length+(--musicIndex))%musicList.length
  loadMusic(musicList[musicIndex]) 
}
music.onended = loadNextMusic