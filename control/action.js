$(document).ready(function () {

    //fetch data karyawan
    var loadDataKaryawan = $("#tabel-karyawan").DataTable({
        serverSide: true,
        processing: true,
        paging: true,
        order: [],
        ajax: {
        url: "../model/fetchKaryawan.php",
        type: "post",
        },
        columnDefs: [
        {
            targets: [0, 2, 4],
            orderable: false,
        },
        ],
    });

    $(document).on('click','#show-modal',function (e) { 
        e.preventDefault();
        $("#form-karyawan")[0].reset();
        $('#txtjabatan').prop('disabled', false);
        $('#modal-karyawan').modal('show');
        $(".modal-title-karyawan").text("Tambah Karyawan");
        $("#action").val("Add");
        $("#operation").val("addKaryawan");
        
    });

    //tambahkan karyawan
    $(document).on('submit', "#form-karyawan", function (e) { 
        e.preventDefault();
        nama = $('#txtnama').val();
        email = $('#txtemail').val();
        password = $('#txtpassword').val();
        jabatan = $('#txtjabatan').val();
        phone = $('#txtphone').val();
        operations = $('#operation').val();
        id = $('#id_karyawan').val();
        $.ajax({
            type: "post",
            url: "controler.php",
            data: {
                action: operations,
                id: id,
                nama: nama,
                email: email,
                phone: phone,
                password: password,
                jabatan: jabatan
            },
            success: function (response) {
                loadDataKaryawan.ajax.reload();
                $('#modal-karyawan').modal('hide');
                alert(response);
            }
        });
    });

    //delete karyawan
    $(document).on('click','.btn-delete-karyawan',function (e) { 
        e.preventDefault();
        id = $(this).attr('id');
        $.ajax({
            url: "controler.php",
            type: "post",
            data: {
                action: 'deleteKaryawan',
                id: id
            },
            success: function (response) {
                loadDataKaryawan.ajax.reload();
                alert(response);
            }
        });
    });

    //edit karyawan
    $(document).on('click','.btn-update-karyawan',function (e) {
        e.preventDefault();
        id = $(this).attr('id');
        $.ajax({
            url: "fetchKaryawanById.php",
            type: "post",
            data: {
                id: id
            },
            dataType: "json",
            success: function (data) {
                $('#modal-karyawan').modal('show');
                $(".modal-title-karyawan").text("Update Karyawan");
                $('#id_karyawan').val(data.id);
                $('#txtnama').val(data.nama);
                $('#txtemail').val(data.email);
                $('#txtphone').val(data.phone);
                $('#txtpassword').val(data.password);
                $("#txtjabatan").val(data.jabatan).change().prop("disabled", "disabled");  
                $("#id_karyawan").val(data.id);
                $("#action").val("Edit");
                $("#operation").val("editKaryawan");
            }
        });
    });

    //login karyawan
   $('#btn-login-admin').click(function (e) { 
    e.preventDefault();
    email = $('#txtemail').val();
    password = $('#txtpassword').val();
    $.ajax({
        type: "post",
        url: "controler.php",
        data: {
            action: 'login',
            email: email,
            password: password
        },
        success: function (response) {
            console.log(response);
            if (response === 'success') {
                window.location.href = 'index.php';
            } else {
                alert('Login failed');
            }
        }
    });
   });

   //logout karaywan
   $('#btn-logout').click(function (e) { 
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "controler.php",
        data: {
            action: 'logout'
        },
        success: function (response) {
            if (response ==='success') {
                window.location.href = 'login.php';
            } else {
                alert('Logout failed');
            }
        }
    });
   });

   //fetc data customers
   var loadDataCustomers = $("#tabel-customers").DataTable({
        serverSide: true,
        processing: true,
        paging: true,
        order: [],
        ajax: {
            url: "../model/fetchCustomers.php",
            type: "post",
        },
        columnDefs: [
        {
            targets: [0, 2],
            orderable: false,
        },
        ],
    });


});