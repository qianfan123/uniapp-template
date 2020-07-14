<!-- 验证码按钮组件 -->
<template>
  <view class="category_wrapper">
    <!-- 搜索栏 -->
    <view class="searchBarWrapper">
      <image
        style="width: 88px; height: 44px;"
        src="/static/category_logo2.png"
      ></image>
      <view class="right-wrapper" @click="gotoSearch">
        <image
          style="width: 16px; height: 16px;"
          src="/static/ic_search_grey32.png"
        ></image>
        <text>请输入商品、品牌名称</text>
      </view>
      <image
        style="width: 24px; height: 24px; margin-left: 12px;"
        :src="styleImg"
        @click.stop="switchStyleClick"
      ></image>
    </view>

    <view class="left_view">
      <view
        class="left_item_wrapper"
        :class="{ left_item_selected_wrapper: firstActiveIndex === firstIndex }"
        v-for="(firstItem, firstIndex) in firstCategoryArr"
        :key="firstIndex"
      >
        <view
          :class="{ white_selected_wrapper: firstActiveIndex === firstIndex }"
        >
          <view
            class="left_item_first"
            :class="{
              left_item_first_selected: firstActiveIndex === firstIndex
            }"
            @click="handleFirstClick(firstIndex)"
          >
            <view class="span nowrap">{{ firstItem.name }}</view>
          </view>
          <view
            v-if="firstActiveIndex === firstIndex"
            class="left_selected_line"
          >
            <image
              v-if="
                firstActiveIndex === firstIndex && secondCategoryArr.length > 0
              "
              style="width: 56px; height: 5px;"
              src="/static/img/category_line.png"
            ></image>
          </view>
          <view
            class="left_item_second_wrapper"
            v-for="(secondItem, secondIndex) in secondCategoryArr"
            :key="secondIndex"
          >
            <view
              v-if="firstActiveIndex === firstIndex"
              class="left_item_second nowrap"
              :class="{
                left_item_second_selected: secondActiveIndex === secondIndex
              }"
              @click="handleSecondClick(secondIndex)"
            >
              {{ secondItem.name }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 横向滚动的三级分类栏 -->
    <view v-if="thirdCategoryArr.length > 0" class="category_scroll_wrapper">
      <scroll-view
        scroll-x="true"
        class="category_scrollview"
        :scroll-into-view="'mark' + currentCategoryId"
        scroll-with-animation="true"
      >
        <view class="category_items">
          <view
            :id="'mark' + item.id"
            v-for="(item, index) in thirdCategoryArr"
            :key="index"
            class="category_item"
            @click="thirdCategoryClick(index)"
          >
            <span
              :style="{
                color: index === thirdActiveIndex ? '#0065FF' : '#535050'
              }"
            >
              {{ item.name }}
            </span>
          </view>
        </view>
      </scroll-view>
      <view class="chevron_view" @click="chevronViewClick">
        <image
          style="width: 16px; height: 16px;"
          :src="
            isShowCategoryPop
              ? '/static/ic_chevron_up.png'
              : '/static/ic_chevron_down.png'
          "
        />
      </view>
    </view>
    <!-- 排序栏 -->
    <view class="filter_out_wrapper" :style="filterWrapperStyle">
      <!-- <view class="filter_out_wrapper"> -->
      <view class="filter_wrapper">
        <p>{{ currentCategoryStr }}</p>
        <view class="sort_filter">
          <p
            :style="{ color: sortIndex === 0 ? '#0065FF' : '#535050' }"
            @click="sortFilterClick(0)"
          >
            综合
          </p>
          <view
            class="priceSortWrapper"
            @click="sortFilterClick(sortIndex === 1 ? 2 : 1)"
          >
            <p :style="{ color: sortIndex != 0 ? '#0065FF' : '#535050' }">
              价格
            </p>
            <image style="width: 8px; height: 8px;" :src="sortImg" />
          </view>
        </view>
      </view>
    </view>

    <!-- 展示所有的三级分类 -->
    <view v-if="isShowCategoryPop" class="popCategoryWrapper" @click="closePop">
      <view class="popCategoryView">
        <view class="pop_items">
          <view
            v-for="(item, index) in thirdCategoryArr"
            :key="index"
            class="pop_item nowrap"
            @click="popItemClick(index)"
          >
            <span
              :style="{
                color: index === thirdActiveIndex ? '#0065FF' : '#535050'
              }"
            >
              {{ item.name }}
            </span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'hd-category',
  props: {},
  data() {
    return {
      firstCategoryArr: [], // 一级分类列表
      secondCategoryArr: [], // 二级分类列表
      thirdCategoryArr: [], // 三级分类列表
      sortFilterArr: [], // 排序条件数组
      firstActiveIndex: 0, // 一级分类选中的index
      secondActiveIndex: 0, // 二级分类选中的index
      thirdActiveIndex: 0, // 三级分类选中的index
      sortIndex: 0, // 标记排序的index，默认0为综合，1为价格升序，2为价格降序
      isShowCategoryPop: false, // 标记是否显示了分类弹层，用来处理小箭头图标切换
      isShowSortPop: false, // 标记是否显示了排序弹层，用来处理小箭头图标切换
      currentCategoryId: '', // 一二三级用来查询商品的分类id
      currentCategoryStr: '', // 筛选栏显示的分类名称，只有一级就显示一级

      // showTips = true;

      // emptyImg: string = config.ossBaseUrl + 'empty_img_search.png',

      // scrollSize: number = 0,
      // toView = 'red',
      // categorymodel: any,
      // navList: any[] = [], // 一级分类列表
      // categoryList: any[] = [], // 二级分类

      // skuList: PlatformShopSku[] = [],

      // brandList: any[] = [], // 品牌列表
      // currentItem: any, // 当前选中的 type
      // // fixme
      // emptyIcon = require('static/img/img_jingyutou.png'),
      // emptyViewShow: boolean = false,
      // currentFilter: any, // 记录当前查询条件

      // page: number = 0,
      // total: number = 0, // 数据总数

      isCardStyle: false, /// 标记是否展示卡片
      styleImg: '/static/ic_template_line.png' /// 样式图片
    }
  },
  computed: {
    // 价格排序图标
    sortImg() {
      if (this.sortIndex === 0) {
        return '/static/ic_paixu_normal.png'
      } else if (this.sortIndex === 1) {
        return '/static/ic_paixu_shengxu.png'
      } else {
        return '/static/ic_paixu_jiangxu.png'
      }
    },

    // 计算排序栏的style
    filterWrapperStyle() {
      if (this.thirdCategoryArr.length > 0) {
        return 'top: 148.5px;'
      } else {
        return 'top: 108px;'
      }
    }
  },

  created() {
    this.getRootCategoty()
  },

  methods: {
    // 获取一级分类
    getRootCategoty() {
      this.firstCategoryArr = [
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '01',
          code: '01',
          name: '水果',
          upperId: '-',
          path: '/01',
          sort: 25,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0101',
              code: '0101',
              name: '果切',
              upperId: '01',
              path: '/01/0101',
              sort: 11,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '6e37599c0779432c8498110fe4dce404',
              code: 'c7ae500673904a008bded0db02a824f9',
              name: '03',
              upperId: '01',
              path: '/01/c7ae500673904a008bded0db02a824f9',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'f997a72ca2ae4dbe83d6de776f5ae41d',
              code: '83cc1eff722e49f3abe8f34eeed32843',
              name: '04',
              upperId: '01',
              path: '/01/83cc1eff722e49f3abe8f34eeed32843',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '776bf820659f49e3bb170bbbfb474c9f',
              code: 'ea192c58a7cc447e875b9b453899afe9',
              name: '05',
              upperId: '01',
              path: '/01/ea192c58a7cc447e875b9b453899afe9',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'e0e41880b8cf4252b0ffd01cd523fb25',
              code: '05049eb5c704413c9716686ef24c664a',
              name: '06',
              upperId: '01',
              path: '/01/05049eb5c704413c9716686ef24c664a',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '903f1ce196aa409cbf1854d2cf41fa54',
              code: '4141ddeeba0546df8f89aca948af9bab',
              name: '07',
              upperId: '01',
              path: '/01/4141ddeeba0546df8f89aca948af9bab',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '968e10528dea411b99656351a7ac263e',
              code: 'c1d3ced88271484191cf7c6bdde63356',
              name: '08',
              upperId: '01',
              path: '/01/c1d3ced88271484191cf7c6bdde63356',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '07f882aaaa6442babdcd112419c2fae4',
              code: 'e030d2619f114d3f90cbb42dff15d50d',
              name: '09',
              upperId: '01',
              path: '/01/e030d2619f114d3f90cbb42dff15d50d',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '8826ccda30644932b9b9c1f3063cbb36',
              code: '8f1cc39c96ba4505952ad20f174dcdb8',
              name: '10',
              upperId: '01',
              path: '/01/8f1cc39c96ba4505952ad20f174dcdb8',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '09123a51419d47068078a39e25302d5e',
              code: '904d710734e94615a66a88384802f4a5',
              name: '11',
              upperId: '01',
              path: '/01/904d710734e94615a66a88384802f4a5',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'c2fbe638dfcc4c3ab4ad07641e1e578b',
              code: 'd1236bcc400b4bdfbdec737d58cd0c23',
              name: '12',
              upperId: '01',
              path: '/01/d1236bcc400b4bdfbdec737d58cd0c23',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0e789ba246164575943f08bdd89e75be',
              code: '309962bce7cc4b6eba98af05d4b385e1',
              name: '13',
              upperId: '01',
              path: '/01/309962bce7cc4b6eba98af05d4b385e1',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '76704f81b47642c5a04b3e865277ca4b',
              code: 'cdda176d4f8443c5be74a7552c749a8a',
              name: '14',
              upperId: '01',
              path: '/01/cdda176d4f8443c5be74a7552c749a8a',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'e09ed08e895b4cb2922906028194d64f',
              code: '6f47037896a445aa9af909913b8073c1',
              name: '15',
              upperId: '01',
              path: '/01/6f47037896a445aa9af909913b8073c1',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'd27961229b104a0182af632ef691015f',
              code: '0ed18167f89d438d9478f72ceacc68d5',
              name: '16',
              upperId: '01',
              path: '/01/0ed18167f89d438d9478f72ceacc68d5',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '8a9be197c10b4ccdbefc3638c31d14d9',
              code: '3a11edb30ef2495a8c59ee968635d7d1',
              name: '17',
              upperId: '01',
              path: '/01/3a11edb30ef2495a8c59ee968635d7d1',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '1302bb219d2e4051af56212f18204efc',
              code: 'f786733f4f46461e9afb91f8de57996b',
              name: '18',
              upperId: '01',
              path: '/01/f786733f4f46461e9afb91f8de57996b',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'cf625b3056de4b82a81cacdd6882556a',
              code: '13ee2209600b430fa59715c71e11d746',
              name: '19',
              upperId: '01',
              path: '/01/13ee2209600b430fa59715c71e11d746',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0cbe2ef4a7184c79b852fd13ec5dc809',
              code: 'f3321f30d4b145c7af6c5fb3846c6f6e',
              name: '20',
              upperId: '01',
              path: '/01/f3321f30d4b145c7af6c5fb3846c6f6e',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '1bb0ef8bd34c482d846088f549aa9de2',
              code: 'af7bcb1d0272466887e4bc23a88cc2cd',
              name: '121212',
              upperId: '01',
              path: '/01/af7bcb1d0272466887e4bc23a88cc2cd',
              sort: 0,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '02',
          code: '02',
          name: '电器',
          upperId: '-',
          path: '/02',
          sort: 27,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0201',
              code: '0201',
              name: '小家电',
              upperId: '02',
              path: '/02/0201',
              sort: 1,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0202',
              code: '0202',
              name: '厨电',
              upperId: '02',
              path: '/02/0202',
              sort: 2,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'e9ea660a3c1746b9837fd31f2486befc',
              code: '47b96fb1716443a39248983b44d2650b',
              name: '好的',
              upperId: '02',
              path: '/02/47b96fb1716443a39248983b44d2650b',
              sort: 3,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '03',
          code: '03',
          name: '服饰',
          upperId: '-',
          path: '/03',
          sort: 3,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0301',
              code: '0301',
              name: '裤子',
              upperId: '03',
              path: '/03/0301',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'f23e4980d63c4cb6a7c279b7a4e1eea5',
              code: '9ef637123afb4e6d95a27eb63b3322c8',
              name: 'test222',
              upperId: '03',
              path: '/03/9ef637123afb4e6d95a27eb63b3322c8',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'aa30fbae4b7a4688928821b9398fc4cb',
              code: 'e2c0a4b3431d41bc96d6ef677378c3da',
              name: 'sort=3',
              upperId: '03',
              path: '/03/e2c0a4b3431d41bc96d6ef677378c3da',
              sort: 3,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: 'c8292fdb4a214963946b23cc7d3bdebe',
          code: 'bc380c9375c347dca58fcda89ca33ac8',
          name: '联调1',
          upperId: '-',
          path: '/bc380c9375c347dca58fcda89ca33ac8',
          sort: 18,
          children: []
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: 'f9651b09e88746bfada280e15b3bcd28',
          code: 'e62d0a1cb37f4d4c9a38db9fd45fd780',
          name: '标准3三级',
          upperId: '-',
          path: '/e62d0a1cb37f4d4c9a38db9fd45fd780',
          sort: 23,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '1af8a4fd47c74e44917723bb7b021379',
              code: '9cdfe828f2f54c3aa081667857aee689',
              name: '标准3-生鲜',
              upperId: 'f9651b09e88746bfada280e15b3bcd28',
              path:
                '/e62d0a1cb37f4d4c9a38db9fd45fd780/9cdfe828f2f54c3aa081667857aee689',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'a9fbb7fb489b4b7995902c6fbe1c2618',
              code: '838b2faeaac3499da7de8653f1c271fc',
              name: '标准3-水果',
              upperId: 'f9651b09e88746bfada280e15b3bcd28',
              path:
                '/e62d0a1cb37f4d4c9a38db9fd45fd780/838b2faeaac3499da7de8653f1c271fc',
              sort: 0,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: 'beb38a515e3a42e1936f10a436cc28e4',
          code: 'dcde122ed6814f3cace760df0c680f97',
          name: '2号测试',
          upperId: '-',
          path: '/dcde122ed6814f3cace760df0c680f97',
          sort: 2,
          children: []
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: 'c6f63c7c7f084f0ab8052f80f5571452',
          code: 'f0b5463498aa457d9be437d6cdcb52ed',
          name: '一级类目',
          upperId: '-',
          path: '/f0b5463498aa457d9be437d6cdcb52ed',
          sort: 8,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '27e6812ed3a441199bb0f19b4575937f',
              code: '990ddb96246e4533a6b80b8f74f7fa74',
              name: '二级类目',
              upperId: 'c6f63c7c7f084f0ab8052f80f5571452',
              path:
                '/f0b5463498aa457d9be437d6cdcb52ed/990ddb96246e4533a6b80b8f74f7fa74',
              sort: 0,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '8398912d683f4649821ec76588c77532',
          code: '1d680ddc0476462a964e92618793c43b',
          name: 'A1',
          upperId: '-',
          path: '/1d680ddc0476462a964e92618793c43b',
          sort: 4,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'cbbea3d7c3a3401e9165332ff9cb4f48',
              code: 'fee081c559a1441c84a47c48c56686f4',
              name: 'A11',
              upperId: '8398912d683f4649821ec76588c77532',
              path:
                '/1d680ddc0476462a964e92618793c43b/fee081c559a1441c84a47c48c56686f4',
              sort: 1,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '33a8a82b0f3b417898b4246cd1d79567',
              code: '9442944aaaa849a0be2078befbb8871f',
              name: 'A12',
              upperId: '8398912d683f4649821ec76588c77532',
              path:
                '/1d680ddc0476462a964e92618793c43b/9442944aaaa849a0be2078befbb8871f',
              sort: 2,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'f55bc3819ec14fc599a8dd4c304112cc',
              code: '8fae0411006241a989e490d983a49aa2',
              name: 'A13',
              upperId: '8398912d683f4649821ec76588c77532',
              path:
                '/1d680ddc0476462a964e92618793c43b/8fae0411006241a989e490d983a49aa2',
              sort: 3,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'd91357ef3570477587ea16cda2995d50',
              code: '554ca92ed1fd40a088d2cacf09dba38e',
              name: 'A14',
              upperId: '8398912d683f4649821ec76588c77532',
              path:
                '/1d680ddc0476462a964e92618793c43b/554ca92ed1fd40a088d2cacf09dba38e',
              sort: 5,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'f255e47ae7dc4dcb9bf0231644900dca',
              code: 'c91a8246cf914af19161931ee9fe5b2c',
              name: 'A15',
              upperId: '8398912d683f4649821ec76588c77532',
              path:
                '/1d680ddc0476462a964e92618793c43b/c91a8246cf914af19161931ee9fe5b2c',
              sort: 4,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '986a1a1791654c5d8f9dd31126638c57',
          code: 'eae3f192fa074b869aa832c84088b5a1',
          name: '食物',
          upperId: '-',
          path: '/eae3f192fa074b869aa832c84088b5a1',
          sort: 7,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '275c3b3af6ad4d59987000a82bd9282c',
              code: 'aa476a89ff9c4ec7b46dc113867bae1e',
              name: '蔬菜',
              upperId: '986a1a1791654c5d8f9dd31126638c57',
              path:
                '/eae3f192fa074b869aa832c84088b5a1/aa476a89ff9c4ec7b46dc113867bae1e',
              sort: 1,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '1b61afba647c47169003194a8828b5c5',
          code: '26d78546218141fa8c07cf7226ce8888',
          name: '测试1',
          upperId: '-',
          path: '/26d78546218141fa8c07cf7226ce8888',
          sort: 26,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'e5cba08b9b9d4444bfb3dd9132c1a5cf',
              code: 'f193ccc2019d47c38fd4ee4d92f6543c',
              name: '测试11',
              upperId: '1b61afba647c47169003194a8828b5c5',
              path:
                '/26d78546218141fa8c07cf7226ce8888/f193ccc2019d47c38fd4ee4d92f6543c',
              sort: 1,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'f0a390f6bf5d478e859d2a2ba0bd9126',
              code: '0ffeb13425e44c8a8cb9e8dbfac6dc7f',
              name: '测试112',
              upperId: '1b61afba647c47169003194a8828b5c5',
              path:
                '/26d78546218141fa8c07cf7226ce8888/0ffeb13425e44c8a8cb9e8dbfac6dc7f',
              sort: 2,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '0791448f9ded4618a9ae89a45f169635',
          code: '620c913383bb49428eb34dc7bf989a2e',
          name: '测试2',
          upperId: '-',
          path: '/620c913383bb49428eb34dc7bf989a2e',
          sort: 9,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'dcee1e2d6aea4472b65258d4a5234108',
              code: '7159c8f9bf944635a7b786c3401bd038',
              name: '测试22',
              upperId: '0791448f9ded4618a9ae89a45f169635',
              path:
                '/620c913383bb49428eb34dc7bf989a2e/7159c8f9bf944635a7b786c3401bd038',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '9c2e5064376543ed94086ab8dfd35a67',
              code: '66578dfb6fba4977bac7f030e9d2f91c',
              name: '测试23',
              upperId: '0791448f9ded4618a9ae89a45f169635',
              path:
                '/620c913383bb49428eb34dc7bf989a2e/66578dfb6fba4977bac7f030e9d2f91c',
              sort: 0,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: 'd58d9be43d2a4434933e7855999a6224',
          code: '64cc5d4f2dd0462bb80a721617ff347d',
          name: '颜色',
          upperId: '-',
          path: '/64cc5d4f2dd0462bb80a721617ff347d',
          sort: 13,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '75602aee6ea04c9a99b5a9dd55ccb01b',
              code: '96714d13ed3b467887105631b54923e4',
              name: '暖色',
              upperId: 'd58d9be43d2a4434933e7855999a6224',
              path:
                '/64cc5d4f2dd0462bb80a721617ff347d/96714d13ed3b467887105631b54923e4',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '1fb006a8d3364e67b7ae8bde79177d15',
              code: '6eebcd41fd6640d79ddf1a37cd450e6c',
              name: '冷色',
              upperId: 'd58d9be43d2a4434933e7855999a6224',
              path:
                '/64cc5d4f2dd0462bb80a721617ff347d/6eebcd41fd6640d79ddf1a37cd450e6c',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '6823cfb399f04ebcb5aeca68414a827f',
              code: 'd62ce6f0f138408fba1932cb57729fef',
              name: '过渡色',
              upperId: 'd58d9be43d2a4434933e7855999a6224',
              path:
                '/64cc5d4f2dd0462bb80a721617ff347d/d62ce6f0f138408fba1932cb57729fef',
              sort: 0,
              children: []
            }
          ]
        }
      ]

      // 默认选中第1个一级分类
      this.handleFirstClick(0)
    },

    // 点击一级分类
    handleFirstClick(index) {
      console.log('111', index, this.firstCategoryArr[index].name)
      this.firstActiveIndex = index
      // 重置数据
      this.secondCategoryArr = []
      this.thirdCategoryArr = []

      // 判断是否还有下级分类，如果没有则直接获取商品
      if (this.firstCategoryArr[index].children.length === 0) {
        this.currentCategoryId = this.firstCategoryArr[index].id || ''
        this.currentCategoryStr = this.firstCategoryArr[index].name || ''
        this.page = 0
        this.getSkuList()
        return
      }

      this.secondCategoryArr = [
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '0101',
          code: '0101',
          name: '果切',
          upperId: '01',
          path: '/01/0101',
          sort: 11,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '010101',
              code: '010101',
              name: '新鲜果切',
              upperId: '0101',
              path: '/01/0101/010101',
              sort: 11,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'c48e239eeb00434091cdbb1f9980f6bf',
              code: '56bf94fd9c8d461a95d96889ba53f4e3',
              name: '水果拼盘',
              upperId: '0101',
              path: '/01/0101/56bf94fd9c8d461a95d96889ba53f4e3',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'b1bed7e9897945b78938a50cfd28287b',
              code: '7ddc4e23abed44089c09c35990c06888',
              name: 'test',
              upperId: '0101',
              path: '/01/0101/7ddc4e23abed44089c09c35990c06888',
              sort: 0,
              children: []
            }
          ]
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '6e37599c0779432c8498110fe4dce404',
          code: 'c7ae500673904a008bded0db02a824f9',
          name: '03',
          upperId: '01',
          path: '/01/c7ae500673904a008bded0db02a824f9',
          sort: 0,
          children: [
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '6805db496fd2400aa36e0763e1339266',
              code: 'ac9cf2270e47475996968e9ae0aa58e6',
              name: 's1',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/ac9cf2270e47475996968e9ae0aa58e6',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '1b76d571d5c9470abccd68fb3c6aa37f',
              code: '21802f97b8834f229db8c0cd15aa5328',
              name: 's2',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/21802f97b8834f229db8c0cd15aa5328',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '58ffca0eb1f94915add128c19b3d1dd8',
              code: '09e0d2509e4a4ad9b0ee28fff1588c1e',
              name: 'ss3',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/09e0d2509e4a4ad9b0ee28fff1588c1e',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '306d66f6a7e74e598b2d9d35a610e46f',
              code: '8ff524110f2545a98d50bf4b61fd57fd',
              name: 's4',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/8ff524110f2545a98d50bf4b61fd57fd',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '6247a4131b434367861e7f2bc0414bb5',
              code: '0cbc49c35fc24e1395b0777f73e933dc',
              name: 's5',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/0cbc49c35fc24e1395b0777f73e933dc',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '93f4f97526824b7b8cd3d93674ff7e2b',
              code: '23db74c3267b4c89a3966560f245094f',
              name: 's6',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/23db74c3267b4c89a3966560f245094f',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'f8229adc19a34ccda7b785cb6b08d45f',
              code: '3c49e4363f6b46f6843ac13df7020f0c',
              name: 's7',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/3c49e4363f6b46f6843ac13df7020f0c',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'ef322fe7f36b4ed7b8655cfad81f4c50',
              code: '9459dba5ad42469abae350ae3bcf8d40',
              name: 's8',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/9459dba5ad42469abae350ae3bcf8d40',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'bc528ac96271464ab666c91eb5894a5e',
              code: '842e768ce19c4c2f819acd321ab00c3a',
              name: 's9',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/842e768ce19c4c2f819acd321ab00c3a',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'c41466dc6343454e9861b4288718c9f4',
              code: 'de1c3df1bd7046c88663d97288adc696',
              name: 's10',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/de1c3df1bd7046c88663d97288adc696',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '0c304a9458e745628ac345085a49b386',
              code: '5f3f12f03cb54568ad3994a8b8698446',
              name: 's11',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/5f3f12f03cb54568ad3994a8b8698446',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'fc836b4b930e4777b642107f16591d86',
              code: '68695d7e207749ed9373adc785d516ca',
              name: 's12',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/68695d7e207749ed9373adc785d516ca',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '06dd5e034bb6473b96270e2a28a66839',
              code: 'fcd8c788408e4ac78652902333f8d9f6',
              name: 's13',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/fcd8c788408e4ac78652902333f8d9f6',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '3a7965445ba44b04a3055d87a04e2469',
              code: '836b894d85a14f01a48bc0bc5dacefdb',
              name: 's14',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/836b894d85a14f01a48bc0bc5dacefdb',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'fe4a991784414ed1a5d169dea18ff7d4',
              code: '02a799563b564f598959fe29c475a843',
              name: 's15',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/02a799563b564f598959fe29c475a843',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: 'd4127bce29404c928cb15e3dd0506690',
              code: '333df9121187423891bdade83b3a0cc8',
              name: 'eee',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/333df9121187423891bdade83b3a0cc8',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '7a1174c6c23649409ebfba44a2ab5e30',
              code: '3956271d90054b6ba058e04d829c2adc',
              name: 'eeee',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/3956271d90054b6ba058e04d829c2adc',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '8fc6b5b56d2740469f0fbd7495759d86',
              code: 'ff1c2c5fa6ce4ef6b22acfc5edd9d064',
              name: 'eeeee',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/ff1c2c5fa6ce4ef6b22acfc5edd9d064',
              sort: 0,
              children: []
            },
            {
              platformId: 'jingxuan',
              shopId: '106063',
              id: '9a2759447579434ca54d0c6e62520404',
              code: 'dda126a0ed544f2ea34baf4f68595c0d',
              name: 'eeeeee',
              upperId: '6e37599c0779432c8498110fe4dce404',
              path:
                '/01/c7ae500673904a008bded0db02a824f9/dda126a0ed544f2ea34baf4f68595c0d',
              sort: 0,
              children: []
            }
          ]
        }
      ]
      // 默认选中第1个二级分类
      this.handleSecondClick(0)

      // let body = new PlatformShopCategoryFilter()
      // body.upperEq = this.firstCategoryArr[index].id
      // // 查询二级分类api
      // // uni.showLoading();
      // ProductApi.queryCategory(body)
      //   .then((res) => {
      //     // uni.hideLoading();
      //     // console.log(res);
      //     this.secondCategoryArr = res

      //     if (store.state.categoryIds.length > 1) {
      //       let tempIndex = this.secondCategoryArr.findIndex((item) => {
      //         return item.code == store.state.categoryIds[1] || item.id == store.state.categoryIds[1]
      //       })
      //       if (tempIndex != -1) {
      //         // 选中传值的分类
      //         this.handleSecondClick(tempIndex)
      //         // 如果只有二级分类，选完后重置数据
      //         if (store.state.categoryIds.length === 2) {
      //           store.commit('setCategoryIds', [])
      //         }
      //         return
      //       } else {
      //         store.commit('setCategoryIds', [])
      //       }
      //     }
      //     // 默认选中第1个二级分类
      //     this.handleSecondClick(0)
      //   })
      //   .catch((error) => {
      //     // 重置数据
      //     this.secondCategoryArr = []
      //     this.thirdCategoryArr = []
      //     uni.showToast({
      //       title: error.message,
      //       icon: 'none'
      //     })
      //   })
    },

    // 点击二级分类
    handleSecondClick(index) {
      console.log('222', index, this.secondCategoryArr[index].name)
      this.secondActiveIndex = index
      // 重置数据
      this.thirdCategoryArr = []

      // 判断是否还有下级分类，如果没有则直接获取商品
      if (this.secondCategoryArr[index].children.length === 0) {
        this.currentCategoryId = this.secondCategoryArr[index].id || ''
        this.currentCategoryStr = this.secondCategoryArr[index].name || ''
        this.page = 0
        this.getSkuList()
        return
      }

      this.thirdCategoryArr = [
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: '010101',
          code: '010101',
          name: '新鲜果切',
          upperId: '0101',
          path: '/01/0101/010101',
          sort: 11,
          children: []
        },
        {
          platformId: 'jingxuan',
          shopId: '106063',
          id: 'b1bed7e9897945b78938a50cfd28287b',
          code: '7ddc4e23abed44089c09c35990c06888',
          name: 'test',
          upperId: '0101',
          path: '/01/0101/7ddc4e23abed44089c09c35990c06888',
          sort: 0,
          children: []
        }
      ]

      // 默认选中第1个三级分类
      this.popCategoryCellClick(0)

      // let body = new PlatformShopCategoryFilter()
      // body.upperEq = this.secondCategoryArr[index].id
      // // 查询三级分类api
      // uni.showLoading()
      // ProductApi.queryCategory(body)
      //   .then((res) => {
      //     uni.hideLoading()
      //     // console.log(res);
      //     // 三级分类增加'全部'栏
      //     var allModel = new PlatformShopCategory()
      //     allModel.id = this.secondCategoryArr[index].id
      //     allModel.name = '全部'
      //     // 重置数据
      //     this.thirdCategoryArr = []
      //     this.thirdCategoryArr.push(allModel)
      //     this.thirdCategoryArr = this.thirdCategoryArr.concat(res)

      //     if (store.state.categoryIds.length > 2) {
      //       let tempIndex = this.thirdCategoryArr.findIndex((item) => {
      //         return item.code == store.state.categoryIds[2] || item.id == store.state.categoryIds[2]
      //       })
      //       if (tempIndex != -1) {
      //         // 选中传值的分类
      //         this.popCategoryCellClick(tempIndex)
      //         // 如果有三级分类，选完后重置数据
      //         if (store.state.categoryIds.length === 3) {
      //           store.commit('setCategoryIds', [])
      //         }
      //         return
      //       } else {
      //         store.commit('setCategoryIds', [])
      //       }
      //     }
      //     // //每次点击二级分类都显示
      //     // this.showTips = true
      //     // setTimeout(() => {
      //     // this.showTips = false;
      //     // }, 3000)
      //     // 默认选中第1个三级分类
      //     this.popCategoryCellClick(0)
      //   })
      //   .catch((error) => {
      //     // 重置数据
      //     this.thirdCategoryArr = []
      //     uni.showToast({
      //       title: error.message,
      //       icon: 'none'
      //     })
      //   })
    },

    // 点击三级分类栏
    thirdCategoryClick(index) {
      console.log('33', index, this.thirdCategoryArr[index].name)
      this.thirdActiveIndex = index
      this.currentCategoryId = this.thirdCategoryArr[index].id || ''
      this.currentCategoryStr = this.thirdCategoryArr[index].name || ''

      this.page = 0
      // 获取商品列表数据
      this.getSkuList()
    },

    // 三级分类popCell点击事件
    popCategoryCellClick(index) {
      console.log('3333', index, this.thirdCategoryArr[index].name)
      this.thirdActiveIndex = index
      this.currentCategoryId = this.thirdCategoryArr[index].id || ''
      this.currentCategoryStr = this.thirdCategoryArr[index].name || ''

      this.thirdCategoryArr.forEach(item => {
        item.isChosen = false
      })
      this.thirdCategoryArr[index].isChosen = true

      this.page = 0
      // 获取商品列表数据
      this.getSkuList()
    },

    // 获取商品列表数据
    getSkuList() {
      console.log('getSkuList')
    },

    gotoSearch() {
      console.log('click')
      // // 跳转到商品搜索界面
      // uni.navigateTo({
      //   url: '/pagesService/sku/skuSearch/index'
      // })
      // LogMgr.categorySearchClick()
    },

    // 点击切换展示样式
    switchStyleClick() {
      console.log('click')
      this.isCardStyle = !this.isCardStyle
      this.styleImg = this.isCardStyle
        ? '/static/ic_template_card.png'
        : '/static/ic_template_line.png'
    },

    // 点击分类的下拉箭头
    chevronViewClick() {
      this.isShowCategoryPop = !this.isShowCategoryPop
    },

    // 关闭三级分类弹层
    closePop() {
      this.isShowCategoryPop = false
    },

    // 三级分类弹层，点击事件
    popItemClick(index) {
      console.log('333', index, this.thirdCategoryArr[index].name)
      this.thirdActiveIndex = index
      this.currentCategoryId = this.thirdCategoryArr[index].id || ''
      this.currentCategoryStr = this.thirdCategoryArr[index].name || ''

      this.page = 0
      // 获取商品列表数据
      this.getSkuList()
    },

    // 点击综合或价格排序
    sortFilterClick(index) {
      console.log('排序', index)
      if (index === this.sortIndex) {
        return
      }
      this.sortIndex = index
      this.page = 0
      // 获取商品列表数据
      this.getSkuList()
    }
  }
}
</script>

