const users = [];
const userId = document.getElementById("userId");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const checkIdBtn = document.getElementById("checkIdBtn");
const togglePwBtn = document.getElementById("togglePwBtn");
const idMessage = document.getElementById("idMessage");
const message = document.getElementById("message");
const strengthBar = document.getElementById("strengthBar");
const container = document.querySelector(".container");

let idChecked = false;

function isDuplicateId(id) {
  return users.some((u) => u.id === id);
}

function checkPasswordStrength(pw) {
  let strength = 0;
  if (pw.length >= 8) strength++;
  if (/[A-Za-z]/.test(pw) && /\d/.test(pw)) strength++;
  if (/[^A-Za-z0-9]/.test(pw)) strength++;
  return strength;
}

password.addEventListener("input", () => {
  const pw = password.value;
  const level = checkPasswordStrength(pw);
  strengthBar.style.width = `${level * 33.3}%`;

  if (level === 1) strengthBar.style.backgroundColor = "var(--weak-color)";
  else if (level === 2) strengthBar.style.backgroundColor = "var(--medium-color)";
  else if (level === 3) strengthBar.style.backgroundColor = "var(--strong-color)";
  else strengthBar.style.width = "0%";
});

togglePwBtn.addEventListener("click", () => {
  const isHidden = password.type === "password";
  password.type = isHidden ? "text" : "password";
  togglePwBtn.textContent = isHidden ? "🔒" : "👁";
});

checkIdBtn.addEventListener("click", () => {
  const id = userId.value.trim();
  if (!id) return showMessage(idMessage, "아이디를 입력해주세요.", "error");

  if (isDuplicateId(id)) {
    showMessage(idMessage, "이미 존재하는 아이디입니다 ❌", "error");
    idChecked = false;
  } else {
    showMessage(idMessage, "사용 가능한 아이디입니다 ✅", "success");
    idChecked = true;
  }
});

signupBtn.addEventListener("click", () => {
  const id = userId.value.trim();
  const pw = password.value.trim();

  if (!id || !pw)
    return showMessage(message, "아이디와 비밀번호를 입력해주세요.", "error");

  if (!idChecked)
    return showMessage(message, "아이디 중복 체크를 해주세요.", "error");

  const strength = checkPasswordStrength(pw);
  if (strength < 2)
    return showMessage(message, "비밀번호가 너무 약합니다. 영어와 숫자를 포함하세요.", "error");

  users.push({ id, pw });
  showMessage(message, "회원가입 성공!", "success");
  container.classList.add("success");

  idChecked = false;
  userId.value = "";
  password.value = "";
  strengthBar.style.width = "0%";
  togglePwBtn.textContent = "👁";
  idMessage.textContent = "";

  setTimeout(() => container.classList.remove("success"), 2000);
  console.log(users);
});

function showMessage(target, text, type) {
  target.textContent = text;
  target.className = type;
  if (type === "success") {
    target.style.animation = "fadeOut 2s forwards";
  } else {
    target.style.animation = "none";
  }
}
