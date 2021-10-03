<?php
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'test';            // mysql用户名
$dbpass = '19950611';          // mysql用户名密码
$dbname = 'my_db';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

$sql = "CREATE TABLE locations( ".
        "id VARCHAR(20) NOT NULL, ".
        "name VARCHAR(100) NOT NULL, ".
        "lat VARCHAR(20) NOT NULL, ".
        "lng VARCHAR(20) NOT NULL, ".
        "type VARCHAR(2) NOT NULL, ".
        "review VARCHAR(1) NOT NULL, ".
        "review_details LONGTEXT NOT NULL, ".
        "updated_date DATETIME, ".
        "PRIMARY KEY ( name ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
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