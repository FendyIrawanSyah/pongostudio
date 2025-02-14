<?php   

include 'connection.php';

if(isset($_POST['action'])){
    //login karyawan
    if($_POST['action'] == 'login'){
       $email = $_POST['email'];
       $password = $_POST['password'];
       $query = "SELECT * FROM tbl_administrator WHERE email_admin = '$email' AND password_admin = '$password'";
       $run_query = $connection->prepare($query);
       $run_query->execute();
       $result= $run_query->rowCount();
       $row = $run_query->fetch(PDO::FETCH_ASSOC);
       if($result == 1) {
        session_start();
        $_SESSION['admin_id'] = $row['id_admin'];
        $_SESSION['admin_name'] = $row['nama_admin'];
        echo "success";
       }
    }
    //logout karywan
    if($_POST['action'] == 'logout'){
        session_start();
        session_destroy();
        echo "success";
    }
    //tambah karywan
    if($_POST['action'] == 'addKaryawan') {
        $nama = $_POST['nama'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $jabatan = $_POST['jabatan'];
        $phone = $_POST['phone'];

        $query = "INSERT INTO tbl_administrator (nama_admin, email_admin, password_admin, phone_admin, job_title_admin) VALUES (:nama, :email, :password, :phone_admin, :jabatan)";
        $run_query = $connection->prepare($query);
        $run_query->execute(
            array(
                ':nama' => $nama,
                ':email' => $email,
                ':password' => $password,
                ':jabatan' => $jabatan,
                ':phone_admin' => $phone
            )
        );
        if ($run_query) {
            echo "Add karyawan successfully";
        }else {
            echo "failed";
        }

    }
    //delete karayawan
    if($_POST['action'] == 'deleteKaryawan') {
        $id = $_POST['id'];
        $query = "DELETE FROM tbl_administrator WHERE id_admin = :id";
        $run_query = $connection->prepare($query);
        $run_query->execute(
            array(
                ':id' => $id
            )
        );
        if ($run_query) {
            echo "Deleted karyawan Successfully";
        } else {
            echo "failed";
        }
    }
    //edit karyawan
    if($_POST['action'] == 'editKaryawan') {
        $query = "UPDATE tbl_administrator SET 
        nama_admin = :nama, email_admin = :email, password_admin = :password, phone_admin = :phone_admin, job_title_admin = :jabatan 
        WHERE id_admin = :id";
        $run_query = $connection->prepare($query);
        $run_query->execute(
            array(
                ':nama' => $_POST['nama'],
                ':email' => $_POST['email'],
                ':password' => $_POST['password'],
                ':jabatan' => $_POST['jabatan'],
                ':phone_admin' => $_POST['phone'],
                ':id' => $_POST['id']
            )
        );
        if ($run_query) {
            echo "Edit Data Karyawan Successfully";
        } else {
            echo "failed";
        }
    }
}

?>