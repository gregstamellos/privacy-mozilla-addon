<?php

include_once('connf.php');

$url = isset($_GET['url']) ? mysqli_real_escape_string($conn,$_GET['url']) :  "";




// GET data from threats Table

if (isset($_GET['url']) && $_GET['url'] == '$url1'){
$sql2 = "SELECT  w.url, c.total, c.httpCookies, c.sessionCookies, c.thirdPartyCookies FROM websites w LEFT OUTER JOIN submissions s ON w.id=s.site_id LEFT OUTER JOIN cookies c ON s.id=c.submission_id WHERE url LIKE '%$url%';";	
//$sql1 = "SELECT w.url,h.isSecure FROM websites w LEFT OUTER JOIN submissions s ON w.id=s.site_id LEFT OUTER JOIN https h ON s.id=h.submission_id ;";
$sql= mysqli_query($conn ,$sql2) or die('Could not query');
$rows = array();
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
//echo '{"Info":';
echo json_encode($rows);
//echo json_encode($rows, JSON_FORCE_OBJECT);
//echo '}';
}



if (isset($_GET['url']) && $_GET['url'] == $url){
$sql2 = "SELECT * FROM websites;";	
$sql1 = "SELECT AVG(c.total) AS cookieAverage,  AVG(c.httpCookies) AS httpAverage, AVG(c.sessionCookies) AS sessionAverage, AVG(c.thirdPartyCookies) AS thirdAverage  FROM websites w LEFT OUTER JOIN submissions s ON w.id=s.site_id LEFT OUTER JOIN cookies c ON s.id=c.submission_id WHERE url LIKE '%$url%';";
$sql= mysqli_query($conn ,$sql1) or die('Could not query');
$rows = array();
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
//echo '{"Websites":';
echo json_encode($rows);
//echo '}';
}

if (isset($_GET['url']) && $_GET['url'] == 'websites/https/hsts'){

$sql2 = "SELECT * FROM websites;";	
$sql1 = "SELECT  w.url, c.total, c.httpCookies, c.sessionCookies, c.thirdPartyCookies from websites w LEFT OUTER JOIN submissions s ON w.id=s.site_id LEFT OUTER JOIN cookies c ON s.id= c.submission_id  WHERE w.url LIKE '%alibaba%' ;";
$sql= mysqli_query($conn ,$sql1) or die('Could not query');
$rows = array();
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
echo '{"Websites":';
echo json_encode($rows);
echo '}';
}


// GET data from websites Table
if (isset($_GET['url']) && $_GET['url'] == 'https'){

$sql= mysqli_query($conn ,"SELECT * from https") or die('Could not query');
$rows = array();
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
echo '{"Https":';
echo json_encode($rows);
echo '}';
}

if (isset($_GET['url']) && $_GET['url'] == 'hsts'){

$sql= mysqli_query($conn ,"SELECT * from hsts") or die('Could not query');
$rows = array();
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
echo '{"Https":';
echo json_encode($rows);
echo '}';
}


// GET data from topthreats Table
if (isset($_GET['url']) && $_GET['url'] == 'topthreats'){

$sql= mysqli_query($conn ,"SELECT * from topthreats") or die('Could not query');
$rows = array();
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
echo '{"TopThreats":';
echo json_encode($rows);
echo '}';
}

mysqli_close($conn);

//header('Content-type: application/json');
//echo json_encode($rows);
?>
