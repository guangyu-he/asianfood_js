<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '0';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");

$sql = "SELECT * FROM locations";

mysqli_select_db( $conn, $dbname );
$retval = mysqli_query( $conn, $sql );

if (mysqli_num_rows($retval) > 0) {
  // 输出数据
  while($row = mysqli_fetch_assoc($retval)) {
      echo "" .$row["name"]. ",";
      echo "" .$row["lat"]. ",";
      echo "" .$row["lng"]. ",";
      echo "" .$row["type"]. ",";
      echo "" .$row["review"]. ",";
      echo "" .$row["review_details"]. ",";
      echo "" .$row["id"]. "<br>";
  }
} else {
  echo "";
}

mysqli_close($conn);
?>