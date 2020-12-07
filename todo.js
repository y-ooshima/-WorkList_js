//エラーを見つけやすくする
'use strict';

//htmlからの入力　[0]は返すのが配列
const addTaskTrigger = document.getElementsByClassName('js-addTask-trigger')[0];
const addTaskTarget = document.getElementsByClassName('js-addTask-target')[0];
const addTaskValue = document.getElementsByClassName('js-addTask-value')[0];

//タスクの削除を行うため(li)の削除
const removeTask = removeButton => {
  const targetTask = removeButton.closest('li');
  addTaskTarget.removeChild(targetTask);
};
//追加したいときの挙動
const addTask = task => {
//li,buttonの追加
  const listItem = document.createElement('li');
  const removeButton = document.createElement('button');
  removeButton.innerText = '削除';
  //削除ボタンの動作を追加
  removeButton.addEventListener('click', () => removeTask(removeButton));
  //タスクの文字列にする
  listItem.innerText = task;
  //ボタンをリストの中にいれる
  listItem.append(removeButton);
  //liをulの中にいれる
  addTaskTarget.appendChild(listItem);
};
//タスクのイベントを登録
addTaskTrigger.addEventListener('click', event => {
  const task = addTaskValue.value;
  addTask(task);
  //入力後の文字列を消す
  addTaskValue.value = '';
});