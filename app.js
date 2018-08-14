/*
Autheur : Amir SAIDI
Date de création : 13.08.2018
Version : 1.0
Description : Fichier app.js qui affiche la page envoiSMS.ejs au client et qui récupère les paramètres envoyés par le client et les envoie à l'API de Net Oxygen
*/


var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();




/* affiche la page d'envoi d'un SMS */
app.get('/envoiSMS', function(req, res) { 
    res.render('envoiSMS.ejs');
})

/* appelle la fonction qui envoie le sms */
.post('/envoiSMS/envoi/', urlencodedParser, function(req, res) {
	console.log("lancement de la requête d'envoi de sms")
	var http=new XMLHttpRequest();
	var url = "https://sms.netoxygen.ch/url/?";
	var params = "action=send";
	params    += "&user="+req.body.utilisateur;
	params    += "&pass="+req.body.motDePasse;
    params    += "&type="+req.body.type;
    params    += "&dest="+req.body.destinataire;
    params    += "&msg="+encodeURIComponent(req.body.message);
	http.open("POST", url, true);

	//Send the proper header information along with the request+
	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Accept", "application/json");
	http.setRequestHeader("Accept", "application/x-www-form-urlencoded");
	http.send(params);
	http.onreadystatechange = function() {//la fonction est appelée lorsqu'il y a des changements d'états et statuts.
		
		if(http.readyState == 4 && http.status == 200) {
				console.log(http.responseText);
				res.send("Le sms a été envoyé");
		} else if(http.readyState == 4){
				res.send(http.responseText);
				console.log(http.responseText);
		}
	}
})


/* redirige vers la page envoiSMS, si une page inconnue est demandée */
.use(function(req, res, next){
    res.redirect('/envoiSMS');
})

.listen(8080);  
 