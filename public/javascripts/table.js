var path = '';
$(document).ready(function() {
    let oTableInit = new Object();
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
        };
        return temp;
    };
    function statusFormatter(value) {
        if(value == '0'){
            return '<span class="label label-info">已发出借书申请</span>';
        }
        if(value == '1'){
            return '<span class="label label-info">已发出同意借书通知</span>';
        }
        if(value == '2'){
            return '<span class="label label-info">完成借书</span>';
        }
        if(value == '3'){
            return '<span class="label label-info">已发出还书申请</span>';
        }
        if(value == '4'){
            return '<span class="label label-info">已发出同意还书通知</span>';
        }else{
            return '<span class="label label-danger">未知状态</span>';
        }

    }
    window.cancelBorrow = {
        'click .like': function (e, value, row, index) {
            alert('You click like action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {
            // alert('You click like action, row: ' + JSON.stringify(row));
            $('#table').bootstrapTable('remove', {
                field: 'borrow_id',
                values: [row.borrow_id]
            });
            $.ajax({
                url:path+'/cancelborrow',
                type:'DELETE',
                data:{'book_id':row.book.book_id,'borrow_id':row.borrow_id},
                success:function (data) {
                    // alert(JSON.stringify(data));
                    $('#tipinfo').text("删除成功");
                    $('.bs-example-modal-sm').modal('show');
                },
                error:function (err) {
                    alert(err);
                }
            })
        }
    };
    $('#table').bootstrapTable({
        url: path+'/listborrow',         //请求后台的URL（*）
        method: 'get',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: oTableInit.queryParams,//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [ {
            field: 'book.book_name',
            title: '书名'
        }, {
            field: 'user.user_name',
            title: '借阅人'
        }, {
            field: 'borrow_date',
            title: '借阅日期'
        }, {
            field: 'borrow_status',
            title: '借阅状态',
            formatter:statusFormatter
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            events: cancelBorrow,
            formatter: operateFormatter
        }]
    });

    window.operateEvents = {
        'click .like': function (e, value, row, index) {
            alert('You click like action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {
            // alert('You click like action, row: ' + JSON.stringify(row));
            $('#table1').bootstrapTable('remove', {
                field: 'book_id',
                values: [row.book_id]
            });
            $.ajax({
                url:path+'/deletebook',
                type:'DELETE',
                data:{'book_id':row.book_id},
                success:function (data) {
                    // alert(JSON.stringify(data));
                    $('#tipinfo').text("删除成功");
                    $('.bs-example-modal-sm').modal('show');
                },
                error:function (err) {
                    alert(err);
                }
            })
        }
    };
    $('#table1').bootstrapTable({
        columns: [ {
            field: 'book_name',
            title: '书名'
        }, {
            field: 'book_writer',
            title: '作者'
        }, {
            field: 'pub_company',
            title: '出版社'
        }, {
            field: 'current_num',
            title: '数量',
        }, {
            field: 'pub_date',
            title: '出版日期',
        },{
            field: 'operate',
            title: '操作',
            align: 'center',
            events: operateEvents,
            formatter: operateFormatter
        }]
    });
    function operateFormatter(value, row, index) {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
            '<i class="glyphicon glyphicon-heart"></i>',
            '</a>  ',
            '<a class="remove" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }

})