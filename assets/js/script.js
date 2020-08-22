var timeNow = moment().format("dddd[,] MMM Do");
// thursday, september 5th

$("#currentDay").text(timeNow);

// get value of textarea on click
$(".task").on("click", function () {
    var text = $(this).text().trim();
    console.log(text);
});

$(".save").on("click", function () {
    var text = $(this).closest(".task");
    console.log(text);
});
