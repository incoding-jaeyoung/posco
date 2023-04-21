$(document).ready(function () {
	if ($("body").find(".pos__side").length && $("body").find(".pos__contents").length) {
		$("#contentsArea").split({
			limit: 2,
			orientation: "vertical",
		});
		if ($("#contentsArea").find("#multiple").length) {
			//alert("sfd");
			$("#multiple").split({
				limit: 3,
				orientation: "vertical",
			});
		} else if ($("#contentsArea").find("#table-layout").length) {
			$("#table-layout").split({
				limit: 2,
				orientation: "vertical",
			});
			$("#foo").split({
				orientation: "horizontal",
				limit: 10,
				percent: true,
			});
		}
	}
	/*
	$(".pos__side")
		.next(".vsplitter")
		.on("mouseleave", function () {
			localStorage.removeItem("sideWidth");
		});
	$(".pos__side")
		.next(".vsplitter")
		.on("mouseenter", function () {
			setTimeout(function () {
				var sideW = $(".pos__side").width();
				localStorage.setItem("sideWidth", sideW);
			}, 1000);
		});
		*/
});

$(document).ready(function () {
	if ($("body").find(".pos__side").length && $("body").find(".pos__contents").length) {
		//저장
		$("#saveBtn").click(function () {
			if (!window.localStorage) {
				//모든 브라우저가 HTML5 로컬스토리지 지원해서 이 구문은 안 써도 됨.
				alert("현재 브라우저는 로컬스토리지를 지원하지 않습니다");
				return false;
			}
			//로컬스토리지 저장하는 3가지 방법. 다 같은 방법.
			var sfdsf = $(".pos__side").width();
			localStorage.setItem("key1", sfdsf); //함수 이용. key-value
			localStorage.key2 = "HI";
			localStorage["key3"] = "HELLO";
		});
		/*
	$(".pos__resizer-bar").on("mouseenter", function () {
		var sfdsf = $(".pos__side").width();
		localStorage.removeItem("key1");
		localStorage.setItem("key1", sfdsf); //함수 이용. key-value
	});*/

		//삭제
		$("#deleteBtn").click(function () {
			localStorage.removeItem("key1"); //키만 입력하면 됨
		});

		//전체삭제
		$("#deleteAllBtn").click(function () {
			localStorage.clear(); //localStorage에 있는 모든 내용을 삭제... 주의해서 사용!
		});

		//내용보기
		$("#showBtn").click(function () {
			alert(localStorage.getItem("key1") + "," + localStorage.getItem("sideWidth") + "," + localStorage.key2 + "," + localStorage["key3"]);
		});
	}
});
