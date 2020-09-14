// Find current time and set it
var timeNow = moment().format("dddd[,] MMM Do");
$("#currentDay").text(timeNow);

// On save button save data to local storage
$(".save").on("click", function () {
    // variable to hold all tasks
    var tasks;

    // check if local storage is blank, if not pull it.
    if (!localStorage.getItem("tasks")) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // find the hour and task you clicked on
    var hour = $(this).closest(".row").attr('id');
    var task = $(this).closest(".row").find(".task").val();
    $(this).closest(".row").find(".task").text(task);

    // search array obj and if you can find the hour id there return true
    var foundHour = tasks.find(function (obj) {
        if (obj.hour === hour) {
            return true;
        }
    });

    // if the hour is in the array only update the task, if not push the hour and task
    if (foundHour) {
        foundHour.task = task;
    } else {
        tasks.push({ hour: hour, task: task });
    }

    saveTasks(tasks);
});

// save off to local storage
var saveTasks = function (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load the tasks from local storage
var loadTasks = function () {
    if (!localStorage.getItem("tasks")) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    for (i = 0; i < tasks.length; i++) {
        $("#" + tasks[i].hour).find(".task").text(tasks[i].task);
    }
};

// assign coloring to hours based on current time
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

// media query for mobile
if ($(window).width() < 426) {
    $('.hour').each(function () {
        var left = $(this).find(".hour-interval");
        left.removeClass("col-1");
        left.addClass("col-2");

        var middle = $(this).find(".task");
        middle.removeClass("col-10");
        middle.addClass("col-8");

        var right = $(this).find(".btn");
        right.removeClass("col-1");
        right.addClass("col-2");
    });
}

loadTasks();
auditTask();