module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    uni: true,
    weex: true,
    getCurrentPages: true,
    __wxConfig: true,
    wx: true,
    dd: true,
    plus: true,
    my: true
  },
  extends: ['plugin:vue/strongly-recommended', '@vue/standard'],
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  // https://cn.eslint.org/docs/rules/
  rules: {
    plugins: ['prettier', 'typescript'],
    rules: {
      'prettier/prettier': 'error'
    },
    camelcase: 0,
    'space-before-function-paren': 0, // 强制在 function的左括号之前使用一致的空格
    'prefer-const': 0, // 要求使用 const 声明那些声明后不再被修改的变量
    'no-extra-boolean-cast': 0, // 禁止不必要的布尔转换,有时候 !!false 很有必要，所以在此禁止这个校验
    'vue/name-property-casing': 0, // 组件名倾向于单词而不是缩写
    'vue/max-attributes-per-line': 0, // 多个特性的元素应该分多行撰写
    'eol-last': 0, // 强制文件末尾至少保留一行空行
    'vue/html-self-closing': 0, // 如果组件里没有其他组件或内容，做单标签闭合就可以了
    'vue/prop-name-casing': 0, // 对于驼峰和横线命名的选择可以总体遵循
    'vue/multiline-html-element-content-newline': 0, //  在多行元素的内容之前和之后需要换行符
    'vue/attribute-hyphenation': 0, //传参使用驼峰命名
    'vue/singleline-html-element-content-newline': 0, // 在单行元素的内容前后需要换行符
    'vue/no-unused-components': 0,
    'vue/html-indent': 0,
    'vue/script-indent': ['error', 2, {}],
    'no-unused-vars': 0 // 先解决ts中无法识别import引入的类型问题
  },
  plugins: ['@typescript-eslint'], // 指定插件
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}

// prettier规则， 配置再prettierrc
// module.exports = {
//   // 一行最多 100 字符
//   printWidth: 100,
//   // 使用 4 个空格缩进
//   tabWidth: 4,
//   // 不使用缩进符，而使用空格
//   useTabs: false,
//   // 行尾需要有分号
//   semi: true,
//   // 使用单引号
//   singleQuote: true,
//   // 对象的 key 仅在必要时用引号
//   quoteProps: 'as-needed',
//   // jsx 不使用单引号，而使用双引号
//   jsxSingleQuote: false,
//   // 末尾不需要逗号
//   trailingComma: 'none',
//   // 大括号内的首尾需要空格
//   bracketSpacing: true,
//   // jsx 标签的反尖括号需要换行
//   jsxBracketSameLine: false,
//   // 箭头函数，只有一个参数的时候，也需要括号
//   arrowParens: 'always',
//   // 每个文件格式化的范围是文件的全部内容
//   rangeStart: 0,
//   rangeEnd: Infinity,
//   // 不需要写文件开头的 @prettier
//   requirePragma: false,
//   // 不需要自动在文件开头插入 @prettier
//   insertPragma: false,
//   // 使用默认的折行标准
//   proseWrap: 'preserve',
//   // 根据显示样式决定 html 要不要折行
//   htmlWhitespaceSensitivity: 'css',
//   // 换行符使用 lf
//   endOfLine: 'lf'
// };
