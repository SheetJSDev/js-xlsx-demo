"use strict";

var data = [
<?php
for($i=1; $i<10; $i++){
   echo "{date:'".date('Y-m-d', date(time()+($i*24*60*60)))."', data:'日本語通る？{$i}'},\n";
}
?>
];
