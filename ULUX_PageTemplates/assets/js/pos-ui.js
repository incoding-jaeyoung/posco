$(document).ready(function () {
	accordionJS();

	setTimeout(function () {
		bar();
		popupJS();
	}, 1000);
	barOpen();
	barClose();
	barFix();
	barFixNO();

	btnTOP();
	closeAll();
	openAll();
	sideClose();
	sizeJS();
	tab();
	tabMove();
	menu();
	menuEdit();
	Allcheckbox();
	checkOnlyOne();
	complexToggle();
	setTimeout(function () {
		gridTit();
	}, 200);
	inputAmend();
	tdToggle();
	textareaCnt();
	windowClose();
	magnifyingJS();
	arrorJS();
	loadingJS();

	//웹히스토리
	var barClass = localStorage.getItem("bar");
	var navClass = localStorage.getItem("nav");

	if (barClass == "barOn") {
		$(".btn__bar-fix").hide();
		$(".btn__bar-fixNO").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
		$(".pos__bar").addClass("action");
		if (navClass == "navOFF") {
			//좌측메뉴 닫힘상태
			$("#wrapper").removeClass("action").removeClass("fix2").addClass("fix").addClass("W100");
			$("#closeAllPanes").removeClass("on");
			$("#openAllPanes").addClass("on");
			$(".pos__header-logo").css("width", 224);
			$(".pos__header-navigation").css("padding-left", 224);
			$(".pos__side").hide();
			$("#contentsArea > .vsplitter").hide();
		} else {
			$("#wrapper").removeClass("action").removeClass("fix").addClass("fix2").removeClass("W100");
			$("#closeAllPanes").addClass("on");
			$("#openAllPanes").removeClass("on");
		}
	} else {
		$(".btn__bar-fixNO").hide();
		$(".btn__bar-fix").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정");
		$(".pos__bar").removeClass("action");
		if (navClass == "navOFF") {
			//좌측메뉴 닫힘상태
			$("#wrapper").removeClass("fix").removeClass("fix2").removeClass("action").addClass("W100");
			$("#closeAllPanes").removeClass("on");
			$("#openAllPanes").addClass("on");
			$(".pos__header-logo").css("width", 224);
			$(".pos__header-navigation").css("padding-left", 224);
			$(".pos__side").hide();
			$("#contentsArea > .vsplitter").hide();
		} else {
			$("#wrapper").removeClass("action").removeClass("fix2").removeClass("fix").removeClass("W100");
			$("#closeAllPanes").addClass("on");
			$("#openAllPanes").removeClass("on");
		}
	}

	// 스크롤바
	$(".pos__list-dropdown").mCustomScrollbar({ autoHideScrollbar: false, theme: "light" });
	$(".pos__side .pos__scroll").mCustomScrollbar({ autoHideScrollbar: false, theme: "light" });
	$(".pos__scroll-x").mCustomScrollbar({
		axis: "x",
		theme: "light",
		autoHideScrollbar: false,
		advanced: { autoExpandHorizontalScroll: true },
	});
	setTimeout(() => {
		$(".pos__select-multiple .ms-drop ul").mCustomScrollbar({ autoHideScrollbar: false, theme: "light" });
		$(".pos__iframe-body .pos__contents-box").mCustomScrollbar({
			autoHideScrollbar: false,
			theme: "light",
			callbacks: {
				whileScrolling: function () {
					$(".btn__TOP").fadeIn();
				},
				onTotalScrollBack: function () {
					$(".btn__TOP").fadeOut();
				},
			},
		});
	}, 10);
	// 본문
	if ($(".pos__contents").find("iframe").length == 0) {
		$("#contents > .pos__contents-roundBOX > .pos__contents-box").mCustomScrollbar({
			autoHideScrollbar: false,
			theme: "light",
			callbacks: {
				whileScrolling: function () {
					$(".btn__TOP").fadeIn();
				},
				onTotalScrollBack: function () {
					$(".btn__TOP").fadeOut();
				},
			},
		});
		$("#contents > .pos__contents-roundBOX .pos__scroll").mCustomScrollbar({
			autoHideScrollbar: false,
			theme: "light",
		});
	}

	/* SELECT */
	$(".pos__select").chosen({ disable_search_threshold: 100 });
	setTimeout(function () {
		$(".chosen-drop").on("click", function () {
			$(this).parents(".chosen-container:not(chosen-disabled)").addClass("on");
		});
		$(".pos__select").each(function () {
			if ($(this).find("option").is(":selected")) {
				var opSel = $(this).find("option").filter(":selected").val();
				if (opSel != "") {
					$(this).next(".chosen-container:not(chosen-disabled)").addClass("on");
				}
			}
		});
	}, 100);

	/*연속 선택 SELECT */
	if ($(".pos__form-box").find(".continuous").length) {
		$(".continuous .chosen-container").each(function (i) {
			$(this).addClass("chosen" + i);

			$(".chosen" + i)
				.find(".chosen-drop")
				.on("click", function () {
					$(".chosen" + i)
						.next(".pos__select")
						.prop("disabled", false)
						.trigger("chosen:updated");
				});
		});
	}

	/* 다중 선택 SELECT */
	$(".pos__select-multiple").multipleSelect({
		maxHeight: 240,
		//ellipsis: true,
		selectAll: false,
		minimumCountSelected: 10000,
		onOpen: function () {
			$(".pos__select-multiple.ms-parent").each(function () {
				if ($(this).find(".ms-choice").find("span").is(".placeholder") === false) {
					$(this).parent().find(".icon-malkanBK").remove();
				} else {
					$(this).removeClass("completion");
					$(this).parent().find(".icon-malkanBK").remove();
				}
			});
		},
		onClose: function () {
			$(".pos__select-multiple.ms-parent").each(function () {
				if ($(this).find(".ms-choice").find("span").is(".placeholder") === false) {
					var multipleTXT = $(this).find(".ms-choice").find("span").not(".placeholder").text();
					$(this).addClass("completion");
					$(this)
						.parent()
						.append("<span class='icon-malkanBK'>" + multipleTXT + "</span>");
				} else {
					$(this).removeClass("completion");
					$(this).parent().find(".icon-malkanBK").remove();
				}
			});
		},
	});

	if ($("body").find(".pos__input-number").length) {
		$(".pos__input-number").on("keyup", function () {
			$(this).val(
				addComma(
					$(this)
						.val()
						.replace(/[^0-9]/g, "")
				)
			);
		});

		if ($(".pos__input-number").val() >= 0) {
			$(".pos__input-number").val(
				addComma(
					$(".pos__input-number")
						.val()
						.replace(/[^0-9]/g, "")
				)
			);
		}
	}

	// 아이프레임 이슈
	if ($("body").find("#wrapperG").length == 0) {
		if ($("body").find("#header").length == 0 && $("body").find("#contentsArea").length == 0) {
			$("body").addClass("pos__iframe-body");
			$("html").addClass("pos__iframe-body");
		}
	}

	// F11(전체창 제어) 관련 소스
	if (document.addEventListener) {
		document.addEventListener("fullscreenchange", exitHandler, false);
		document.addEventListener("mozfullscreenchange", exitHandler, false);
		document.addEventListener("MSFullscreenChange", exitHandler, false);
		document.addEventListener("webkitfullscreenchange", exitHandler, false);
	}
	function exitHandler() {
		if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
			$(".btn__closeFull").hide();
			$(".btn__openFull").show();
			$(".pos__tabMove-btn li:last-child").find(".icon-malkanBK").text("풀스크린");
			$("#wrapper").removeClass("full");
			$(".pos__popup-side").removeClass("full");
			if (localStorage.getItem("bar") == "barOn") {
				if (localStorage.getItem("nav") == "navOFF") {
					$("#wrapper").removeClass("action").removeClass("fix2").addClass("fix").addClass("W100");
					$(".pos__bar").addClass("action");
					$(".btn__bar-fix").hide();
					$(".btn__bar-fixNO").show();
					$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
				} else {
					$("#wrapper").removeClass("action").removeClass("fix").addClass("fix2").removeClass("W100");
					$(".pos__bar").addClass("action");
					$(".btn__bar-fix").hide();
					$(".btn__bar-fixNO").show();
					$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
				}
			} else {
			}
		}
	}

	//즐겨찾기 우클릭
	/*
	$(document).on("contextmenu", "#favoritesList li", function (e) {
		alert("Context Menu event has fired!");
		return false;
	});*/

	//button class="btn__favorites" 클릭 시 popup(새창으로 띄울 때)
	var winPopup = decodeURI(window.location.hash).substr(1);
	if (winPopup == "contentsArea") {
		$("html").css("background-color", "#ffffff");
		$("body").css("background-color", "#ffffff");
		$("#wrapper").addClass("W100");
		$("#contentsArea").removeClass("pos__container").removeClass("splitter_panel");
		$(".pos__header").remove();
		$(".pos__bar").remove();
		$(".pos__side").remove();
		$(".pos__tabMove").remove();
		$(".pos__title-btn li:last-child").remove();
	} else if (winPopup == "dialogPopup") {
		//팝업
	}
});

