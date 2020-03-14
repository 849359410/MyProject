module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/recommended", "@vue/prettier"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "vue/no-v-html": "off",
		"vue/component-name-in-template-casing": "off",
		"prettier/prettier": [
			"error",
			{
				printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为80
				tabWidth: 4, // 一个tab代表几个空格数，默认为80
				useTabs: true, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
				singleQuote: true, // 字符串是否使用单引号
				semi: true, // 行位是否使用分号，默认为true
				trailingComma: "none", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
				"bracketSpacing": true // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
				// "parser": "babylon" // 代码的解析引擎，默认为babylon，与babel相同。
			}
		]
	},
	parserOptions: {
		parser: "babel-eslint"
	}
};
