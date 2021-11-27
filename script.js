console.log("Script Loaded");

$(window).resize(() => {
	$("span#count").css("font-size", document.body.clientWidth *0.4);
});
let count = 0;
let check = false;
let k = "";

$(() => {
	console.log("Window loaded");
	$("div#menu span").click(e => $("div#menu ul").stop().fadeToggle(300));
	$("li").click(e => {
		$(e.target).toggleClass("active");
	}).each((i, e) => {e.innerText = e.id; $(e).addClass("active")});
	$("li#reset").click(e => {
		count = 0;
		$("span#count").text("000");
		$("div#input").html("");
	});

	$("html").on("keydown", event => {
		if (event.metaKey || event.ctrlKey) return;
		check = false;
		if (event.code.slice(0, 3) == "Key") {
			if ($("li#string").hasClass("active")) {
				count++;
				check = true;
			}
		} else if (event.code.slice(0, 5) == "Digit") {
			if ($("li#number").hasClass("active")) {
				count++;
				check = true;
			}
		} else if (event.code == "Enter") {
			if ($("li#Enter").hasClass("active")) {
				count++;
				check = true;
			}
		} else if (["Key", "Dig", "Esc", "Tab", "Con", "Shi", "Cap", "Alt", "Met", "Bac"].indexOf(event.code.slice(0, 3)) == -1) {
			if ($("li#symbol").hasClass("active")) {
				count++;
				check = true;
			}
		} else if (event.code == "Backspace") {
			$("div#input").children().last().remove();
			if ($("li#DelCount").hasClass("active")) {
				count--;
			}
		}

		count = (count <= 0) ? 0 : count;
		$("span#count").text( String(count).padStart(3, '0') );

		if (["Esc", "Tab", "Con", "Shi", "Cap", "Alt", "Met", "Bac"].indexOf(event.code.slice(0, 3)) == -1) {
			k = event.key;
			if (k == "Enter") k = "¬<br>";
			$("div#input")[0].innerHTML += `<span class="${(check) ? "g" : "r"}">${k}</span>`;
		}
		if (count == 666) {
			$("body").css("backgroundColor", "#000");
			$("span#count").css("color", "#FFF");
			$("div#input").css("zIndex", "-1").children().css("color", "#000");
		} else if (count > 666) {
			$("body").css("backgroundColor", "#191919");
		}
	});
	$(window).resize()
})