function btnTOP() {
	$(".btn__TOP").on("click", function () {
		$(".pos__contents-box").mCustomScrollbar("scrollTo", "top");
	});
}

function bar() {
	$(".pos__bar-box").on("mouseleave", function () {
		if ($("#wrapper").is(".fix") === true) {
		} else if ($("#wrapper").is(".fix2") === true) {
		} else {
			$(".pos__bar").removeClass("action");
		}
	});
}

function barOpen() {
	$(".btn__bar-open").on("mouseenter", function () {
		$(".pos__bar").addClass("action");
	});
}

function barClose() {
	$(".btn__bar-close").on("click", function () {
		$(".pos__bar").removeClass("action");
		$("#wrapper").removeClass("action").removeClass("fix").removeClass("fix2");
		$(".btn__bar-fixNO").hide();
		$(".btn__bar-fix").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정");
		$.removeCookie("bar", { path: "/" });
	});
}

function barFix() {
	$(".btn__bar-fix").on("click", function () {
		var Wcont = $("#contentsArea").width();
		$(this).hide();
		$(".btn__bar-fixNO").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
		if ($(".pos__side").is(":visible")) {
			$("#wrapper").removeClass("action").removeClass("fix").addClass("fix2");
		} else {
			$("#wrapper").removeClass("action").removeClass("fix2").addClass("fix");
		}
		localStorage.setItem("bar", "barOn");

		var Scont = $(".pos__side").width();
		$(".pos__contents").css({ width: Wcont - Scont - 8, left: Scont + 8 });
		$(".pos__side").next(".vsplitter").css({ left: Scont });
	});
	//console.log(localStorage.getItem("bar") + "," + localStorage.getItem("nav"));
}

function barFixNO() {
	$(".btn__bar-fixNO").on("click", function () {
		var Wcont = $("#contentsArea").width();
		$(".pos__bar").addClass("action");
		$(this).hide();
		$(".btn__bar-fix").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정");
		if ($(".pos__side").is(":visible")) {
			$("#wrapper").removeClass("fix").removeClass("fix2").removeClass("action");
		} else {
			$("#wrapper").removeClass("action").removeClass("fix2").removeClass("fix");
		}
		localStorage.removeItem("bar");

		var Scont = $(".pos__side").width();
		//console.log(Scont);
		$(".pos__contents").css({ width: Wcont - Scont - 8, left: Scont + 8 });
		$(".pos__side").next(".vsplitter").css({ left: Scont });
	});
}

function closeAll() {
	$("#closeAllPanes").on("click", function () {
		$(this).removeClass("on");
		$("#openAllPanes").addClass("on");
		$(".pos__bar").removeClass("action");
		$("#wrapper").removeClass("fix").addClass("action").addClass("W100");
		$(".btn__bar-fixNO").hide();
		$(".btn__bar-fix").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정");
		$(".pos__side").hide();
		$(".pos__side").next(".vsplitter").hide();
		$(".pos__resizer-bar").hide();
		localStorage.setItem("nav", "navOFF");
		localStorage.removeItem("bar");
	});
}