<style scoped>
page {
  overflow-y: auto !important;
  background: white;
}

.category_wrapper {
  background: white;
}

.category_wrapper .bgView {
  width: 100%;
  height: 100%;
}

.category_wrapper .searchBarWrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 44px;
  padding-right: 12px;
  /* 解决钉钉背景颜色不对的问题 */
  background: white;
  position: fixed;
  top: 64px;
  left: 0;
  width: calc(100vw - 8px);
  z-index: 1000;
}

.category_wrapper .searchBarWrapper .right-wrapper {
  background: #f7f8fa;
  height: 32px;
  border-radius: 18px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.category_wrapper .searchBarWrapper .right-wrapper text {
  color: #ccc;
  font-size: 14px;
  margin-left: 4px;
}

.category_wrapper .left_view {
  background: #f6f6f6;
  height: calc(100vh - 108px);
  width: 24vw;
  overflow: scroll;
  position: fixed;
  top: 108px;
  left: 0;
}

.category_wrapper .right_view {
  width: 76vw;
  /* margin-left: -1px; */
  overflow: scroll;
  position: relative;
  margin-top: 192px;
  margin-left: 24vw;
}

.category_wrapper .left_item_wrapper {
  background: #f7f8fa;
}

.category_wrapper .left_item_selected_wrapper {
  /* 解决阴影被遮挡的问题 */
  padding: 4px 4px 4px 0;
}

.category_wrapper .white_selected_wrapper {
  background: white;
  border-radius: 0 8px 8px 0;
  box-shadow: 1.5px 1.5px 4px 0px rgba(33, 34, 36, 0.1);
  padding: 4px 0;
}

.category_wrapper .left_item_first {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 24vw; */
  height: 48px;
  text-align: center;
  background: #f7f8fa;
  /* 给文字框也加上圆角 */
  border-radius: 0 8px 8px 0;
}

.category_wrapper .span {
  line-height: 48px;
  /* width: 24vw; */
  height: 48px;
  padding: 0 6px 0 6px;
  color: #535050;
  font-size: 14px;
}

.category_wrapper .left_selected_line {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 0 12px;
}

.category_wrapper .left_item_first_selected {
  background: white;
  color: #212224;
  font-weight: 500;
}

.category_wrapper .left_item_second {
  background: white;
  color: #535050;
  font-size: 12px;
  text-align: center;
  line-height: 48px;
  /* width: 24vw; */
  height: 48px;
  /* 给文字框也加上圆角 */
  border-radius: 0 8px 8px 0;
}

.category_wrapper .left_item_second_selected {
  color: #0065ff;
  font-size: 12px;
  font-weight: 500;
}

.category_wrapper .right_list_view {
  overflow: scroll;
}

.category_wrapper .category_scroll_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  background: white;
  border-bottom: 0.5px solid #e3e4e8;
  line-height: 40px;
  height: 40px;
  width: 76vw;
  position: fixed;
  top: 108px;
  left: 24vw;
  z-index: 1000;
}
.category_wrapper .category_scrollview {
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: white;
  line-height: 40px;
  height: 40px;
  width: calc(100% - 52px);
  /* 解决自动定位选中view后的显示问题 */
  padding-left: 12px;
}
.category_wrapper .category_items {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  /* 边距应为12，这里让22-10即可 */
  margin-left: -10px;
}
.category_wrapper .category_item {
  color: #535050;
  font-size: 12px;
  margin-left: 22px;
}
.category_wrapper .chevron_view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

