console.log("hello");

let hr = 0;
let min = 0;
let sec = 0;
let start = false;
let res = true;
let previousLapTime = { min: 0, sec: 0 };

document.querySelector(".start").addEventListener("click", () => {
  start = !start;
  if (start) res = false;
  else res = true;
  updateTime();
});

function updateTime() {
  if (res) {
    resetBtn.style.opacity = "1";
  } else {
    resetBtn.style.opacity = "0.5";
  }
  if (start) {
    sec++;
    if (sec === 60) {
      min++;
      sec = 0;
    }
    if (min === 60) {
      hr++;
      min = 0;
    }
    let hrString = hr < 10 ? "0" + hr : hr;
    let minString = min < 10 ? "0" + min : min;
    let secString = sec < 10 ? "0" + sec : sec;

    document.querySelector(".time").innerHTML = `
     <span>${hrString}</span>: <span>${minString}</span>: <span>${secString}</span>
    `;

    setTimeout(updateTime, 1000);
  }
}

let resetBtn = document.querySelector(".reset");

function reset() {
  if (res) {
    start = false;
    hr = 0;
    min = 0;
    sec = 0;
    previousLapTime = { min: 0, sec: 0 };
    document.querySelector(".time").innerHTML = `
       <span>00</span>: <span>00</span>: <span>00</span>
      `;
    item.innerHTML = ""; // Clear all lap records
  }
}

resetBtn.addEventListener("click", reset);
document.querySelector(".lap-time").addEventListener("click", handlelap);
let item = document.querySelector(".items");

function handlelap() {
  if (start) {
    const currentLapTime = { min, sec };
    const lapDifference = calculateLapDifference(
      previousLapTime,
      currentLapTime
    );
    previousLapTime = { ...currentLapTime };

    let div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <span>${item.childElementCount + 1}</span><span>${formatTime(
      currentLapTime
    )}</span><span>+ ${formatTime(lapDifference)}</span>
    `;
    item.prepend(div);
  }
}

function calculateLapDifference(prev, current) {
  let minDiff = current.min - prev.min;
  let secDiff = current.sec - prev.sec;

  if (secDiff < 0) {
    secDiff += 60;
    minDiff--;
  }

  return { min: minDiff, sec: secDiff };
}

function formatTime(time) {
  let minString = time.min < 10 ? "0" + time.min : time.min;
  let secString = time.sec < 10 ? "0" + time.sec : time.sec;
  return `<span>${minString}</span>:<span>${secString}</span>`;
}
