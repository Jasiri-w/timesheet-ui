$(function(){
	console.log("Local script and jquery are loading.");
	addNotifications();
	configureInbox();
	
	//$("#sideBarcollapse").off("mouseleave");
	$('[data-toggle="tooltip"]').tooltip();
	$('.dropdown-toggle').dropdown();
	$("#termslink").on("click", function(){$("#termsmodal").modal("show");});
	
	$("#panelcollapsearrow1").click(function(){
		$("#panelcollapsearrow1").toggleClass("rotated");
	});
	$("#panelcollapsearrow2").click(function(){
		$("#panelcollapsearrow2").toggleClass("rotated");
	});
	$("#sideBarcollapse").click(function(){
		$("#sideBar").toggleClass("collapsedrow").toggleClass("col-sm-2 col-sm-1");
		$("#colone").toggleClass("col-sm-6 col-sm-5");
		$("#linkicon,#sideBar > a > div").toggleClass("noned");
		$("#sideBar").toggleClass("hider");
	});	
});

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(showChart);

function drawBasic() {

	var visualization = new google.visualization.LineChart(document.getElementById('chart_container'));
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Total Hours');
    data.addColumn('number', 'Salary Increase');

    data.addRows([
		[0, 0],   [8, 10],  [16, 23],  [32, 17],  [40, 3],  [48, 9],
        [56, 11],  [64, 27],  [72, 33],  [80, 40],  [88, 23]
    ]);

    var options = {
        hAxis: {
			title: 'Total Hours Worked This Week'
        },
        vAxis: {
			title: 'Salary Increase'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

	chart.draw(data, options);
}
function showChart() {
	drawBasic();
	$("#chart_div").hide();
	console.log("Showing");
	console.log($("#chart_div").css("visibility"));
	$("#chart_div").css("visibility","visible");
	$("#chart_div").slideDown(1500);
}

var timesheetData = {
	approved_timesheets: ["December 1-31","January 1-31"],
	awaiting_approval: ["April 1-30","February 1-31"],
	pending_submitions: ["March 1-31","May 1-31"]
};

var notifications = {
	reminders: timesheetData.pending_submitions,
	awaiting_approval: timesheetData.awaiting_approval
};

var currency = "$";

function Timesheet(name,amount,status){
	this.name = name;
	this.amount = amount;
	this.status = status;
}

//This should only contain the newest data set
var newInboxData = {
	//When connected to database this should use "timesheetData" to request individual timesheet data	
	"October 1-31": {
		"name": "Jane Doe",
		"amount": "38",
		"status": "Awaiting Approval"
	},
	"November 1-30": {
		"name": "Jane Doe",
		"amount": "29",
		"status": "Unapproved"
	},
	"December 1-31": {
		"name": "Jules Verne",
		"amount": "42",
		"status": "Approved"
	}
};



function addNotifications(){
	var nots = notifications;
	
	var reminders = notifications.reminders;
	var reminderAmnt = reminders.length;
	
	var awaiting_approval = notifications.awaiting_approval;
	var awaiting_approvalAmnt = awaiting_approval.length;
	
	addCardData();
	
	$("#reminderHeading").append('<span class="badge">' + reminderAmnt + '</span>');
	$("#awappHeading").append('<span class="badge">' + awaiting_approvalAmnt + '</span>');
	
	var remindertext = "";
	var awapptext = "";
	
	for(i = 0;i < reminders.length;i++){
		remindertext += '<div class="panel-body">' + reminders[i] + '</div>';
		//console.log(remindertext);
	}
	
	for(i = 0;i < awaiting_approval.length;i++){
		awapptext += '<div class="panel-body">' + awaiting_approval[i] + '</div>';
		//console.log(remindertext);
	}
	
	$("#collapse1").append(remindertext);
	$("#collapse2").append(awapptext);
	//console.log($(".panel-group").html());
}
function addCardData(){
	var approved_timesheetsAmnt = '<span class="badge">' + timesheetData.approved_timesheets.length + '</span>';
	var awaiting_approvalAmnt = '<span class="badge">' + timesheetData.awaiting_approval.length + '</span>';
	var pending_submitionsAmnt = '<span class="badge">' + timesheetData.pending_submitions.length + '</span>';
	
	$("#appcard").append(approved_timesheetsAmnt);
	$("#awappcard").append(awaiting_approvalAmnt);
	$("#pendsubcard").append(pending_submitionsAmnt);
}
function configureInbox(){
	console.log("Configuring inbox and adding alerts.");
	addAlerts();
	
	$("#inbox-container").hide();
	$("#inbox-container").css("visibility","visible");
	$("#inbox-container").slideDown(1500).delay(1500);
}
function addAlerts(){
	console.log("Adding alert boxes.");
	var pendsubs = 0;
	console.log("There should be " + notifications.reminders.length)
	/*for(i in $("#inbox > tbody > tr").children().text()){
		if(i=="Unapproved"){
			pendsubs++;
			console.log();
		}
	}*/
	//var newalert='<div class="alert alert-danger alert-dismissable fade in" data-spy="affix" data-offset-top="100"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning</strong>you have <a href="#notifications" class="alert-link">' + pendsubs + '</a> pending resubmitions.</div>';
	/*if(pendsubs<1){
		return "";
	}else{
		$(".container-fluid.text-center").append(newalert);
		console.log($(""));
	}*/
	var newalert='<div class="alert alert-danger alert-dismissable fade in" id="alertbox" data-offset-top="100" style="z-index:9999;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning</strong> you have <a href="#notifications" class="alert-link">' + notifications.reminders.length + ' pending resubmitions.</a></div>';
	if(notifications.reminders.length > 0){
		$(".container-fluid.text-center").append(newalert);
		console.log("Succesfully Made Alerts." + newalert);
	}
	
	function setTimeoute(){
		mytimer = setTimeout(fadeOute,15000);
	}
	
	setTimeoute();
	
	function fadeOute(){
		$("#alertbox").fadeOut(1500);
	}
	
	$("#alertbox").on("mouseover", function() {
		clearTimeout(mytimer);
		setTimeoute();
	});
	$("#alertbox").on("click"), function() {
		$("#alertbox").fadeOut(2000);
	}
	
	
	$("#alertbox").hide();
	$("#alertbox").css("visibility","visible").delay(1000);
	$("#alertbox").fadeIn(1500);
}