$(document).ready(function() {
    var leftRs = ($('#hidLeftRs').val()+'').replace(/None/gm,"''");
    var rightRs = ($('#hidRightRs').val()+'').replace(/None/gm,"''");
    leftRsObj = eval('(' + leftRs + ')');
    for(var i =0;i<leftRsObj.leftTxxx.length;i++){
        obj = leftRsObj.leftTxxx[i];
        if(obj.id == 'fwfx'&&obj.sxnr=="客户端"){
            $("#tbsRight").tabs('close','交易码解出函数')
            $("#tbsLeft").tabs('close','交易码解出函数')
        }
    }
    rightRsObj = eval('(' + rightRs + ')');
    $("#tbsLeft").tabs({
        onSelect: function(title, index) {
            regionSH(title);
            $("#tbsRight").tabs('select', index);
        }
    });

    $("#tbsRight").tabs({
        onSelect: function(title, index) {
            regionSH(title);
            $("#tbsLeft").tabs('select', index);
        }
    });
    $('#dgJbxxLeft').datagrid({
        nowrap: false,
        fit: true,
        rownumbers: true,
        fitColumns: true,
        method: "get",
        singleSelect: false,
        remoteSort: true,
        columns: [
            [{
                field: 'id',
                title: 'id',
                width: 50,
                hidden:true
            },{
                field: 'sxmc',
                title: '属性名称',
                width: 120
            }, {
                field: 'sxnr',
                title: '属性内容',
                width: 280,
                styler: function(value, row, index) {
                    bzArray = leftRsObj.diff.split(',');
                    for(var i = 0; i < bzArray.length; i++){
                        if(row.id == bzArray[i]){
                            return 'background-color:#ffee00;color:red;';
                        }
                    }
                }
            }]
        ],
        data: leftRsObj.leftTxxx
    });
    $('#dgJbxxRight').datagrid({
        nowrap: false,
        fit: true,
        rownumbers: true,
        fitColumns: true,
        method: "get",
        singleSelect: false,
        remoteSort: true,
        columns: [
            [{
                field: 'id',
                title: 'id',
                width: 50,
                hidden:true
            },{
                field: 'sxmc',
                title: '属性名称',
                width: 120
            }, {
                field: 'sxnr',
                title: '属性内容',
                width: 280,
                styler: function(value, row, index) {
                    bzArray = rightRsObj.diff.split(',');
                    for(var i = 0; i < bzArray.length; i++){
                        if(row.id == bzArray[i]){
                            return 'background-color:#ffee00;color:red;';
                        }
                    }
                }
            }]
        ],
        data: rightRsObj.rightTxxx
    });
    $('#divJymjchs').mergely({
        width: 'auto',
        height: 'auto',
        cmsettings: {
            readOnly: true,
            lineNumbers: true
        },
        lhs: function(setValue) {
            setValue(eval('(' + $('#hidLeftNr').val() + ')'));
        },
        rhs: function(setValue) {
            setValue(eval('(' + $('#hidRightNr').val() + ')'));
        }
    });
     // 延迟1s解决拖动不显示
    setTimeout(function() {
        $('#divJymjchs').mergely('options', {
            autoupdate: false,
            change_timeout: 3600000
        });
    }, 1000);
    // 监听左侧grid body滚动
    $('#dgJbxxLeft').datagrid('getBody').scroll(function(e){
        $("#dgJbxxRight")
            .datagrid('getBody')
            .scrollTop($(e.currentTarget).scrollTop());
    });

    // 监听右侧grid body滚动
    $('#dgJbxxRight').datagrid('getBody').scroll(function(e){
        $("#dgJbxxLeft")
            .datagrid('getBody')
            .scrollTop($(e.currentTarget).scrollTop());
    });
});

/*
*动态展示、隐藏内容
*/
function regionSH(title) {
    if (title == '基本信息') {
        $('#divJbxx').show();
        $('#divXml').hide();
    } else if (title == '交易码解出函数') {
        $('#divJbxx').hide();
        $('#divXml').show();
    } 
}