function openAll() {
	$("#openAllPanes").on("click", function () {
		var Wcont = $("#contentsArea").width();

		if ($(".pos__side").length > 0) {
			var posSideWidth = $(".pos__side").width();
			var posSideOutWidth = $(".pos__side").width() + 8;
		} else {
			var posSideWidth = 0;
			var posSideOutWidth = 0;
		}
		$(this).removeClass("on");
		$("#closeAllPanes").addClass("on");
		$(".pos__bar").addClass("action");
		$("#wrapper").removeClass("action").removeClass("fix").addClass("fix2").removeClass("W100");
		$(".btn__bar-fix").hide();
		$(".btn__bar-fixNO").show();
		$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
		$(".pos__side").show().css({ width: posSideWidth });
		$(".pos__resizer-bar").show();
		$(".pos__contents").css({ width: Wcont - posSideOutWidth, left: posSideOutWidth });
		$(".pos__contents").css({ width: Wcont - posSideOutWidth });
		$(".pos__side").next(".vsplitter").show().css({ left: posSideWidth });
		localStorage.removeItem("nav");
		localStorage.setItem("bar", "barOn");
	});
}

function sideClose() {
	$(".btn__side-close").on("click", function () {
		$("#closeAllPanes").removeClass("on");
		$("#openAllPanes").addClass("on");
		if ($(".pos__bar").is(".action") === true) {
			$("#wrapper").removeClass("action").removeClass("fix2").addClass("fix");
		} else {
			$(".pos__bar").removeClass("action");
			$("#wrapper").removeClass("action").removeClass("fix2").removeClass("fix");
		}
		$(".pos__header-logo").css("width", 224);
		$(".pos__header-navigation").css("padding-left", 224);
	});
}

function sizeJS() {
	if ($("body").find("#wrapperG").length == "0") {
		if ($("body").find(".pos__side").length) {
			new ResizeSensor($(".pos__side"), function (size) {
				if (size.width <= "208") {
					$(".pos__side").addClass("min-W");
				} else {
					$(".pos__side").removeClass("min-W");
				}

				if ($(".pos__side").is(":visible")) {
					if (size.width <= "224") {
						$(".pos__header-logo").css("width", 224);
						$(".pos__header-navigation").css("padding-left", 224);
					} else {
						$(".pos__header-logo").css("width", size.width);
						$(".pos__header-navigation").css("padding-left", size.width);
					}
				} else {
					$(".pos__header-logo").css("width", 224);
					$(".pos__header-navigation").css("padding-left", 224);
				}
			});
			new ResizeSensor($(".pos__side"), function (size) {
				$(".pos__bar").css("height", size.height - 2);
			});
			new ResizeSensor($("#wrapper"), function (size) {
				var SideW = $(".pos__side").width();
				var reW = size.width - 32;
				var recontW2 = reW - SideW;
				if (localStorage.getItem("sideWidth") != null) {
				} else {
					$(".pos__contents").css({ width: recontW2 - 8 });
				}
			});
		}
		if ($("body").find("#wrapper").length) {
			if ($(".pos__contents-box").find(".pos__table-box--new").length == "1") {
				new ResizeSensor($(".pos__contents-box"), function (size) {
					var contHH = size.height;
					var contM1 = $(".pos__title").outerHeight();
					var contM2 = $(".pos__search-box").outerHeight();
					var contM3 = $(".pos__table-top").outerHeight();
					var contHHH = contHH - (contM1 + contM2 + contM3 + 20);
					$(".pos__contents-box .pos__table-box--new").css("height", contHHH);
				});
			}
		}
	}
}

function tab() {
	//좌측 LNB TBA
	$(".pos__side").find(".pos__tab-cont").eq(0).show();
	$(".pos__side .pos__tab-list li").on("click", function () {
		var tabInx = $(this).index();
		$(".pos__side .pos__tab-list li").removeClass("action");
		$(this).addClass("action");
		$(".pos__side").find(".pos__tab-cont").hide();
		$(".pos__side").find(".pos__tab-cont").eq(tabInx).show();

		$(".pos__edit").show();
		$(".pos__navigation-side > li > a").show();
		$(".pos__navigation-side > li > .pos__input.focus").hide().delay(3000).remove();
	});
	if ($("body").find(".pos__tab-wrap").length) {
		$(".pos__tab-wrap").each(function () {
			$(this).find(".pos__tab-cont").eq(0).show();
			if ($(this).children().is(".pos__tab-btn") === true) {
				$(this)
					.find(".pos__tab-btn li")
					.on("click", function () {
						var tabInx = $(this).index();
						var tabcont = $(this).parents(".pos__tab-wrap").find(".pos__tab-cont");
						$(this).parents(".pos__tab-btn").toggleClass("action");
						tabcont.hide();
						tabcont.eq(tabInx).show();
					});
			} else if ($(this).find(".pos__tab-scroll").length) {
				$(this)
					.find(".pos__tab-scroll span")
					.on("click", function () {
						var tabInx = $(this).index();
						var tabcont = $(this).parents(".pos__tab-wrap").find(".pos__tab-cont");
						$(this).parent(".pos__tab-scroll").find("span").removeClass("tab_selected");
						$(this).addClass("tab_selected");
						tabcont.hide();
						tabcont.eq(tabInx).show();
					});
			} else {
				$(this).tabs();

				/*
				//기존 방식으로 위 tabs()로 적용하기 어려울 경우 사용
				$(this)
					.find(".pos__tab-list li")
					.on("click", function () {
						var tabInx = $(this).index();
						var tabcont = $(this).parents(".pos__tab-wrap").find(".pos__tab-cont");
						$(this).parent(".pos__tab-list").find("li").removeClass("action");
						$(this).addClass("action");
						tabcont.hide();
						tabcont.eq(tabInx).show();
					});
					*/
			}
		});
	} else {
		$(".pos__tab-scroll span").on("click", function () {
			var tabInx = $(this).index();
			var tabcont = $(this).parents(".pos__tab-wrap").find(".pos__tab-cont");
			$(this).parent(".pos__tab-scroll").find("span").removeClass("tab_selected");
			$(this).addClass("tab_selected");
			tabcont.hide();
			tabcont.eq(tabInx).show();
		});
	}
	// 예외 TBA
	if ($("body").find(".pos__tab-scroll").length) {
		$(".pos__tab-scroll").each(function () {
			if ($(this).find("span").length >= "15") {
				setTimeout(() => {
					$(this).scrollTabs({
						click_callback: function (e) {
							var val = $(this).index();
							$(this).parents(".pos__tab-wrap").find(".pos__tab-cont").hide();
							$(this)
								.parents(".pos__tab-wrap")
								.find(".pos__tab-cont")
								.eq(val - 1)
								.show();
						},
					});
				}, 40);
			} else {
				$(this).parent(".pos__tab-slide").find(".pos__box-control").hide();
			}
		});
	}
}

