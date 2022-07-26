'use strict';
{
  //HTMLから各ボタンの属性を読み取る
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
  let startTime ; //スタートボタンを押した時刻
  let timeoutId ;
  let elapsedTime = 0;  //ラップタイム、停止時に経過している時間
  
  //現在時刻からスタート時の時刻を引き経過時間を計算する。elapsedTimeを足し計測再開時に対応する。
  function countUp(){
    timeoutId = setTimeout(function () { //計測タイムはtimeoutIdに代入
    const d = new Date(Date.now() - startTime + elapsedTime);
  
    //分、秒、ミリ秒を表記するために↑からそれぞれ読み取る
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();
  
    //それぞれタイマーに表記する。綺麗に表記するために、分、秒は2桁、ミリ秒は3桁までを空白時に0を表記するよう設定
    timer.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(ms).padStart(3,'0')}`;
    countUp();
  },10);  //setTimeoutで10ミリ秒毎にcountUpファンクションを回すよう設定
  }

  //測定前の状態ではスタートボタンのみActive
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  //測定中は停止ボタンのみActive
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  //停止中はスタートボタン（測定再開）とリセットボタンのみActive
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();


  //スタートボタンを押した時の動き
  start.addEventListener('click',()=>{
    if(start.classList.contains('inactive') === true){
      return;
    }
    setButtonStateRunning(); //ストップボタンのみアクティブにする。他はインアクティブ
    startTime = Date.now();//スタート時刻をstartTimeに代入してから
    countUp();//カウントアップを開始する
  })

  //ストップボタンを押した時の動き
  stop.addEventListener('click',()=>{
    if(stop.classList.contains('inactive') === true){
      return;
    }
    setButtonStateStopped(); //スタート、リセットボタンをアクティブ、ストップボタンをインアクティブ
    clearTimeout(timeoutId);//引数にtimeoutIdを指定してclearTimeoutで時刻をリセット。
    elapsedTime += Date.now() - startTime ; //(スタートを押した時刻) - (ストップを押した時刻)=ラップタイムとして代入
  });

  reset.addEventListener('click',()=>{
    if(reset.classList.contains('inactive') === true){
      return;
    }
    timer.textContent = '00:00:000';//表記を手動で0に
    setButtonStateInitial();
    clearTimeout(timeoutId);//カウントをリセット
    elapsedTime = 0;//ラップタイムも0に
  })


  
}
