// 平均寿命（年）
const LIFE_SPAN = {
  male: 81.09,
  female: 87.14,
};

let intervalId; // setIntervalのIDを保存する変数

// 計算ボタンのクリックイベントを設定
document.getElementById("btn").addEventListener("click", () => {
  // 性別の取得
  const gender = document.getElementById("gender").value;

  // 入力された年、月、日を取得
  const year = parseInt(document.getElementById("year").value, 10);
  const month = parseInt(document.getElementById("month").value, 10) - 1; // 月は0から始まる
  const day = parseInt(document.getElementById("day").value, 10);

  // 入力の検証
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    alert("正しい日付を入力してください！");
    return;
  }

  // 生年月日をDateオブジェクトに変換
  const birthDate = new Date(year, month, day);

  // 入力日が正しいかチェック
  if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month || birthDate.getDate() !== day) {
    alert("無効な日付です。正しい日付を入力してください！");
    return;
  }

  // 現在の日時
  const now = new Date();

  // 平均寿命の日付を計算
  const lifeSpan = LIFE_SPAN[gender];
  const deathDate = new Date(birthDate);
  deathDate.setFullYear(deathDate.getFullYear() + Math.floor(lifeSpan));

  // 既存のsetIntervalをクリア
  if (intervalId) {
    clearInterval(intervalId);
  }

  // 1秒ごとに時間を更新する
  intervalId = setInterval(() => {
    // 現在の日時を再取得
    const now = new Date();

    // 生まれてから現在までの経過時間を計算
    const elapsedTime = Math.floor((now - birthDate) / 1000); // 経過時間（秒）
    const ageYears = Math.floor(elapsedTime / (60 * 60 * 24 * 365)); // 年
    const ageMonths = Math.floor((elapsedTime % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)); // 月
    const ageDays = Math.floor((elapsedTime % (60 * 60 * 24 * 30)) / (60 * 60 * 24)); // 日
    const ageHours = Math.floor((elapsedTime % (60 * 60 * 24)) / (60 * 60)); // 時間
    const ageMinutes = Math.floor((elapsedTime % (60 * 60)) / 60); // 分
    const ageSeconds = elapsedTime % 60; // 秒

    // 残り時間を計算
    if (now > deathDate) {
      document.getElementById("result").innerText = "すでに平均寿命を超えています。";
      clearInterval(intervalId); // 終了後は定期実行を停止
      return;
    }

    const remainingTime = Math.floor((deathDate - now) / 1000); // 残り時間（秒）
    const remainingYears = Math.floor(remainingTime / (60 * 60 * 24 * 365)); // 年
    const remainingMonths = Math.floor((remainingTime % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)); // 月
    const remainingDays = Math.floor((remainingTime % (60 * 60 * 24 * 30)) / (60 * 60 * 24)); // 日
    const remainingHours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60)); // 時間
    const remainingMinutes = Math.floor((remainingTime % (60 * 60)) / 60); // 分
    const remainingSeconds = remainingTime % 60; // 秒

    // 結果を表示
    document.getElementById("result").innerText = 
      `生まれてからの経過時間: ${ageYears}年 ${ageMonths}ヵ月 ${ageDays}日 ${ageHours}時間 ${ageMinutes}分 ${ageSeconds}秒\n` +
      `死ぬまでの残り時間: ${remainingYears}年 ${remainingMonths}ヵ月 ${remainingDays}日 ${remainingHours}時間 ${remainingMinutes}分 ${remainingSeconds}秒\n` +
      `推定死亡年: ${deathDate.getFullYear()}年`;
  }, 1000);
});