function tabMove() {
	$(".btn__del").on("click", function () {
		if ($(this).parents("li").is(".action")) {
			window.open("", "_self").close();
			return false;
		} else {
			$(this).parents("li").remove();
		}
		if ($(this).parents("div").is(".icon-malkanBK") === true) {
			$(this).parents("div.icon-malkanBK").hide();
		}
	});

	$(".pos__tabMove-list > ul > li").each(function (index, item) {
		var tabText = $(item).children("a").children("span").text();
		$(item).append("<span class='icon-malkanBK'>" + tabText + "</span>");
	});
}

function menu() {
	$(".pos__navigation-side > li > a").on("click", function () {
		var menuBOX = $(this).next(".pos__navigation-sub");
		if (menuBOX.length) {
			if (menuBOX.is(":visible")) {
				menuBOX.slideUp();
				$(this).parents("li").removeClass("action");
			} else {
				menuBOX.slideDown();
				$(this).parents("li").addClass("action");
			}
		}
		$(".pos__edit-box").hide();
	});
	$(".pos__navigation-side > li > a").keyup(function (event) {
		if (event.keyCode == "38") {
			$(this).parents("li").removeClass("action");
			$(this).parents("li").find(".pos__navigation-sub").slideUp();
		} else if (event.keyCode == "40") {
			$(this).parents("li").addClass("action");
			$(this).parents("li").find(".pos__navigation-sub").slideDown();
		}
	});
	$(".pos__navigation-sub > ul > li > a").keyup(function (event) {
		if (event.keyCode == "38") {
			$(this).parent("li").removeClass("action");
			$(this).parent("li").children(".pos__navigation-childre").slideUp();
		} else if (event.keyCode == "40") {
			$(this).parent("li").addClass("action");
			$(this).parent("li").children(".pos__navigation-childre").slideDown();
		}
	});
	$(".pos__navigation-sub > ul > li > a").on("click", function () {
		var menuBOX = $(this).next(".pos__navigation-childre");
		if (menuBOX.length) {
			if (menuBOX.is(":visible")) {
				menuBOX.slideUp();
				$(this).parents("li").removeClass("action");
			} else {
				menuBOX.slideDown();
				$(this).parents("li").addClass("action");
			}
		}
	});
	$(".pos__list-toggle > li").on("click", function () {
		var menuBOX = $(this).find(".pos__list-sub");
		if (menuBOX.length) {
			if (menuBOX.is(":visible")) {
				menuBOX.slideUp();
				$(this).removeClass("action");
			} else {
				menuBOX.slideDown();
				$(this).addClass("action");
			}
		}
	});
	$(".btn__toggle-list").on("click", function () {
		$(".btn__toggle-list").toggleClass("off");
		if ($(".btn__toggle-list").is(".off") === true) {
			$(".btn__toggle-list").find("span").text("모두 닫기");
			$(".pos__list-toggle > li").addClass("action");
			$(".pos__list-sub").slideDown();
		} else {
			$(".btn__toggle-list").find("span").text("모두 펼치기");
			$(".pos__list-toggle > li").removeClass("action");
			$(".pos__list-sub").slideUp();
		}
	});
	$(".btn__more").on("click", function () {
		if ($(this).next(".pos__list-dropdown").length) {
			$(this).parent("li").toggleClass("action");
			$(this).next(".pos__list-dropdown").toggle();
		}
	});
	$(".pos__list-dropdown li button").on("click", function () {
		$(this).parents(".pos__list-dropdown").hide();
		$(this).parents("li").removeClass("action");
	});
	$(".pos__list-dropdown").on("mouseleave", function () {
		setTimeout(() => {
			$(this).parent("li").removeClass("action");
			$(this).hide();
		}, 300);
	});
	$(".pos__title-btn-right .btn__basic").on("mouseenter", function () {
		$(".pos__title-btn-right li:last-child").removeClass("action");
		$(".pos__list-dropdown").hide();
	});
}

