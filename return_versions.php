<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '19950611';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");

$sql = "SELECT * FROM versions";

mysqli_select_db( $conn, $dbname );
$retval = mysqli_query( $conn, $sql );

if (mysqli_num_rows($retval) > 0) {
  // 输出数据
  while($row = mysqli_fetch_assoc($retval)) {
      echo "" .$row["id"]. "<br>";
      echo "" .$row["web_version"]. "<br>";
      echo "" .$row["data_version"]. "<br>";
  }
} else {
  echo "";
}

mysqli_close($conn);
?>