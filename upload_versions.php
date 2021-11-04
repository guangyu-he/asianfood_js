<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '0';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// 检测连接
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "连接成功<br>";

// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");

$id = uniqid();
$web_version = $_GET['wv'];
$data_version = $_GET['dv'];
 
$sql = "INSERT INTO versions ".
        "(id, web_version, data_version) ".
        "VALUES ".
        "('$id','$web_version','$data_version')";

mysqli_select_db( $conn, $dbname );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法插入数据: ' . mysqli_error($conn));
}else{
  echo "数据插入成功\n";
}
mysqli_close($conn);
?>