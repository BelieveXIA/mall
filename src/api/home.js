import axios from 'axios';
import jsonp from 'assets/js/jsonp.js';
import {SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PSIZE, jsonpOptions} from './config.js';

// 打乱数组顺序
const shuffle = (arr) => {
    const arrLength = arr.length;
    let i = arrLength;
    let rndNum;

    while (i--) {
        if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
            [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
        }
    }
    return arr;
};
// 幻灯片 --ajax --axios
export const getHomeSlider = () => {
    return axios.get('http://www.imooc.com/api/home/slider', {timeout: TIMEOUT}).then(res => {
        if (res.data.code === SUCC_CODE) {
            let sliders = res.data.slider;
            const slider = [sliders[Math.floor(Math.random() * sliders.length)]];

            sliders = shuffle(sliders.filter(() => Math.random() >= 0.5));
            if (sliders.length === 0) {
                sliders = slider;
            }
            return sliders;
        }

        throw new Error('没有成功获取数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
        return [
            {
                linkUrl: 'http://www.imooc.com',
                picUrl: require('assets/img/404.png')
            }
        ];
    });
};

// 或取热门推荐数据--jsonp
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PSIZE) => {
    const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
    const params = {
        page,
        psize,
        type: 0,
        frontCatId: ''
    };
    return jsonp(url, params, jsonpOptions).then(res => {
        // console.log(res);
        if (res.code === '200') {
            return res;
        }

        throw new Error('没有成功获取数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });
};
