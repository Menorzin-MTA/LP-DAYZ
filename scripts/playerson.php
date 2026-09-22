<?php	
	//Sistema Simples. Desenvolvido por Danilo Modz!!!

	$infos = $_POST['Players']; //Pega o total de players enviado do MTA.
	$filename = 'count.txt'; //Nome do arquivo aonde vai salva o total de players.
	
	if (!is_null($infos)) { //Verifica se infos retonou algum dado.
		file_put_contents($filename, "Total de Players: $infos/500"); //Cria o arquivo, é coloca o total de players.
	}
	
	if (!file_exists($filename)) { //Se ainda não existe o arquivo 'count.txt', então criamos ele, para não da error no site.
		file_put_contents($filename, "Total de Players: 0/500");
	}
	
	echo file_get_contents($filename); //Exibimos o conteúdo que está dentro do arquivo 'count.txt'.
?>