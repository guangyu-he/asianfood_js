<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '19950611';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$id = $_GET['id'];
$sql = "DELETE FROM locations WHERE id='$id'";
 
 
mysqli_select_db( $conn, $dbname );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法删除数据: ' . mysqli_error($conn));
}else{
    echo "数据删除成功\n";
}
mysqli_close($conn);
?>