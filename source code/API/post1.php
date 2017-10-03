<?php

include_once('connf.php');

if($_SERVER['REQUEST_METHOD'] == "POST"){
	
	//get data
	$url = isset($_POST['url']) ? mysqli_real_escape_string($conn,$_POST['url']) : '';
	$isSecureHttps = isset($_POST['isSecure']) ? mysqli_real_escape_string($conn,$_POST['isSecure']) : '';
	$isSecureHSTS = isset($_POST['isSecureHSTS']) ? mysqli_real_escape_string($conn,$_POST['isSecureHSTS']) : '';
	$HPKP = isset($_POST['useHPKP']) ? mysqli_real_escape_string($conn,$_POST['useHPKP']) : '';
	$totalCookies = isset($_POST['total']) ? mysqli_real_escape_string($conn,$_POST['total']) : '';
	$httpCookies = isset($_POST['httpCookies']) ? mysqli_real_escape_string($conn,$_POST['httpCookies']) : '';
	$sessionCookies = isset($_POST['sessionCookies']) ? mysqli_real_escape_string($conn,$_POST['sessionCookies']) : '';
	$thirdPartyCookies = isset($_POST['thirdPartyCookies']) ? mysqli_real_escape_string($conn,$_POST['thirdPartyCookies']) : '';
	$CA = isset($_POST['useCA']) ? mysqli_real_escape_string($conn,$_POST['useCA']) : '';
	$Cipher = isset($_POST['useCipher']) ? mysqli_real_escape_string($conn,$_POST['useCipher']) : '';
	
	
	
	$sql = "INSERT IGNORE INTO `websites` (url) VALUES ('$url')";
	$result = mysqli_query($conn,$sql);
		if(!$result){
			$json = array("status" => 0, "msg" => "Error 0!");
		}else{
			$site_id = mysqli_insert_id($conn);
			//$json = array("status" => 0, "msg" => $site_id);
			//echo $site_id;
			if($site_id === 0){//already exist in the table
				
				$sql1= "SELECT id FROM `websites` WHERE url='$url'";
				$result1 = mysqli_query($conn,$sql1);
				$row = mysqli_fetch_row($result1);
				$var = $row[0];
				if(!$result1){
					$json = array("status" => 0, "msg" => "OUPS!");
				}
				
				//$id=mysqli_insert_id($conn);
				//$json = array("status" => 0, "msg" => );
				//$json = array("status" => 0, "msg" => "inside!");
				$sql2= "INSERT INTO `submissions` (site_id) VALUES ('$var')";
				$result2 = mysqli_query($conn,$sql2);
				
				$submission_id = mysqli_insert_id($conn);
				
				$sql3= "INSERT INTO `https` (submission_id,isSecure) VALUES ('$submission_id','$isSecureHttps')";
				$result = mysqli_query($conn,$sql3);
	
				$sql4= "INSERT INTO `hsts` (submission_id,isSecureHSTS) VALUES ('$submission_id','$isSecureHSTS')";
				$result = mysqli_query($conn,$sql4);
				
				$sql5= "INSERT INTO `hpkp` (submission_id,useHPKP) VALUES ('$submission_id','$HPKP')";
				$result = mysqli_query($conn,$sql5);
				
				$sql6= "INSERT INTO `cookies` (submission_id,total,httpCookies,sessionCookies,thirdPartyCookies) VALUES ('$submission_id','$totalCookies','$httpCookies','$sessionCookies','$thirdPartyCookies')";
				$result = mysqli_query($conn,$sql6);
				
				$sql7= "INSERT INTO `ca` (submission_id,useCA) VALUES ('$submission_id','$CA')";
				$result = mysqli_query($conn,$sql7);
				
				$sql8= "INSERT INTO `cipherssl` (submission_id,useCipher) VALUES ('$submission_id','$Cipher')";
				$result = mysqli_query($conn,$sql8);
				
				$json = array("status" => 1, "msg" => "Website record again!");
			}else{
				//first record
				$sql= "INSERT INTO `submissions` (site_id) VALUES ('$site_id')";
				$result = mysqli_query($conn,$sql);

				$submission_id = mysqli_insert_id($conn);
				$sql3= "INSERT INTO `https` (submission_id,isSecure) VALUES ('$submission_id','$isSecureHttps')";
				$result = mysqli_query($conn,$sql3);
	
				$sql4= "INSERT INTO `hsts` (submission_id,isSecureHSTS) VALUES ('$submission_id','$isSecureHSTS')";
				$result = mysqli_query($conn,$sql4);
				
				$sql5= "INSERT INTO `hpkp` (submission_id,useHPKP) VALUES ('$submission_id','$HPKP')";
				$result = mysqli_query($conn,$sql5);
				
				$sql6= "INSERT INTO `cookies` (submission_id,total,httpCookies,sessionCookies,thirdPartyCookies) VALUES ('$submission_id','$totalCookies','$httpCookies','$sessionCookies','$thirdPartyCookies')";
				//$sql6= "INSERT INTO `cookies` (submission_id,total,httpCookies) VALUES ('$submission_id','$totalCookies','$httpCookies')";
				$result = mysqli_query($conn,$sql6);
				
				$sql7= "INSERT INTO `ca` (submission_id,useCA) VALUES ('$submission_id','$CA')";
				$result = mysqli_query($conn,$sql7);
				
				$sql8= "INSERT INTO `cipherssl` (submission_id,useCipher) VALUES ('$submission_id','$Cipher')";
				$result = mysqli_query($conn,$sql8);
				
				$json = array("status" => 2, "msg" => "Website record !");
			}
		}
	/* prototype
	$sql = "INSERT INTO `websites` (url) VALUES ('$url')";
	$result = mysqli_query($conn,$sql);
		if(!$result){
			$json = array("status" => 0, "msg" => "Error User added!");
		}else{
			$json = array("status" => 1, "msg" => "Done User added!");
		}
		
	$site_id = mysqli_insert_id($conn);
	
	$sql= "INSERT INTO `submissions` (site_id,Date) VALUES ('$site_id','')";
	$result = mysqli_query($conn,$sql);

	$submission_id = mysqli_insert_id($conn);
	
	$sql= "INSERT INTO `https` (submission_id,isSecure) VALUES ('$submission_id','$isSecureHttps')";
	$result = mysqli_query($conn,$sql);
	
	$sql= "INSERT INTO `hsts` (submission_id,isSecureHSTS) VALUES ('$submission_id','$isSecureHSTS')";
	$result = mysqli_query($conn,$sql);
	//mysqli_free_result($result);
			
	*/




mysqli_close($conn);



}
header('Content-type: application/json');
echo json_encode($json);
?>