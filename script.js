// 平均寿命（年）
const LIFE_SPAN = {
    male: 81.09,
    female: 87.14,
  };
  
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
  
    // 生まれてから現在までの経過時間を計算
    let ageYears = now.getFullYear() - birthDate.getFullYear();
    let ageMonths = now.getMonth() - birthDate.getMonth();
    let ageDays = now.getDate() - birthDate.getDate();
  
    // 経過時間の調整
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
    if (ageDays < 0) {
      ageMonths--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // 前月の最終日
      ageDays += lastMonth.getDate();
    }
  
    // 残り時間を計算
    if (now > deathDate) {
      document.getElementById("result").innerText = "すでに平均寿命を超えています。";
      return;
    }
  
    // 残り時間を計算
    let years = deathDate.getFullYear() - now.getFullYear();
    let months = deathDate.getMonth() - now.getMonth();
    let days = deathDate.getDate() - now.getDate();
  
    // 残り時間の調整
    if (months < 0) {
      years--;
      months += 12;
    }
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 前月の最終日
      days += lastMonth.getDate();
    }
  
    // 推定死亡年の取得
    const deathYear = deathDate.getFullYear();
  
    // 結果を表示
    document.getElementById("result").innerText = 
      `生まれてからの経過時間: ${ageYears}年 ${ageMonths}か月 ${ageDays}日\n` +
      `死ぬまでの残り時間: ${years}年 ${months}か月 ${days}日\n` +
      `推定死亡年: ${deathYear}年`;
  });
  