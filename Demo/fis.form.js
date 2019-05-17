/**
 * 表单数据JSON序列化工具
 *
 * @Author qifei3@asiainfo-linkage.com
 *
 */
(function() {
    if (!window.fis)
        fis = {};
})();
/**
 * 表单处理工具
 *
 * @namespace fis
 * @class form
 */
fis.form = {
	/**
	 * 显示当前对象名称路径。
	 *
	 * @method toString
	 * @return {String} 'fis.form'
	 */
	toString : function () {
		return 'fis.form';
	},
	/**
	 * 常用键盘码对象。
	 *
	 * @type {Object}
	 * @namespace fis.form
	 * @class keycode
	 */
	keycode : {
		/**
		 * 全屏F11(122)
		 *
		 * @type {Number}
		 * @property F11
		 */
		F11 : 122,
		/**
		 * 退出Esc(27)
		 *
		 * @type {Number}
		 * @property ESC
		 */
		ESC : 27,
		/**
		 * 回车Enter(13)
		 *
		 * @type {Number}
		 * @property ENTER
		 */
		ENTER : 13,
		/**
		 * 上一页Page Up(33)
		 *
		 * @type {Number}
		 * @property PAGEUP
		 */
		PAGEUP : 33,
		/**
		 * 下一页Page Down(34)
		 *
		 * @type {Number}
		 * @property PAGEDOWN
		 */
		PAGEDOWN : 34,
		/**
		 * 页尾end(35)
		 *
		 * @type {Number}
		 * @property END
		 */
		END : 35,
		/**
		 * 页首home(36)
		 *
		 * @type {Number}
		 * @property HOME
		 */
		HOME : 36,
		/**
		 * 左箭头left(37)
		 *
		 * @type {Number}
		 * @property LEFT
		 */
		LEFT : 37,
		/**
		 * 向上箭头up(38)
		 *
		 * @type {Number}
		 * @property UP
		 */
		UP : 38,
		/**
		 * 右前头(39)
		 *
		 * @type {Number}
		 * @property RIGHT
		 */
		RIGHT : 39,
		/**
		 * 向下箭头down(40)
		 *
		 * @type {Number}
		 * @property DOWN
		 */
		DOWN : 40
	},
	/**
	 * 绑定键盘事件到元素，当焦点在元素上并触发键盘事件时响应该函数。
	 *
	 * @method _bindKey
	 * @param {Number} fis.form.keycode 键盘码
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 */
	_bindKey : function (keycode, element, callback) {
		element.keydown(function (e) {
			if(e.keyCode == keycode) {
				if(typeof callback == 'function')
					callback(element, e);
			}
		});
	},
	/**
	 * 在element区域内响应Enter键盘事件。<br>
	 * 实际处理中应该将提交按键(type="submit")放在element区域外,避免重复提交。
	 *
	 * @method bindEnterKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindEnterKey : function (element, callback) {
		this._bindKey(this.keycode.ENTER, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Esc键盘事件。
	 *
	 * @method bindEscKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindEscKey : function (element, callback) {
		this._bindKey(this.keycode.ESC, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应F11键盘事件。
	 *
	 * @method bindF11Key
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindF11Key : function (element, callback) {
		this._bindKey(this.keycode.F11, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Page Down键盘事件。
	 *
	 * @method bindPageDownKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindPageDownKey : function (element, callback) {
		this._bindKey(this.keycode.PAGEDOWN, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Page Up键盘事件。
	 *
	 * @method bindPageUpKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindPageUpKey : function (element, callback) {
		this._bindKey(this.keycode.PAGEUP, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Left键盘事件。
	 *
	 * @method bindLeftKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindLeftKey : function (element, callback) {
		this._bindKey(this.keycode.LEFT, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Right键盘事件。
	 *
	 * @method bindRightKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindRightKey : function (element, callback) {
		this._bindKey(this.keycode.RIGHT, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Up键盘事件。
	 *
	 * @method bindUpKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindUpKey : function (element, callback) {
		this._bindKey(this.keycode.UP, element, callback);
		return this;
	},
	/**
	 * 在element区域内响应Down键盘事件。
	 *
	 * @method bindDownKey
	 * @param {Object} element 被绑定元素的jQuery对象
	 * @param {Function} callback 回调函数，参数为绑定的元素对象element和事件e
	 * @return {Object} fis.form
	 */
	bindDownKey : function (element, callback) {
		this._bindKey(this.keycode.DOWN, element, callback);
		return this;
	},
	/**
	 * 获取单选框值,如果有表单就在表单内查询,否则在全文查询
	 *
	 * @method getRadioValue
	 * @param {String}name radio名称
	 * @param {Object} frm [optional,default=document] jQuery表单（或其它容器对象）对象
	 * @return {Object} radio jQuery对象
	 */
	getRadioValue : function (name, frm) {
		if(frm && frm.find)
			return frm.find('input[name="' + name + '"]:checked').val();
		return $('input[name="' + name + '"]:checked').val();
	},
	/**
	 * 设置单选框值,如果有表单就在表单内查询,否则在全文查询。
	 *
	 * @method setRadioValue
	 * @param {String} name radio名称
	 * @param {String} value radio表单value值
	 * @param {Object} frm [optional,default=document] jQuery表单（或其它容器对象）对象
	 * @return {Object} radio jQuery对象
	 */
	setRadioValue : function (name, value, frm) {
		if(frm && frm.find)
			return frm
				.find('input[name="' + name + '"][value="' + value + '"]')
				.attr('checked', true);
		return $('input[name="' + name + '"][value="' + value + '"]').attr(
			'checked', true);
	},
	/**
	 * 设置select下拉框的值
	 *
	 * @method setRadioValue
	 * @param {String} selectId 下拉框id号
	 * @param {String/Number} value select表单value值
	 * @param {Object} frm [optional,default=document] jQuery表单（或其它容器对象）对象
	 * @return {Object} select jQuery对象
	 */
	setSelectValue : function (selectId, value, frm) {
		if(frm && frm.find)
			return frm.find('#' + selectId + ' option[value="' + value + '"]')
				.attr('selected', true);
		return $('#' + selectId + ' option[value="' + value + '"]').attr(
			'selected', true);
	},
	/**
	 * 将object转换为select的列表模式，key为option的value，值为option的文本。
	 *
	 * @method object2Options
	 * @param {Object}objects key-map对象
	 * @return {String} html
	 */
	object2Options : function (objects) {
		if(!$.isPlainObject(objects)) {
			return '';
		}
		var html = [];
		for (var i in objects) {
			html.push('<option value="' + i + '">' + objects[i] + '</option>');
		}
		return html.join('');
	},
	/**
	 * 禁用/启用输入控件。
	 *
	 * @method formDisable
	 * @param {Object} frmObj iQuery表单对象（或其它任何包装容器，如：div）
	 * @param {Boolean} disabled true-禁用;false-启用
	 * @return {Object} fis.form
	 */
	formDisable : function (frmObj, disabled) {
		frmObj.find('input,select,textarea').attr('disabled', disabled);
		return this;
	},
	/**
	 * 将输入控件集合序列化成对象， 名称或编号作为键，value属性作为值。
	 *
	 * @method _serializeInputs
	 * @param {Array} inputs input/select/textarea的对象集合
	 * @return {Object} json 对象 {key:value,...}
	 */
	_serializeInputs : function (field) {
		var value = "";
		if(!field) {
			return value;
		}
		var tagName = field.get(0).tagName, name = field.attr('name'), type = field.attr('type');
		if(type) {
			type = type.toLowerCase();
		}
		// input输入标签
		if(tagName == 'INPUT' && type) {
			switch (type) {
				case 'checkbox':
				{
					value = field.is(':checked');
				}
					break;
				case 'radio':
				{
					if(field.is(':checked')) {
						value = field.attr('value');
					}
				}
					break;
				default:
				{
                    // 如果是placeholder则不抓取
                    value = (field.val() != field.attr('defaultchars')) ? field.val() : '';
				}
			}
		} else if(tagName=='SELECT' || tagName=='TEXTAREA'){
			value = field.val();
		} else{
			value = name ? field.attr(name) : "";
		}
		return value;
	},
	/**
	 * 在分组中查找子层的 fieldset (如：fieldset="user")的数据域，获取对应属性，并递归调用生成Array和Object。
	 *
	 * @method _serializeField
	 * @param {Array} field 一个分组容器
	 * @return {Object} json 对象 {key:value,...}
	 */
	_serializeField : function (field) {
		var json = {};
		if(!field) {
			return json;
		}
		
		var key = field.attr('fieldset');
		if( (!key) || field.hasClass('skip_flag') ) {
			return ;
		}
		switch(key){
		case 'json' :
		case 'object' :
		case 'arrayItem' :
			{
				var _field = field.find('[fieldset]').filter(function(index){
					if($(this).parents('[fieldset]:first').is(field))
						return true;
				});//寻找下层所有节点
				for(var i=_field.length-1; i>=0; i--){
					var name = $(_field[i]).attr('name');
					if("undefined"!=name && ""!=name && null!=name){
//						if(typeof json[name] =="undefined" || ""==json[name] || null==json[name]){
						json[name] = this._serializeField($(_field[i]));
//						}else{
//							json[name] = $.extend({},json[name],this._serializeField($(_field[i])));
//						}
					}
				}
			}
		break;
		case 'array' :
			{
				var _field = field.find('[fieldset=arrayItem]').filter(function(index){
					if($(this).parents('[fieldset]:first').is(field))
						return true;
				});//寻找下层所有节点
				json = new Array();
				for(var i = _field.length-1; i>=0; i--){
					var value = this._serializeField($(_field[i]));
					if(JSON.stringify(value)!="{}"){
						json.push(value);
					}
				}
			}
		break;
		case 'str' :
			{
				json = this._serializeInputs($(field))
			}
		break;
		}
		return json;
	},
	/**
	 * 序列化表单值,结果以key/value形式返回key为表单对象名称(name||id),value为其值。<br>
	 * HTML格式：<br>
	 * 1).表单容器：通常是一个form表单（如果不存在就以body为父容器），里面包含输入标签和子容器;<br>
	 * 2).子容器（也可以没有）：必须包括属性fieldset="XXXX" div标签，里面包含输入标签和子容器。<br>
	 * 序列化后将生成以XXX为主键的json对象.如果子容器存在嵌套则以fieldset为主键生成不同分组的json对象。<br>
	 * 3).输入标签：输入标签为input类型标签（包括：'checkbox','color','date','datetime','datetime-local',<br>
	 * 'email','file','hidden','month','number','password','radio','range
	 * ','reset','search','submit',<br>
	 * 'tel','text','time ','url','week'）。
	 * 而'button','reset','submit','image'会被过虑掉。
	 *
	 * @method serialize
	 * @param {Object} frm jQuery表单对象
	 * @return {Object} json对象，可包含多结构
	 */
	serialize : function (frm) {
		var json = {};
		frm = frm || $('[fieldset=json]');
		if(!frm) {
			return json;
		}
		
		json = this._serializeField(frm);
		return json;
	},
	/**
	 * 获取合法的输入标签。
	 *
	 * @method _filterInputs
	 * @param {Object} container jQuery对象，标签容器
	 * @return {Array} inputs jQuery对象数组
	 */
	_filterInputs : function (container) {
		return $(container
			.find('input[type!=button][type!=reset][type!=submit][type!=image][type!=file],select,textarea'));
	},
	/**
	 * 查找符合条件的输入标签。
	 *
	 * @method _findInputs
	 * @param {Array} inputs jQueery输入标签数组
	 * @param {String} key 查询关键字
	 * @return {Array} inputs jQuery对象数组
	 */
	_findInputs : function (inputs, key) {
		return $(inputs.filter('input[name=' + key + '],input[id=' + key
			+ '],textarea[name=' + key + '],textarea[id=' + key
			+ '],select[name=' + key + '],select[id=' + key + ']'));
	}
};
