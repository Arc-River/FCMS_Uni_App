export default {

    AdminWeb    : 'http://119.3.128.220:8100',


    BaseURL     : 'http://119.3.128.220:8099/prod-api',
    // BaseURL : 'http://119.3.128.220:8099/dev-api',

    // BaseURL : 'http://192.168.30.2:8099/prod-api',
    // BaseURL : 'http://192.168.30.2:8099/dev-api',

    getCodeImg          : '/captchaImage',
    login               : '/app/basics/login',
    register            : '/app/basics/register',
    getInfo             : '/app/basics/getInfo',
    checkUpdate         : '/app/basics/checkUpdate/', // 检查更新
    updateInfo          : '/system/user/profile',
    updatePwd           : '/system/user/profile/updatePwd',
    uploadFile          : '/common/upload', // 文件上传
    featureFaces        : '/app/basics/feature/faces', // 人脸检测
    getTestFRC          : '/app/basics/getTestFRC', // 测试人脸识别

    // 首页
    getHomeData         : '/app/home/data',
    getStatisticData    : '/app/home/statistic',
    getPublicNoticeList : '/app/home/publicNoticeList',

    // 客户
    searchClient        : '/fcms/client/searchFace', // 人脸检索
    addClient           : '/fcms/client',
    getClient           : '/fcms/client/',
    getClientList       : '/fcms/client/list',
    getClientGroupList  : '/fcms/client/groupList',

    // 通知
    getNotice           : '/system/notice/',
    getNoticeList       : '/system/notice/list',
    appreciate          : '/system/notice/appreciate/',

    // 排名
    getRankingList      : '/member/ranking/list',

    // 记录
    getRecoLogList      : '/fcms/recoLog/list',
}