function menuEdit() {
	$(".pos__edit .btn__edit").on("click", function () {
		var menuBOX = $(this).next(".pos__edit-box");
		if (menuBOX.length) {
			if (menuBOX.is(":visible")) {
				menuBOX.slideUp();
			} else {
				menuBOX.slideDown();
			}
		}
	});
	$(".pos__edit").on("mouseleave", function () {
		if ($(".pos__edit-box").is(":visible")) {
			$(".pos__edit-box").slideUp();
		}
	});
	//삭제
	$(".pos__edit-box .del").on("click", function () {
		$(this).parents("ul").parents("div").parents("li").remove();
		$(this).find(".pos__edit-box").slideUp();
	});
	//수정
	$(".pos__edit-box .edit").on("click", function () {
		var editTXT = $(this).parents("ul").parents("div").parents("li").children("a").text();

		$(".pos__edit").show();
		$(".pos__navigation-side > li > a").show();
		$(".pos__navigation-side > li > .pos__input.focus").hide().delay(3000).remove();

		$(this).parents("ul").parents("div").parents("li").children("a").hide();
		$(this)
			.parents("ul")
			.parents("div")
			.parents("li")
			.prepend("<input class='pos__input focus' value='" + editTXT + "'>");
		$(this).parents(".pos__edit").hide();
		$(this).parents(".pos__edit-box").slideUp();
		setTimeout(function () {
			$(".pos__input.focus").focus(); // 3초 후 실행
			//키보드 제어
			$(".pos__input.focus").keydown(function (key) {
				if (key.keyCode == 13) {
					$(".pos__edit").show();
					$(this)
						.parents("li")
						.children("a")
						.show()
						.text($(".pos__navigation-side > li > .pos__input.focus").val())
						.append("<span class='icon-arrow1'></span>");
					$(this).parents("li").children(".pos__input.focus").hide().delay(3000).remove();
				}
			});
		}, 300);
	});
	$(".pos__error-box dt").on("click", function () {
		var menuBOX = $(this).next("dd");
		if (menuBOX.length) {
			if (menuBOX.is(":visible")) {
				menuBOX.slideUp();
				$(this).parents("dl").removeClass("action");
			} else {
				menuBOX.slideDown();
				$(this).parents("dl").addClass("action");
			}
		}
	});
}

function Allcheckbox() {
	if ($(".pos__table-box").not(".pos__table-toggle").find("th").find(".pos__checkbox-All").length) {
		//전체선택
		$(".pos__table-box .pos__checkbox-All").on("click", function () {
			var subChk = $(this).parents(".pos__table-box").find("td:first-child").find(".pos__checkbox");
			if ($(this).is(":checked")) {
				$(this).removeClass("partial");
				subChk.prop("checked", true).parents("tr").addClass("action");
			} else {
				$(this).removeClass("partial");
				subChk.prop("checked", false).parents("tr").removeClass("action");
			}
		});

		//단일선택
		$(".pos__table-box .pos__checkbox").on("click", function () {
			if ($(this).parent("td").index() == 0) {
				var allChk = $(this).parents(".pos__table-box").find(".pos__checkbox-All");
				var total = $(this).parents(".pos__table-box").find("td:first-child").find(".pos__checkbox").length;
				var checked = $(this).parents(".pos__table-box").find("td:first-child").find(".pos__checkbox:checked").length;

				if ($(this).is(":checked")) $(this).prop("checked", true).parents("tr").addClass("action");
				else $(this).prop("checked", false).parents("tr").removeClass("action");

				if (total != checked) allChk.prop("checked", false).removeClass("partial");
				else allChk.prop("checked", true);

				if (checked != 0) allChk.addClass("partial");
				else allChk.removeClass("partial");
			}
		});
	}
	if ($(".pos__tree-item").find(".pos__checkbox-All").length) {
		//전체선택
		$(".pos__tree-item .pos__checkbox-All").on("click", function () {
			var subChk = $(this).parents(".pos__tree-item").find(".pos__checkbox");
			if ($(this).is(":checked")) {
				$(this).removeClass("partial");
				subChk.prop("checked", true).parents("tr").addClass("action");
			} else {
				$(this).removeClass("partial");
				subChk.prop("checked", false).parents("tr").removeClass("action");
			}
		});

		//단일선택
		$(".pos__tree-item .pos__checkbox").on("click", function () {
			var allChk = $(this).parents(".pos__tree-item").find(".pos__checkbox-All");
			var total = $(this).parents(".pos__tree-item").find(".pos__checkbox").length;
			var checked = $(this).parents(".pos__tree-item").find(".pos__checkbox:checked").length;

			console.log(allChk);

			if ($(this).is(":checked")) $(this).prop("checked", true).parents("tr").addClass("action");
			else $(this).prop("checked", false).parents("tr").removeClass("action");

			if (total != checked) allChk.prop("checked", false).removeClass("partial");
			else allChk.prop("checked", true);

			if (checked != 0) allChk.addClass("partial");
			else allChk.removeClass("partial");
		});
	}
}

