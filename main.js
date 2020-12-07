    'use strict';
    
    //htmlのidからデータを取得
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    //クリック時の時間を保持するための変数定義
    var startTime;
    //経過時刻を更新するための変数。 初めはだから0で初期化
    var elapsedTime = 0;
    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;
    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    var timeToadd = 0;    

    function updateTimetText(){
    var h = Math.floor(elapsedTime/ 3600000);
    elapsedTime = elapsedTime-(h*60*60*1000);
    var m = Math.floor(elapsedTime / 60000);
    elapsedTime = elapsedTime-(m*60*1000);
    var s = Math.floor(elapsedTime % 60000 / 1000);
    var ms = elapsedTime % 1000;
    //HTML 上で表示の際の桁数を固定
    h = ('0' + h).slice(-2); 
    m = ('0' + m).slice(-2); 
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3);
    //HTMLのid　timer部分に表示させる　
    timer.textContent = h + ':' + m + ':' + s + ':' + ms;
    }

        //再帰的に使える用の関数
        function countUp(){
        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){
        //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
        elapsedTime = Date.now() - startTime + timeToadd;
        updateTimetText()
        //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
        countUp();
        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
        }

        //タイマースタート
        start.addEventListener('click',function(){
        //在時刻を示すDate.nowを代入
        startTime = Date.now();
        //再帰的に使えるように関数を作る
        countUp();
        });

         //タイマーストップイベント
        stop.addEventListener('click',function(){
        //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);

        //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
        //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
       timeToadd += Date.now() - startTime;
        });

        //タイマーリセットイベント
        reset.addEventListener('click',function(){
        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;
        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;
        //updateTimetTextで0になったタイムを表示
        updateTimetText();
        });
