<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '0';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

$sql = "CREATE TABLE versions( ".
        "id VARCHAR(20) NOT NULL, ".
        "web_version VARCHAR(20) NOT NULL, ".
        "data_version VARCHAR(20) NOT NULL, ".
        "PRIMARY KEY ( id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
mysqli_select_db( $conn, $dbname );
$retval = mysqli_query( $conn, $sql );

if(! $retval )
{
  die('无法创建数据表: ' . mysqli_error($conn));
}else{
    echo "数据表创建成功\n";
}
mysqli_close($conn);
?>