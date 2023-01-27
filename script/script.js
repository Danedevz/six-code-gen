const range = document.querySelector("#digits");
const index = document.querySelector(".index");
range.addEventListener("input", (e) => {
  index.innerHTML = e.target.value;
});

const methodBtn = document.querySelectorAll(".btn-method");
methodBtn.forEach((e) => {
  e.addEventListener("click", () => {
    methodBtn.forEach((e) => clearClass(e));
    e.classList.toggle("selected");
  });
});

const submitBtn = document.querySelector(".btn-submit");
submitBtn.addEventListener("click", () => {
  for (let i = 0; i < methodBtn.length; i++) {
    if (methodBtn[i].classList.contains("selected")) {
      const dispCode = document.querySelector(".display-code");
      let method = methodBtn[i].innerHTML;
      const wholeCode = fetchCode(method);
      const seed =
        Math.floor(
          Math.random() * (wholeCode.length - (wholeCode.length % 6) - 1 - 1)
        ) + 1;
      const code = truncateZero(
        wholeCode.substring(seed, seed + parseInt(index.innerHTML)),
        wholeCode,
        seed + parseInt(index.innerHTML) + 1
      );
      if (parseInt(code) > 450000) {
        dispCode.style.color = "#FF4A4A";
      } else if (parseInt(code) > 400000) {
        dispCode.style.color = "#FFF46E";
      } else {
        dispCode.style.color = "#52D681";
      }
      dispCode.innerHTML = code;
    }
  }
});

const copyBtn = document.querySelector(".btn-copy");
copyBtn.addEventListener("click", () => {
  const display = document.querySelector(".display-code");
  if (display.innerHTML.length > 0) {
    navigator.clipboard.writeText(display.innerText);
    alert(`the code ${display.innerText} has been copied`);
  }
});

function clearClass(el) {
  el.classList.remove("selected");
}
function fetchCode(method) {
  switch (method) {
    case "Pi":
      return "31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
    case "Euler":
      return "27182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274";
    case "Fibonacci":
      return "112358132134558914423337761098715972584418110946177112865746368750251213931964183178115142298320401346269";
    case "Tau":
      return "62831853071795864769252867665590057683943387987502116419498891846156328125724179972560696506842341359";
    case "Golden Ratio":
      return "16180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374";
    case "Random Method":
      const methodList = ["Pi", "Euler", "Fibonacci", "Tau", "Golden Ratio"]
      const randomizer = Math.floor(
        Math.random() * (6 - 1)
      ) + 1;
      console.log(methodList[(randomizer-1)])
      return fetchCode(methodList[(randomizer-1)]);
    case "Random Number":
      const randomList = []
      for (let i = 0; i<20; i++) {
        const randomizer = Math.floor(
          Math.random() * (99999 - 10000)
        ) + 10000;
        randomList.push(randomizer.toString());
      }
      return randomList.join("");
  }
}

function truncateZero(code, wholeCode, concateIndex) {
  if (code[0] == "0") {
    const newCode = code.slice(1, code.length) + wholeCode[concateIndex];
    return truncateZero(newCode);
  }
  return code;
}
