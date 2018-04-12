// JavaScript Document
var balleDirX=-5;
var balleDirY=5;
var balleTimer=null;
var joueurTimer=null;
var score1=0;
var score2=0;
function intro(){
	$("#intro button").hide();
	$("#intro").addClass("active");
	$("#intro button").delay(3750).slideDown("fast").on("click",function(){
		jeu();
	});
}
function jeu(){
	$("#intro").fadeOut("slow",function(){
		$(this).remove();	
		$("#jeu").addClass("active");
		joueurTimer=setInterval(function(){
			joueur2();
		},45);// le joueur 2 est finalement trop lent je lui enleve le handicap
		balle();
		$(document).on("keydown",function(e){
			console.log(e.which);
			switch(e.which){
				case 27:$url=window.location;window.location=$url;break; // la touche echap relancera le jeu
				case 37:
				case 38: goUp();break;
				case 40:
				case 39: goDown();break;		
			}
		});
	});
}
function goDown(){
	$p=$("#joueur1").position();
	console.log($p.top+5,$(window).innerHeight());
	if($p.top+25+5<$(window).innerHeight()){
		$("#joueur1").css({top:"+=5"});
	}
}
function goUp(){
	$p=$("#joueur1").position();
	console.log($p.top-5,82);
	if($p.top-25-5>82){
		$("#joueur1").css({top:"-=5"});
	}
}
function updateScore(){
	$("#score1").text(score1);
	$("#score2").text(score2);
}
function joueur2(){
	$pBalle=$("#balle").position();
	$pJoueur=$("#joueur2").position();
	if($pBalle.top<$pJoueur.top){
		$("#joueur2").css({top:"-=5"});
	}else{
		$("#joueur2").css({top:"+=5"});		
	}
}
function balle(){
	$p=$("#balle").position();
	if($p.left<50){
		score2++;
		balleDirX=5;
		balleDirY=5;
		$("#balle").css({top:82,left:"50%"});
		clearTimeout(balleTimer);
		updateScore();
		balle();
	}
	if($p.left>$(window).innerWidth()-50){
		score1++;
		balleDirX=-5;
		balleDirY=5;
		$("#balle").css({top:82,left:"50%"});
		clearTimeout(balleTimer);
		updateScore();
		balle();
	}
	$j1=$("#joueur1").position();
	$j2=$("#joueur2").position();
	if($p.left-10>=50&&$p.left-10<=65&&$p.top>=$j1.top-25&&$p.top<=$j1.top+25){
		balleDirX=-balleDirX;
	}	
	if($p.left+10<=$(window).innerWidth()-50&&$p.left+10>=$(window).innerWidth()-65&&$p.top>=$j2.top-25&&$p.top<=$j2.top+25){
		balleDirX=-balleDirX;
	}
	$move={top:"",left:""};
	if(balleDirX<0){
		if($p.left+balleDirX>0){
			$move.left="-="+Math.abs(balleDirX);
		}else{
			balleDirX=-balleDirX;
			$move.left="+="+Math.abs(balleDirX);
		}
	}else{
		if($p.left+balleDirX<$(window).innerWidth()){
			$move.left="+="+Math.abs(balleDirX);
		}else{
			balleDirX=-balleDirX;
			$move.left="-="+Math.abs(balleDirX);
		}
	}
	if(balleDirY<0){
		if($p.top+balleDirY>82){
			$move.top="-="+Math.abs(balleDirY);
		}else{
			balleDirY=-balleDirY;
			$move.top="+="+Math.abs(balleDirY);
		}
	}else{
		if($p.top+balleDirY<$(window).innerHeight()){
			$move.top="+="+Math.abs(balleDirY);
		}else{
			balleDirY=-balleDirY;
			$move.top="-="+Math.abs(balleDirY);
		}
	}
	$("#balle").css($move);
	
	balleTimer=setTimeout(function(){
		balle();
	},50);
}
intro();