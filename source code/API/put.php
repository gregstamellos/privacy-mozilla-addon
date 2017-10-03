<?php

include_once('conf.php');
 
if($_SERVER['REQUEST_METHOD'] == "POST"){
 $uid = isset($_POST['uid']) ? mysqli_real_escape_string($conn,$_POST['uid']) : "";
 $status = isset($_POST['status']) ? mysqli_real_escape_string($conn,$_POST['status']) : "";

 
 $qur = "UPDATE users SET status = '$status' WHERE ID = '$uid' ";
 

}
 
 /*
 //mysql_select_db('TUTORIALS');
$sql = "UPDATE users SET status='$status' WHERE ID = '$uid' ";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}
*/

mysqli_close($conn);
 ?>
 
 