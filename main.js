var listOfobj = [];
var num = 0;
let btnsubmit = document.getElementById("startBtn");

btnsubmit.addEventListener("click", (e) => {
  function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  e.preventDefault();
  let hr = document.getElementById("hr").value;
  let min = document.getElementById("min").value;
  let sec = document.getElementById("sec").value;
  if (!(isNumber(hr) && isNumber(min) && isNumber(sec))) {
    alert("Error: Timer Must me numbers");
    return;
  }


  if ((hr == "0" && min == "0" && sec == "0")) {
    alert("Error: Time not added");
  } else {
    num++;
    let obj = { "num": num, "hr": parseInt(hr), "min": parseInt(min), "sec": parseInt(sec) };
    listOfobj.push(obj);

    let listob = document.getElementById("timeList");
    let totalval = `<div class='form' id='form-${num}'><h3>Time Left: </h3>
                    <input id='hour-${num}' type='text' value='${hr} : ${min} : ${sec}' readonly style='text-decoration: none; border: 0; border-radius: 5px; background-color: transparent; font-size: 20px;'>
                    <button onclick = deleteForm(${num})>Delete</button></div>`;
    listob.innerHTML += totalval;

    let totalSeconds = parseInt(hr) * 3600 + parseInt(min) * 60 + parseInt(sec);
    document.getElementById("hr").value = '00';
    document.getElementById("min").value = '00';
    document.getElementById("sec").value = '00';
    runTimerList(num, totalSeconds);
  }
});

function runTimerList(num, totalSeconds) {
  console.log("Timer started for form #" + num);

  const intervalId = setInterval(() => {
    totalSeconds--;

    if (totalSeconds >= 0) {
      if (totalSeconds < 3) {
        let audio = document.getElementById('myAudio');
        audio.play();
      }
      let hour = Math.floor(totalSeconds / 3600);
      let minute = Math.floor((totalSeconds % 3600) / 60);
      let second = Math.floor(totalSeconds % 60);

      document.getElementById(`hour-${num}`).value = `${hour} : ${minute} : ${second}`;
    } else {
      clearInterval(intervalId);
      let formElement = document.getElementById(`form-${num}`);
      formElement.innerHTML = `<h3 style="color:black;">Time is Up ! </h3>
                    <input type="hidden" id='hour-${num}' type='text' value='${hr} : ${min} : ${sec}' readonly style='text-decoration: none; border: 0; border-radius: 5px; background-color: transparent; font-size: 20px;'>
                    <button onclick = deleteForm(${num}) style="background-color: #34344A; margin-left:100px; color:white;">Stop</button>`;
      formElement.style.backgroundColor = '#F0F757';
      formElement.style.fontWeight = 'bold';
    }
  }, 1000);
  func();
}

function deleteForm(num) {
  let element = document.getElementById(`form-${num}`);
  element.remove();
  func();
}

function func() {
  let parentElement = document.getElementById("timeList");
  let childrens = parentElement.children;
  console.log(childrens.length);
  if (childrens.length <= 0) {
    parentElement.innerHTML = `<p style='text-align:center;color:white;' id="msg">You have no Timers Corrently</p>`;
  } else {
    let doc = document.getElementById('msg');
    if (doc)
      doc.remove();
  }
}
func();


