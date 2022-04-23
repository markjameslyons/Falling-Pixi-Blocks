import { Game }  from "./Game";

(function () {
	window.addEventListener("load", onLoadPage, false);
	let game: Game;
	function onLoadPage() {
		game = new Game();
        game.init();
        window.removeEventListener("load", onLoadPage);
	}
}());