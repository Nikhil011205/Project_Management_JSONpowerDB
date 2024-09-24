var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbiml = "/api/iml";
var jpdbirl = "/api/irl";
var projDbname = "COLLEGE-DB";
var projRelname = "PROJECT-TABLE";
var connToken = "90931988|-31949224817382307|90962555";

$("#projId").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}
function getProjIdAsJsonObj(){
    var projId = $("#projId").val();
    var jsonStr = {
        projId:projId
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#projName").val(record.projName);
    $("#projTo").val(record.projTo);
    $("#projDate").val(record.projDate);
    $("#projDeadline").val(record.projDeadline);
}

function validateData() {
    var projIdVar = $("#projId").val();
    if (projIdVar === "") {
        alert("Project ID Required Value");
        $("#projId").focus();
        return "";
    }
    var projNameVar = $("#projName").val();
    if (projNameVar === "") {
        alert("Project Name is Required Value");
        $("#projName").focus();
        return "";
    }
    var projToVar = $("#projTo").val();
    if (projToVar === "") {
        alert("Project assignation to someone is a Required Value");
        $("#projTo").focus();
        return "";
    }
    var projDateVar = $("#projDate").val();
    if (projDateVar === "") {
        alert("Project date is Required Value");
        $("#projDate").focus();
        return "";
    }
    var projDeadlineVar = $("#projDeadline").val();
    if (projDeadlineVar === "") {
        alert("Project deadline is Required Value");
        $("#projDeadline").focus();
        return "";
    }

    var jsonStrObj = {
    projId: projIdVar,
    projName: projNameVar,
    projTo: projToVar,
    projDate: projDateVar,
    projDeadline: projDeadlineVar,
    };

    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#projId").val("")
    $("#projName").val("");
    $("#projTo").val("");
    $("#projDate").val("");
    $("#projDeadline").val("");
    $("#projId").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#projId").focus();
}
  
function getProj(){
    var projIdJsonObj = getProjIdAsJsonObj();
    // alert(empIdJsonObj)
    var getRequest = createGET_BY_KEYRequest(connToken,projDbname,projRelname,projIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbirl);
    jQuery.ajaxSetup({async:true});
    if (resJsonObj.status === 400){
        $('#save').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $("#projName").focus();
    }
    else if (resJsonObj.status === 200){
        $('#projId').prop("disabled",true);
        fillData(resJsonObj);
        $('#save').prop("disabled",true);
        $('#change').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $('#empName').focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if (!jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,projDbname,projRelname);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbiml);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#projId').focus()
}

function changeData(){
    $('#change').prop('disabled',true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,projDbname,projRelname,localStorage.getItem('recno'));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbiml);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#empId").focus()
}
    