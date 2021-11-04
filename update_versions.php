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

$id = $_GET['id'];
$web_version = $_GET['wv'];
$data_version = $_GET['dv'];

if( $web_version == null && $data_version != null ){
  $sql = "UPDATE versions SET data_version='$data_version' WHERE id='$id'";
}elseif( $web_version != null && $data_version == null ){
  $sql = "UPDATE versions SET web_version='$web_version' WHERE id='$id'";
}elseif( $web_version != null && $data_version != null ){
  $sql = "UPDATE versions SET web_version='$web_version',data_version='$data_version' WHERE id='$id'";
}else {
  echo "输入无效w\n";
}
//echo $name; 

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