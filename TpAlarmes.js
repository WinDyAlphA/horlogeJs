// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 6
window.onload = function () {
	var played = false;
	//ajouter une horloge qui se met a jour toutes les demi secondes
	let horloge = document.getElementById("horloge");
	let date = new Date();
	horloge.innerHTML = date.toLocaleTimeString();
	setInterval(function () {
		date = new Date();
		horloge.innerHTML = date.toLocaleTimeString();
	}, 500);
	//ajouter un bouton pour activer/desactiver l'alarme
	let btnAlarme = document.getElementById("addAlarm");
	var compteurAlarme = 0;
	btnAlarme.addEventListener("click", function () {
		compteurAlarme++;
		var alarm = document.getElementById("exampleAlarm");
		var clone = alarm.cloneNode(true);
		clone.id = "alarme" + compteurAlarme;
		var newAlarm = document.body.appendChild(clone);
		newAlarm.style.display = "block";
		var btnDel = newAlarm.childNodes[9];

		btnDel.addEventListener("click", function () {
			newAlarm.remove();
		});

		//recuperer l'heure de l'alarme

		//recuperer les minutes de l'alarme
		var compteurSons = 0;

		//ajouter champ pour qu'il qu'il puisse choisir le nombre de repetition

		//si l'heure de l'alarme est egale a l'heure actuelle et que les minutes de l'alarme sont egales aux minutes actuelles, alors on lance la musique
		var interval = setInterval(function () {
			var heureAlarme = newAlarm.childNodes[1].value;
			if (
				newAlarm.childNodes[7].value != null &&
				newAlarm.childNodes[7].value != "" &&
				newAlarm.childNodes[7].value != "0"
			) {
				var nbRepet = newAlarm.childNodes[7].value - 1;
			} else {
				nbRepet = 1;
			}

			if (heureAlarme < date.toLocaleTimeString() && heureAlarme != "") {
				var path = "sounds/" + newAlarm.childNodes[5].value + ".mp3";
				var audio = document.getElementById("audio");
				audio.src = path;
				//Stop interval
				clearInterval(interval);
				//lancer la musique
				audio.play();
				//attendre que la musique soit finit est jour le son 3 fois
				audio.addEventListener("ended", function () {
					if (compteurSons < nbRepet) {
						audio.play();
						compteurSons++;
					}
				});
				document.getElementById("msg").innerHTML = newAlarm.childNodes[3].value;
			}
		}, 1000);
	});
};
