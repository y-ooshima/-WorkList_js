<!DOCTYPE html>
<html lang= "ja">
<head>
    <meta name= "viewport" content= "width=device-width, initial-scale= 1.0">
    <meta http-equiv= "content-type" charset= "utf-8">
    <link rel="stylesheet" href="style.css">
    <title>ToDoApp</title>
</head>
<body>
    <h1>作業リスト</h1>

    <header class="header">
        <h2 class="title">Todo List</h2>
      </header>
      <ul class="todo js-addTask-target"></ul>
      <form>
        <input class="js-addTask-value" type="text" />
        <button class="js-addTask-trigger" type="button">やることを登録する</button>
      </form>
      <script src="todo.js"></script>

    <p id="sw">ストップウォッチ</p>
    <div id="timer">00:00:00:000</div>
    <button id="start">start</button>
    <button id="stop">stop</button>
    <button id="reset">reset</button>
    <script src="main.js"></script>

    <section class= "main">
    <!-- <form action="~.php" method="post" > -->
    <form method="post" >
    <!-- <p>作業内容: <input type="text" name="work" value=""></p> -->
    <p>作業内容:</p>
    <textarea name="work" id="text" cols="30" rows="10"></textarea>
    <p>作業時間: <input type="text" name="workTime" value=""></p>
    <input type="submit" >
    <input type="reset" >
    </form> 
    <?php

    $data = [];
    
    //htmlから入力
    $work = htmlspecialchars(@$_POST['work'], ENT_QUOTES, 'UTF-8');
    $workTime = htmlspecialchars(@$_POST['workTime'], ENT_QUOTES, 'UTF-8');
    $now = date('Y/m/d H:i:s');
    //$data1 = [$work,$workTime,$now];
    
    array_push($data,$work,$workTime,$now);
    print_r($data);
    
    ?>
    <table border = "1">
        <tr>
            <th>作業内容</th><th>作業時間</th><th>更新日</th>
        </tr>
        <tr>
            <?php
                foreach($data as $v){
                        echo"<td>".$v."</td>";
                        // echo'<td>'.$v[1].'</td>';
                        // echo'<td>'.$v[2].'</td>';
                    }
            ?>
        </tr>
    </table>

    </section>