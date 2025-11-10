const users = [];
const userId = document.getElementById("userId");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const message = document.getElementById("message");

function isValidPassword(pw) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(pw);
}

function isDuplicateId(id) {
  return users.some(u => u.id === id);
}

function signupUser() {
  const id = userId.value.trim();
  const pw = password.value.trim();

  if (!id || !pw) return showMessage("아이디와 비밀번호를 입력해주세요.", "red");
  if (isDuplicateId(id)) return showMessage("이미 존재하는 아이디입니다.", "red");
  if (!isValidPassword(pw)) return showMessage("비밀번호는 8자 이상, 영어와 숫자를 포함해야 합니다.", "red");

  users.push({ id, pw });
  showMessage("회원가입 성공!", "green");
  userId.value = "";
  password.value = "";
  console.log(users);
}

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}

signupBtn.addEventListener("click", signupUser);
