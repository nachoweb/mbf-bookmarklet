<?php
	$_GET['user'] ? $user = $_GET['user'] : $user="Undefined";
?>
<html>
    <head>
        <title></title>
        <link rel=StyleSheet href="http://localhost/closure/popup/css/popup.css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--<script src="http://localhost:9810/compile?id=popup"></script>-->
        
        <style>
            .modal-dialog {
                width: 430px;
            }
        </style>
        <script>
            function myFunction(){ 
                mbfUserId = '<?php echo $user ?>';
                var mbfBookmarklet = document.createElement('script');
                mbfBookmarklet.setAttribute('type', 'text/javascript');
                mbfBookmarklet.setAttribute('src', 'http://localhost:9810/compile?id=popup');
                document.getElementsByTagName('head')[0].appendChild(mbfBookmarklet); 
            }
        </script>
    </head>
    <body>         
        <!-- nujiBookmarklet.setAttribute('src', 'http://localhost/closure/popup/ui/targetImage.js'); -->
        <a href="javascript:void((function(){window.mbfUser='<?php echo $user ?>';var mbfBookmarklet=document.createElement('script');mbfBookmarklet.setAttribute('type','text/javascript');mbfBookmarklet.setAttribute('src','http://localhost/closure/popup/js/popup.js');document.getElementsByTagName('head')[0].appendChild(mbfBookmarklet);})());" > MBF BookMarkLet </a>
        <!--<img src="http://static.zara.net/photos//2012/V/0/2/p/5246/409/400/5246409400_1_1_3.jpg?timestamp=1334313218319">-->
    </body>
</html>
