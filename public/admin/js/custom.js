$(document).ready(function(){

    //call datatable class
    //new DataTable('#sections');
    $('#sections').DataTable();
    $(".nav-item").removeClass("active");
    $(".nav-link").removeClass("active");
// التحقق اذا كلمة سر الادمن صحيحة او لا
$("#current_password").keyup(function(){
    var current_password = $("#current_password").val();
    // alert(current_password);
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:'post',
        url:'/admin/check-admin-password',
        data:{current_password:current_password},
        success:function(resp){
            if(resp=="false"){
                $("#check_password").html("<font color='red'>Current Password is Incorrect!</font>");
            }else if(resp=="true"){
                $("#check_password").html("<font color='green'>Current Password is Correct!</font>");
            }
        },error:function(){
            alert('Error');
        }
    });
})

   // تحديث حالة الادمن
   $(document).on("click",".updateAdminStatus",function(){
    var status = $(this).children("i").attr("status");
    var admin_id = $(this).attr("admin_id");
    alert("Status updated successfully");
        $.ajax({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:'post',
        url:'/admin/update-admin-status',
        data:{status:status,admin_id:admin_id},
        // success: function(resp) {
        //     console.log(resp); // طباعة الاستجابة للتحقق منها
        //     alert("Status updated successfully: " + resp.status);
        // },
        // error: function(xhr, status, error) {
        //     console.error("Error details:", xhr, status, error);
        //     alert("Error: " + error);
        // }
        success:function(resp){
            // alert(resp);
            if(resp['status']==0){
                $("#admin-"+admin_id).html("<i style='font-size:30px' class='mdi mdi-bookmark-outline' status='Inactive'></i>");
            }else  if(resp['status']==1){
                $("#admin-"+admin_id).html("<i style='font-size:30px' class='mdi mdi-bookmark-check' status='Active'></i>");
            }
        }
        // , error:function(){
        //     alert("Error");
        // }
    })

});

   // تحديث حالة القسم 
   $(document).on("click",".updateSectionStatus",function(){
    var status = $(this).children("i").attr("status");
    var section_id = $(this).attr("section_id");
    alert("Status updated successfully");
        $.ajax({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:'post',
        url:'/admin/update-section-status',
        data:{status:status,section_id:section_id},
        // success: function(resp) {
        //     console.log(resp); // طباعة الاستجابة للتحقق منها
        //     alert("Status updated successfully: " + resp.status);
        // },
        // error: function(xhr, status, error) {
        //     console.error("Error details:", xhr, status, error);
        //     alert("Error: " + error);
        // }
        success:function(resp){
            // alert(resp);
            if(resp['status']==0){
                $("#section-"+section_id).html("<i style='font-size:30px' class='mdi mdi-bookmark-outline' status='Inactive'></i>");
            }else  if(resp['status']==1){
                $("#section-"+section_id).html("<i style='font-size:30px' class='mdi mdi-bookmark-check' status='Active'></i>");
            }
        }
        // , error:function(){
        //     alert("Error");
        // }
    })

});

// // Confirm Delete جافا سكريبت بسيطة 
// $(".confirmDelete").click(function(){
//     var title = $(this).attr("title");
//     if(confirm("Are you sure to delete this "+title+"?")){
//        return true; 
//     }else{
//         return false;
//     }    
// })

// Confirm Delete مكتبة سويت الرت 
$(".confirmDelete").click(function(){
    // var module = $(this).attr("module");
    // var moduleid = $(this).attr("moduleid");
    var deleteUrl = $(this).attr("delete-url"); // الحصول على الرابط الصحيح من السمة
 Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    )
    // window.location = "/admin/delete-"+module+"/"+moduleid;
       // إعادة توجيه المتصفح للرابط الصحيح
       window.location = deleteUrl;
  }
})
})

// $(document).on("click", ".updateAdminStatus", function() {
//     console.log("Button clicked"); // للتأكد أن النقر يعمل
//     var status = $(this).children("i").attr("status");
//     var admin_id = $(this).attr("admin_id");
//     console.log("Status:", status, "Admin ID:", admin_id); // عرض القيم قبل الإرسال

//     $.ajax({
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         },
//         type: 'post',
//         url: '/admin/update-admin-status',
//         data: { status: status, admin_id: admin_id },
//         success: function(resp) {
//             console.log("Response:", resp); // عرض الرد في وحدة التحكم
//             alert("Status updated successfully");
//         },
//         error: function(err) {
//             console.error("Error:", err); // عرض الخطأ في وحدة التحكم
//             alert("Error occurred while updating status");
//         }
//     });
// });

});