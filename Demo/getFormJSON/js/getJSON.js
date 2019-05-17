/*
	表单数据JSON序列化工具
	----------------------------------
	1.支持从表单中得到 input[text number]中取值
	2.支持select取值
	3.支持checkbox取值
	4.支持数组取值
	5.支持从表单中指定读取内容
*/



function getJsonFromForm(element, array) {

	var obj = {};
	var array = array || false;
	var _ = $(element);
	var childres = _.children();
	var childSize = childres.length;

	var getVal = function(tagN, _this) {

		switch (tagN) {
			case 'INPUT':
				var type = _this.type;
				if (type == 'text' || type === 'number') {
					value = _this.value;

				} 
				else if (type === 'checkbox') {
					value = _this.checked;
				}
				else if (type === 'submit') {
					name = 'SUBMIT_VALUE';
				}
				break;

			case 'SELECT':
			case 'TEXTAREA':
				value = _this.value;
				break;

			case 'DIV':

				name = _this.getAttribute('name');
				value = getJsonFromForm(_this);

		}


		if (name !== 'SUBMIT_VALUE') {

			// 追加数据 
			if (name in obj) {
				// 如果是数组
				if (obj[name].constructor == Array) {
					obj[name].push(value);
				} 
				else {
					_arr = obj[name];
					obj[name] = [_arr, value]
					
				}
			}
			// 首次添加
			else {
				obj[name] = value
			}


		}

	}

	for (var i = 0; i < childSize; i++) {
		var tagN = childres[i].tagName;
		var name = value ='';

		name = childres[i].name;

		if (array) {
			for (var x = 0; x < array.length; x++) {
				if (name === array[x]) {
					getVal(tagN, childres[i])
				};
			}
		} else {
			getVal(tagN, childres[i])
		}


	}

	return obj;

}