function checkOnlyOne() {
	$('input[type="checkbox"][name="searchCheckbox"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="searchCheckbox"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
	$('input[type="checkbox"][name="searchCheckbox2"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="searchCheckbox2"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
	$('input[type="checkbox"][name="searchCheckbox3"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="searchCheckbox3"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
	$('input[type="checkbox"][name="porg1"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="porg1"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
	$('input[type="checkbox"][name="porg2"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="porg2"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
	$('input[type="checkbox"][name="porg3"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="porg3"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
	$('input[type="checkbox"][name="porg4"]').on("click", function () {
		if ($(this).prop("checked")) {
			$('input[type="checkbox"][name="porg4"]').prop("checked", false);

			$(this).prop("checked", true);
		}
	});
}

function complexToggle() {
	$(".pos__search-title h3").on("click", function () {
		$(this).find(".btn__toggle-table").toggleClass("off");
		$(this).parents("dl").toggleClass("off");
	});
	$(".btn__complex-toggle").on("click", function () {
		$(this).toggleClass("off");
		$(".btn__toggle-table").toggleClass("off");
		$(".pos__search-complex dl").toggleClass("off");
		$(this).parent().parent().not(".pos__search-foot").toggleClass("off");
	});
}

function gridTit() {
	$(".pos__grid").each(function () {
		$(this)
			.find(".pos__grid-row")
			.each(function () {
				var gridCol = $(this).find(".col").length;
				if (gridCol == "4") {
					$(this)
						.find("li")
						.each(function (i) {
							$(this).addClass("colNum" + i);
						});
				} else if (gridCol == "3") {
					if ($(this).find(".col").is(".col-4") === false) {
						if ($(this).find(".col").eq(0).is(".col-6") === true) {
							$(this).find(".col").eq(1).addClass("colNum2");
						} else {
							$(this).find(".col").eq(1).addClass("colNum1");
						}
						$(this).find(".col").eq(0).addClass("colNum0");
						if ($(this).find(".col").eq(2).is(".col-6") === true) {
							$(this).find(".col").eq(2).addClass("colNum2");
						} else {
							$(this).find(".col").eq(2).not(".col-4").not(".col-6").addClass("colNum3");
						}
					}
				} else if (gridCol == "2") {
					$(this).find(".col").eq(0).addClass("colNum0");
					if ($(this).find(".col").eq(0).is(".col-6") === true) {
						$(this).find(".col").eq(1).addClass("colNum2");
					} else if ($(this).find(".col").eq(0).is(".col-9") === true) {
						$(this).find(".col").eq(1).addClass("colNum3");
					} else {
						$(this).find(".col").eq(1).addClass("colNum1");
					}
				} else if (gridCol == "1") {
					$(this).find(".col").addClass("colNum0");
				}
			});

		var titW1 = $(this)
				.find(".pos__grid-row > .colNum0 .tit span")
				.map(function () {
					return $(this).width();
				})
				.get(),
			maxW1 = Math.max.apply(null, titW1);
		var titW2 = $(this)
				.find(".pos__grid-row > .colNum1 .tit span")
				.map(function () {
					return $(this).width();
				})
				.get(),
			maxW2 = Math.max.apply(null, titW2);
		var titW3 = $(this)
				.find(".pos__grid-row > .colNum2 .tit span")
				.map(function () {
					return $(this).width();
				})
				.get(),
			maxW3 = Math.max.apply(null, titW3);
		var titW4 = $(this)
				.find(".pos__grid-row > .colNum3 .tit span")
				.map(function () {
					return $(this).width();
				})
				.get(),
			maxW4 = Math.max.apply(null, titW4);

		/*
//console.log($(".pos__grid-row").find(".col").length);
*/

		if (maxW1 >= 110) {
			$(this).find(".pos__grid-row .colNum0").find(".tit").css({ "min-width": maxW1, width: maxW1 });
			//$(".pos__grid-row .colNum0").find(".tit").find("span").css({ "white-space": "normal", "word-break": "keep-all" });
		} else if (maxW1 >= 85) {
			$(this)
				.find(".pos__grid-row .colNum0")
				.find(".tit")
				.css({ "min-width": maxW1 / 1.9, width: maxW1 / 1.9 });
			$(this).find(".pos__grid-row .colNum0").find(".tit").find("span").css({ "white-space": "normal", "word-break": "keep-all" });
		} else {
			$(this).find(".pos__grid-row .colNum0").find(".tit").css({ "min-width": maxW1, width: maxW1 });
		}
		if (maxW1 == 0) {
			$(this).find(".pos__grid-row .colNum0").find(".tit").css({ "min-width": "auto", width: "auto" });
		}
		if (maxW2 >= 90) {
			$(this).find(".pos__grid-row .colNum1").find(".tit").css({ "min-width": 92, width: 92 });
			$(this).find(".pos__grid-row .colNum1").find(".tit").find("span").css({ "white-space": "normal" });
		} else if (maxW2 >= 85) {
			$(this)
				.find(".pos__grid-row .colNum1")
				.find(".tit")
				.css({ "min-width": maxW2 / 1.55, width: maxW2 / 1.55 });
			$(this).find(".pos__grid-row .colNum1").find(".tit").find("span").css({ "white-space": "normal", "word-break": "keep-all" });
		} else {
			$(this).find(".pos__grid-row .colNum1").find(".tit").css({ "min-width": maxW2, width: maxW2 });
		}
		if (maxW3 >= 90) {
			$(this).find(".pos__grid-row .colNum2").find(".tit").css({ "min-width": 92, width: 92 });
			$(this).find(".pos__grid-row .colNum2").find(".tit").find("span").css({ "white-space": "normal" });
		} else if (maxW3 >= 85) {
			$(this)
				.find(".pos__grid-row .colNum2")
				.find(".tit")
				.css({ "min-width": maxW3 / 1.55, width: maxW3 / 1.55 });
			$(this).find(".pos__grid-row .colNum2").find(".tit").find("span").css({ "white-space": "normal", "word-break": "keep-all" });
		} else {
			$(this).find(".pos__grid-row .colNum2").find(".tit").css({ "min-width": maxW3, width: maxW3 });
		}
		if (maxW4 >= 90) {
			$(this).find(".pos__grid-row .colNum3").find(".tit").css({ "min-width": 92, width: 92 });
			$(this).find(".pos__grid-row .colNum3").find(".tit").find("span").css({ "white-space": "normal" });
		} else if (maxW4 >= 85) {
			$(this)
				.find(".pos__grid-row .colNum3")
				.find(".tit")
				.css({ "min-width": maxW4 / 1.55, width: maxW4 / 1.55 });
			$(this).find(".pos__grid-row .colNum3").find(".tit").find("span").css({ "white-space": "normal", "word-break": "keep-all" });
		} else {
			$(this).find(".pos__grid-row .colNum3").find(".tit").css({ "min-width": maxW4, width: maxW4 });
		}
	});
}

function inputAmend() {
	if ($(".pos__contents").find(".pos__input-text-amend").length) {
		$(".pos__input-text-amend").on("focus", function () {
			$(this).val("");
		});
		$(".pos__input-text-amend").on("blur", function () {
			var ymd = $(this).val();
			if ($(this).val().length == 0) $(this).val("(베)Thai Bnh General Trade CGL/CCL");
			else $(this).val(ymd);
		});
		$(".pos__input-text-amend").keydown(function (key) {
			var idx = $(this).parents("tr").index(this);
			if (key.keyCode == 13) {
				$(this)
					.parents("tr")
					.eq(idx + 1)
					.next("tr")
					.find("td:last-child")
					.find("input")
					.focus();
			}
		});
	}

	// 마우스 휠에 따라 증식/감소
	if ($("body").find(".pos__input-stepper").length) {
		if ($(".pos__input-stepper .pos__input-text:disabled").length) {
			$(".pos__input-stepper .pos__input-text:disabled").parent(".pos__input-stepper").addClass("disabled");
			$(".pos__input-stepper .pos__input-text:disabled").parent(".pos__input-stepper").find("button").attr("disabled", true);
		} else {
			$(".pos__input-stepper .pos__input-text").on("mousewheel", function (e) {
				e.preventDefault();
				var num = Number($(this).val());

				if (e.originalEvent.wheelDelta > 0) {
					if (num >= 999999999999) return false;
					$(this).val(num + 1);
					//console.log("업");
				} else {
					if (num <= 0) return false;
					$(this).val(num - 1);

					//console.log("다운");
				}
			});
		}
		$(".pos__input-stepper .pos__input-text").on("focus", function () {
			$(this).parent(".pos__input-stepper").addClass("focus");
		});
		$(".pos__input-stepper .pos__input-text").on("blur", function () {
			$(this).parent(".pos__input-stepper").removeClass("focus");
		});
	}
}

function fnCalCount(type, ths) {
	var $input = $(ths).parent(".pos__input-stepper").find(".pos__input-text");
	var tCount = Number($input.val());

	if (type == "p") {
		if (tCount < 999999999999) $input.val(Number(tCount) + 1);
	} else {
		if (tCount > 0) $input.val(Number(tCount) - 1);
	}
}

function tdToggle() {
	if ($(".tree-tit").find(".icon-toggle").length) {
		$(".pos__table-toggle tr.title > .tree-tit").on("click", function () {
			var trNm = $(this).attr("idx");
			$(this).parents("tr").toggleClass("on");
			$(".pos__table-toggle")
				.find("tr[idx=" + trNm + "]")
				.toggleClass("unfold");
			if ($("tr[idx=" + trNm + "]").is(".on") === true) {
				$("tr[idx=" + trNm + "].on").each(function (index, item) {
					var tabText = $(item).children(".tree-tit").attr("idx");
					$(this).removeClass("on");
					$(".pos__table-toggle")
						.find("tr[idx=" + tabText + "]")
						.removeClass("unfold2");
					$("tr[idx=" + tabText + "].on").each(function (index, item) {
						var tabText2 = $(item).children(".tree-tit").attr("idx");
						$(this).removeClass("on");
						$(".pos__table-toggle")
							.find("tr[idx=" + tabText2 + "]")
							.removeClass("unfold3");
					});
				});
			}
		});
		$(".pos__table-toggle tr.sub > .tree-tit").on("click", function () {
			var trNm = $(this).attr("idx");
			$(this).parents("tr").toggleClass("on");
			$(".pos__table-toggle")
				.find("tr[idx=" + trNm + "]")
				.toggleClass("unfold2");
			if ($("tr[idx=" + trNm + "]").is(".on") === true) {
				$("tr[idx=" + trNm + "].on").each(function (index, item) {
					var tabText = $(item).children(".tree-tit").attr("idx");
					$(this).removeClass("on");
					$(".pos__table-toggle")
						.find("tr[idx=" + tabText + "]")
						.removeClass("unfold3");
				});
			}
		});
		$(".pos__table-toggle tr.sub-sub > .tree-tit").on("click", function () {
			var trNm = $(this).attr("idx");
			$(this).parents("tr").toggleClass("on");
			$(".pos__table-toggle")
				.find("tr[idx=" + trNm + "]")
				.toggleClass("unfold3");
		});
	}
}
function textareaCnt() {
	if ($(".pos__form-box").find(".pos__textarea-box").length) {
		$(".pos__textarea-box").parents(".pos__form-box").addClass("va-top2");
	}
	$(".pos__textarea").on("keyup", function () {
		$(this)
			.next(".pos__textarea-cnt")
			.html($(this).val().length + " / 1000");

		if ($(this).val().length > 1000) {
			$(this).val($(this).val().substring(0, 1000));
			$(this).next(".pos__textarea-cnt").html("1000 / 1000");
		}
	});
	$(".pos__textarea").on("focus", function () {
		$(this).parents(".pos__textarea-box").addClass("focus");
	});
	$(".pos__textarea").on("focus", function () {
		$(this).parents(".pos__textarea-box").addClass("focus");
	});
	$(".pos__textarea").on("blur", function () {
		$(this).parents(".pos__textarea-box").removeClass("focus");
	});
	$(".pos__textarea:disabled").parents(".pos__textarea-box").addClass("disabled");
}

function windowClose() {
	$(".btn__windowClose").on("click", function () {
		window.close();
		self.close();
		window.opener = window.location.href;
		self.close();
		window.open(window.location.href).close();
		return false;
	});
}

// 팝업
function popupJS() {
	//팝업
	$(".pos__popup").dialog({
		autoOpen: false,
		draggable: false,
		width: "auto",
		height: "auto",
		show: { effect: "fade", speed: 200 },
		hide: { effect: "fade", speed: 100 },
		open: function () {
			gridTit();
		},
	});

	//슬라이딩 팝업
	$("#contents").append($(".pos__popup-side").dialog().parents(".ui-dialog"));
	$(".pos__popup-side").dialog("close");
	$(".pos__popup-side").dialog({
		dialogClass: "pos__popup--side",
		autoOpen: false,
		draggable: false,
		width: "auto",
		height: "auto",
		show: { effect: "fade", speed: 200 },
		hide: { effect: "fade", speed: 100 },
		open: function () {
			gridTit();
		},
	});
	$(".pos__popup-contents").mCustomScrollbar({
		theme: "dark",
	});
	$(".pos__popup-side").resizable();
	$(document).on("click", ".pos__popup-toggle", function (e) {
		$(".pos__popup--side").toggleClass("side-hide");
	});

	/* 즐겨찾기용 */
	$(".pos__popup-favorites").dialog({
		autoOpen: false,
		draggable: false,
		position: { my: "left top", at: "left bottom-9", of: ".pos__title" },
		show: { effect: "fade", speed: 50 },
		hide: { effect: "fade", speed: 50 },
	});

	/* 로딩 팝업 */
	if ($("body").find("#wrapperG").length) {
		$("#progressG").append($("#popup-progress").dialog().parents(".ui-dialog"));
	}
	$("#popup-progress").dialog({
		dialogClass: "pos__popup-progress",
		autoOpen: true,
		width: 120,
		draggable: false,
		show: { effect: "fade", speed: 200 },
		hide: { effect: "fade", speed: 100 },
	});
	$(".pos__popup-wrapper").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
}

function magnifyingJS() {
	$("#magnifying").change(function (e) {
		var thisVal = $("#magnifying option:selected").val();
		var thisText = $("#magnifying option:selected").text();

		$("body").css("zoom", thisVal + "%");

		if (thisVal == "150") {
			$("#wrapper").addClass("magnifying1");
		} else if (thisVal == "125") {
			$("#wrapper").addClass("magnifying2");
		} else {
			$("#wrapper").removeClass("magnifying1").removeClass("magnifying2");
		}
	});
}

function accordionJS() {
	//기본
	$(".pos__accordion").accordion({ header: ".pos__accordion-head", heightStyle: "content", collapsible: true, active: 2000 });

	// 트리 형식의 리스트
	$(".btn__toggle-tree").click(function () {
		var treeSub = $(this).parents(".pos__tree-title").next(".pos__tree-item--sub");
		$(this).toggleClass("on");
		if ($(this).is(".on") === true) {
			treeSub.slideDown();
		} else {
			treeSub.slideUp();
		}
	});
}

function arrorJS() {
	if ($(".pos__form-box").find(".error").length) {
		$("input.error").parents(".pos__form-box").addClass("error");
		$("textarea.error").parents(".pos__form-box").addClass("error");
		//console.log("sdf");
	}
}

//천단위마다 콤마 생성
function addComma(data) {
	return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var doc = document.documentElement;
// 전체화면 설정
function openFullScreenMode() {
	$(".btn__openFull").hide();
	$(".btn__closeFull").show();
	$(".pos__tabMove-btn li:last-child").find(".icon-malkanBK").text("풀스크린해제");
	$("#wrapper").addClass("full");
	$(".pos__popup-side").addClass("full");

	if (doc.requestFullscreen) doc.requestFullscreen();
	else if (doc.webkitRequestFullscreen)
		// Chrome, Safari (webkit)
		doc.webkitRequestFullscreen();
	else if (doc.mozRequestFullScreen)
		// Firefox
		doc.mozRequestFullScreen();
	else if (doc.msRequestFullscreen)
		// IE or Edge
		doc.msRequestFullscreen();
}
// 전체화면 해제
function closeFullScreenMode() {
	$(".btn__closeFull").hide();
	$(".btn__openFull").show();
	$(".pos__tabMove-btn li:last-child").find(".icon-malkanBK").text("풀스크린");
	//$("#wrapper").removeClass("full");
	$(".pos__popup-side").removeClass("full");
	if (document.exitFullscreen) document.exitFullscreen();
	else if (document.webkitExitFullscreen)
		// Chrome, Safari (webkit)
		document.webkitExitFullscreen();
	else if (document.mozCancelFullScreen)
		// Firefox
		document.mozCancelFullScreen();
	else if (document.msExitFullscreen)
		// IE or Edge
		document.msExitFullscreen();

	setTimeout(function () {
		if (localStorage.getItem("bar") == "barOn") {
			if (localStorage.getItem("nav") == "navOFF") {
				$("#wrapper").removeClass("action").removeClass("fix2").addClass("fix").addClass("W100");
				$(".pos__bar").addClass("action");
				$(".btn__bar-fix").hide();
				$(".btn__bar-fixNO").show();
				$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
			} else {
				$("#wrapper").removeClass("action").removeClass("fix").addClass("fix2").removeClass("W100");
				$(".pos__bar").addClass("action");
				$(".btn__bar-fix").hide();
				$(".btn__bar-fixNO").show();
				$(".pos__bar-top").find(".icon-malkanBK").text("고정해제");
			}
		} else {
		}
	}, 50);
}

function loadingJS() {
	if ($("body").find(".pos__progress").length) {
		if ($("body").find(".pos__progress-circle").length) {
			$(".pos__progress-circle")
				.circleProgress({
					size: 56,
					//그래프 크기
					startAngle: -Math.PI / 2,
					//시작지점 (기본값 Math.PI)
					value: 1,
					//그래프에 표시될 값
					thickness: 4,
					//그래프두께
					animation: {
						duration: 1400,
					},
					//그래프가 그려지는 애니메이션 동작 여부
					fill: { gradient: ["#1e52a0", "#1e52a0"] },
					emptyFill: "#d3dae6",
				})
				.on("circle-animation-progress", function (event, progress) {
					$(this)
						.find("strong")
						.html(Math.round(100 * progress) + "%");
				})
				.on("circle-animation-end", function (event, progress) {
					if ($("body").find("#wrapperG").length == "0") {
						$(this).parent().delay(200).fadeOut();
						$(this).parents("#popup-progress").delay(200).dialog("close");
					}
				});
		}
		if ($("body").find(".pos__progress-bar").length) {
			var progressbar = $(".pos__progress-bar"),
				progressLabel = $(".pos__progress-text dt");
			progressLabel2 = $(".pos__progress-text dd");

			progressbar.progressbar({
				value: false,
				change: function () {
					progressLabel2.text(progressbar.progressbar("value") + "%");
				},
				complete: function () {
					progressLabel.text("Completed");
					if ($("body").find("#wrapperG").length == "0") {
						progressbar.parent().delay(200).fadeOut();
					}
				},
			});

			function progress() {
				var val = progressbar.progressbar("value") || 0;

				progressbar.progressbar("value", val + 2);

				if (val < 99) {
					setTimeout(progress, 20);
				}
			}

			setTimeout(progress, 0);
		}
	}
}

//TBA
$(document).ready(function () {
	//순위변경
	$("#favoritesList .pos__navigation-sub ul").sortable({ axis: "y", containment: "parent" });
	$(".pos__tabMove-list ul").sortable({ axis: "x", containment: "parent" });
});
