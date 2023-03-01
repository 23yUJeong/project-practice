// 1. 유저가 값을 입력한다
// 2. + 버튼을 클릭하면, to do가 추가됨
// 3. delete 버튼을 누르면, to do가 삭제됨
// 4. check 버튼을 누르면, to do가 끝나면서 밑줄이 쳐짐
//    check 버튼을 클릭하는 순간, false => true
//    true이면 끝난 걸로 간주하고 밑줄
//    false이면 안 끝난 걸로 간주하고 그대로
// 5. 진행중 / 끝남 tab을 누르면, under bar가 이동함
// 6. 끝남 tab : 끝남 아이템만 / 진행중 tab : 진행 중인 아이템만 / 전체 tab을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); // querySelectorAll : 조건에 만족하는 모든 것을 할당
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);

  render();
}

function render() {
  let list = [];

  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break; // for문을 종료
    }
  }
  render();
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break; // for문을 종료
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9); // id값
}

function filter(event) {
  mode = event.target.id;

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
