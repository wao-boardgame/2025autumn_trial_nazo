// ====== 正解データ ======
const answers = {
    quiz1: ["とうげんきょう", "桃源郷", "トウゲンキョウ"],
    quiz2: ["だいかんげい", "大歓迎", "ダイカンゲイ", "だいかんげき", "大感激", "ダイカンゲキ"]
};

// ====== 文字を正規化（空白除去・カタカナ→ひらがな） ======
function normalize(text) {
    return text
        .replace(/[\s　]/g, "")
        .replace(/[ァ-ン]/g, s => String.fromCharCode(s.charCodeAt(0) - 0x60));
}

// ====== DOM取得 ======
const quiz1 = {
    input: document.getElementById("quiz1-input"),
    btn: document.getElementById("quiz1-btn"),
    msg: document.getElementById("quiz1-msg"),
    area: document.getElementById("quiz1")
};

const quiz2 = {
    input: document.getElementById("quiz2-input"),
    btn: document.getElementById("quiz2-btn"),
    msg: document.getElementById("quiz2-msg"),
    area: document.getElementById("quiz2")
};

const shareArea = document.getElementById("share-area");
const shareBtn = document.getElementById("share-btn");
const fallback = document.getElementById("fallback-share");

// ====== 判定関数 ======
function checkAnswer(userInput, correctList) {
    const user = normalize(userInput);
    const normalizedAnswers = correctList.map(a => normalize(a));
    return normalizedAnswers.includes(user);
}

// ====== 1問目の判定 ======
quiz1.btn.onclick = () => {
    const user = quiz1.input.value;
    if (checkAnswer(user, answers.quiz1)) {
        quiz1.msg.textContent = "✅ 正解！次の問題へ！";
        quiz2.area.classList.remove("hidden");
        quiz1.btn.disabled = true;
        quiz1.input.disabled = true;
    } else {
        quiz1.msg.textContent = "❌ ちがうよ！もう一度！";
    }
};

// Enterキーで1問目の回答
quiz1.input.addEventListener("keydown", e => {
    if (e.key === "Enter") quiz1.btn.click();
});

// ====== 2問目の判定 ======
quiz2.btn.onclick = () => {
    const user = quiz2.input.value;
    if (checkAnswer(user, answers.quiz2)) {
        quiz2.msg.textContent = "🎉 正解！全問クリア！";
        shareArea.classList.remove("hidden");
        quiz2.btn.disabled = true;
        quiz2.input.disabled = true;
    } else {
        quiz2.msg.textContent = "❌ ちがうよ！もう一度！";
    }
};

// Enterキーで2問目の回答
quiz2.input.addEventListener("keydown", e => {
    if (e.key === "Enter") quiz2.btn.click();
});

// ===== シェア =====
const shareText = `#WAOのチラシ謎 を解き明かした！

#ゲームマーケット2025秋
11/22(土)・23(日) 両日出展
ボードゲーム・謎解き制作団体 WAO

【J23】にてお待ちしております！

チラシ謎はこちら↓`;

// ▼ X共有
document.getElementById("x_share").onclick = (e) => {
    e.preventDefault();

    // テキスト＋URL を X intent に渡す
    const url =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(shareText + "\n" + shareURL);

    window.open(url, "_blank");
};

// ▼ LINE共有
document.getElementById("line_share").onclick = (e) => {
    e.preventDefault();

    // テキスト＋URL を LINE intent に渡す
    const url =
        "https://line.me/R/share?text=" +
        encodeURIComponent(shareText + "\n" + shareURL);

    window.open(url, "_blank");
};