/* 排序栏 */
.category_wrapper .filter_out_wrapper {
  background: white;
  width: 76vw;
  height: 44px;
  position: fixed;
  top: 148.5px;
  left: 24vw;
  z-index: 1000;
}
.category_wrapper .filter_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  color: #a8a8b6;
  font-size: 12px;
  border-bottom: 0.5px solid #f6f6f8;
  height: 43.5px;
  width: calc(76vw - 12px);
  margin-left: 12px;
}

.category_wrapper .sort_filter {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #535050;
  font-size: 12px;
  margin-right: 12px;
}
.category_wrapper .priceSortWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}

.category_wrapper .popCategoryWrapper {
  background: clear;
  width: 76vw;
  height: calc(100vh - 84.5px);
  position: fixed;
  top: 148.5px;
  left: 24vw;
  z-index: 10000;
}
.category_wrapper .popCategoryView {
  background: white;
  box-shadow: 0 4px 15px 0 rgba(33, 34, 36, 0.2);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.category_wrapper .card_right_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
}

/* pop弹层的样式 */
.category_wrapper .pop_wrapper {
  background: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 76vw;
  margin-top: 147px;
  margin-left: 24vw;
}

.category_wrapper .pop_items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 12px 10px 4px;
}
.category_wrapper .pop_item {
  background: #f6f6f8;
  color: #535050;
  font-size: 12px;
  text-align: center;
  border-radius: 2px;
  line-height: 28px;
  width: calc((76vw - 40px) / 3);
  height: 28px;
  margin-top: 8px;
  margin-left: 8px;
}
</style>
