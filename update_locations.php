<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '19950611';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");

$id = $_GET['id'];
$name = $_GET['n'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$type = $_GET['type'];
$review = $_GET['r'];
$review_details = $_GET['rd'];
$updated_date = date('Y-m-d H:i:s');


$sql = "UPDATE locations SET name='$name',lat='$lat',lng='$lng',type='$type',review='$review',review_details='$review_details',updated_date='$updated_date' WHERE id='$id'";

 
mysqli_select_db( $conn, $dbname );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法更新数据: ' . mysqli_error($conn));
}else{
    echo "数据更新成功\n";
}
mysqli_close($conn);
?>