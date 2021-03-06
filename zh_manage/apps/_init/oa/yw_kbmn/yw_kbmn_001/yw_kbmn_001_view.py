# -*- coding: utf-8 -*-
# Action: 交易监控
# Author: luoss
# AddTime: 2015-06-11
# Standard: 注释仅能以“#”开头，sql可以是“--”；注释不能同代码在同一行

from sjzhtspj import logger, request, render_to_string
from .yw_kbmn_001_service import index_service,data_wzxx_service

@register_url('GET')
def index_view():
    """
    # 左侧展示列表
    """
    # 初始化反馈信息
    data = {'zskfl_lst':[], 'qsxx_lst':[], 'tjxx_lst':[]}
    try:
        # 调用操作数据库函数
        data = index_service()
    except:
        # 查询出现异常时，将异常信息写入到日志文件中
        logger.info(traceback.format_exc())
    # 转到知识库主页面
    return render_to_string( "yw_kbmn/yw_kbmn_001/yw_kbmn_001.html", data)

@register_url('POST')
def data_wzxx_view():
    """
    # 中部文章信息列表
    """
    # 初始化反馈信息
    data = {'total':0, 'rows':[]}
    try:
        # 获取查询条件内容
        rn_start = request.rn_start
        rn_end = request.rn_end
        # 请求字典
        sql_data = {'rn_start':rn_start, 'rn_end':rn_end}
        # 调用操作数据库函数
        data = data_wzxx_service( sql_data )
    except:
        # 查询出现异常时，将异常信息写入到日志文件中
        logger.info(traceback.format_exc())
    # 将组织的结果反馈给前台
    return data