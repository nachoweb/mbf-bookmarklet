<?php
if($_GET['callbak']){   
   echo '
    funcionCallback({
   "propiedad1" : "valor1",
   "propiedad2" : "valor2"  
   })';
   
}else{
   echo '{
   "propiedad1" : "valor1",
   "propiedad2" : "valor2"  
   }'; 
}
?>