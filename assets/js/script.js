var tasks = [];
var timeNow = moment().format("dddd[,] MMM Do");

$("#currentDay").text(timeNow);

$(".save").on("click", function () {
    // you have to redefine the global variable in jquery

    if (localStorage.length === 0) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    var hour = $(this).closest(".row").attr('id');
    var task = $(this).closest(".row").find(".task").val();
    $(this).closest(".row").find(".task").text(task);

    if (tasks.length === 0) {
        tasks.push({ hour: hour, task: task });
    } else {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].hour === hour) {
                tasks[i].task = task;
            } else {
                tasks.push({ hour: hour, task: task });
            }
        }
    }
    saveTasks();
});

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
    if (localStorage.length === 0) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    for (i = 0; i < tasks.length; i++) {
        $("#" + tasks[i].hour).find(".task").text(tasks[i].task);
    }
};

var auditTask = function () {
    var timeNow = moment().format("HH");

    $('.hour').each(function () {
        var currentID = $(this).attr('id');
        var currentTask = $(this).find(".task");

        if (timeNow === currentID) {
            currentTask.addClass("present");
        } else if (currentID < timeNow) {
            currentTask.addClass("past");
        } else {
            currentTask.addClass("future");
        }
    });
}

loadTasks();
auditTask();