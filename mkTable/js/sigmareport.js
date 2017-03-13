/**
 * auther:hexiaodong
 * email:sigmaportal@hotmail.com
 */

var defaultAlign = new Object();
defaultAlign["string"] = "center";
defaultAlign["link"] = "center";
defaultAlign["number"] = "right";
defaultAlign["boolean"] = "center";
defaultAlign["select"] = "center";
defaultAlign["date"] = "center";
defaultAlign["undefined"] = "left";
defaultAlign["null"] = "left";

var sgrid_StringRender = new function(){
	this.paint = function(report,row,col){
		var data = row.getCellValue(col);
		if(data===null ||  data===undefined){
			return "";
		}
		return data;
	}
}

var sgrid_NumberRender = new function(){
	this.paint = function(report,row,col){
		var data = row.getCellValue(col);
		var n = new Number(data);
		var r ;
		if(!isFinite(n)) n = new Number(0);
		if(col.format!=null) r = n.format(col.format);
		return r;
	}
}

var sgrid_zeor_NumberRender = new function(){
	this.paint = function(report,row,col){
		var data = row.getCellValue(col);
		
		if(data=='0'){
			return '-';
		}else{
			var n = new Number(data);
			var r ;
			if(!isFinite(n)) n = new Number(0);
			if(col.format!=null) r = n.format(col.format);
			return r;
		}
	}
}
var sgrid_BoolRender = new function(){
	this.paint = function(grid,row,col){
		var data = row.getCellValue(col);
		var c = (data===true)?'Yes':'No';
		return c;
	}
}

var sgrid_China_BoolRender = new function(){
	this.paint = function(grid,row,col){
		var data = row.getCellValue(col);
		var c;
		if(data===1 && row.data.organization.orgName!='合计'){
			c="是"
		}else if(data===0){
			c="-"
		}else{
			return c=data;
		}
		return c;
	}
}
var sgrid_LinkRender = new function(){
	this.paint = function(grid,row,col){
		var data = row.getCellValue(col);
		if(data===null || data===undefined) data = "";
		var t=[];
		var showLink = row.getShowLinkValue(col);
		//将后台返回的json字符串转化为boolean类型
		showLink=showLink=="true"?true:false;
		if(showLink){
			t.push('<span style="TEXT-DECORATION: underline;cursor:pointer;"');
			
			t.push(' onclick="s_grid_onCellLink(\''+grid.id+'\',\''+row._index+'.'+row.indexOfChildren+'\',\''+col.name+'\');">');
		}
		t.push(data);
		if(showLink){
			t.push('</span>');
		}
		return t.join('');
	}
}

function s_grid_onCellLink(reportId,rowIndex,colName){
	var report = window._sigmaReports[reportId];
	var col = report.getColByName(colName);
	var ss = rowIndex.split("\.");
	var row = null;
	var index = null;
	if(ss.length==1){
		row=report.rows[rowIndex];
	}else if(ss.length==2){
		row = report.rows[ss[0]];
	}else{
		row = report.rows[ss[0]];
		index = ss[1];
		row = row.childRows[ss[1]];
	}
	
	eval(col.href);
}

var sgrid_SelectRender = new function(){
	this.paint = function(grid,row,col){
		var id = row.getCellValue(col);

		var options = null;

		options = row.rowData["options_"+col.name];

		if(options==null)
			options = col.options;
		var value = null;
		for(var i=0;i<options.length;i++){
			if(options[i].id == id) {
				value=options[i];
				break;
			}
		}
		if(value!=null) return value.name;
		else return "&nbsp;";
	}
}

var sgrid_DateRender = new function(){
	this.paint = function(grid,row,col){
		var date = row.getCellValue(col);
		if(date===null ||  date===undefined){
			date = "";
		}
		if(date.length>10)
			date = date.substring(0,10);
		if(data=="")
			date = "&nbsp;&nbsp;&nbsp;&nbsp;"
		var s = [];
		s.push('<span style="cursor:pointer;">');
		s.push(date);
		s.push('</span>');
		return s.join("");
	}
}



function SigmaReport(box,context,columns, printClassName,printTable_title,tableTitle,printBtn){
	this.cols = columns;
	this.rows = [];
	this.scrollTop = 0;
	this.scrollLeft = 0;
	this.context = context;

	if(context.locked === undefined) context.locked = 0;
	var element = null;
	if(typeof(box)=="string" ){
		element =document.getElementById(box);
	}else{
		element = box;
	}
	if(element==null){
		return false;
	}
	this.id = element.id;
	var reports = window._sigmaReports;
	if(reports==null){
		reports = {};
		window._sigmaReports = reports;
	}
	reports[this.id] = this;

	element.innerHTML = "";
	element.style.overflow = "Auto";

	this.headWide = null;
	this.headDeep = null;
	this.headHeight = null;
	this.bodyHeight = null;
	this.colsWidth = null;
	this.cellHeight = 20;
	this.renders = {};

	this.registerRender("string",sgrid_StringRender);
	this.registerRender("boolean",sgrid_BoolRender);
	this.registerRender("number",sgrid_NumberRender);
	this.registerRender("numberZeor",sgrid_zeor_NumberRender);
	this.registerRender("booleanChina",sgrid_China_BoolRender);
	this.registerRender("link",sgrid_LinkRender);
	this.registerRender("select",sgrid_SelectRender);
	this.registerRender("date",sgrid_DateRender);
	if(typeof(tableTitle)=='undefined' || tableTitle == '' || tableTitle == null){
		tableTitle=document.title;
	}
	if(printBtn!=false){
		printBtn='<a href="javascript:;" class="print" title="打印"></a></div>';
	}else{
		printBtn='';
	}
	
	var sb = [];
	if(tableTitle=="全省综治“三项建设”调度督办系统"){
		sb[sb.length] = '<div class="table_title" id="title_' + this.id + '">'+tableTitle+'</div>';
	}else{
		if(typeof(printTable_title)=='undefined' || printTable_title == '' || printTable_title == null){
			sb[sb.length] = '<div class="table_title" id="title_' + this.id + '">'+tableTitle+'报表'+printBtn+'</div>';
		}else{
			sb[sb.length] = '<div class="printTable_title" id="title_' + this.id + '">'+tableTitle+'报表'+printBtn+'</div>';
		}
	}
	
	sb[sb.length] = '<div id="head_' + this.id + '"  class="head" style="">';
	sb[sb.length] = '表头区域';
	sb[sb.length] = '</div>';
	sb[sb.length] = '<div id="body_' + this.id + '"  class="body" style="">';
	sb[sb.length] = '<div style="text-align:center;line-height:40px;">数据加载中</div>';
	sb[sb.length] = '</div>';
	if(typeof(printClassName)=='undefined' || printClassName == '' || printClassName == null){
		element.printClassName = "SigmaReport";
	}else{
		element.printClassName = printClassName;
	}

	element.innerHTML = sb.join("");
	element.style.padding = "0px";
	element.style.margin = "0px";
	element.style.padding = "0px;";



	this.getColWidth = function(col){
		if(col.width!=null)
			return col.width;
		else
			return 100;
	}

	// 2016/7/10 添加垂直居中
	// vertical-align: middle | top | bottom
	this.getColVAlign = function(col) {
		console.log(col)
		var valign = 'middle';
		if (col.valign != null) valign = col.valign;
		return valign;
	}

	this.countHeadDeep();
	this.countHeadWide();
	this.calcRowSpan();
	this.getHeadBox().innerHTML = this.paintHeader();
	//this.layout();
	$.loadingComp("close");
}

SigmaReport.prototype.layout = function(){
	var w = this.calcTableWidth();
	this.getHeadBox().style.width = w + "px";
	this.getBodyBox().style.width = w + "px";
	this.getHeadTable().style.width = w+"px";
}

SigmaReport.prototype.getColByName = function(name,cols){
	if(cols==null) cols = this.cols;
	for(var i=0;i<cols.length;i++){
		if(cols[i].name === name)
			return cols[i];
		else{
			if(cols[i].children!=null){
				var r = this.getColByName(name,cols[i].children);
				if(r!=null)
					return r;
			}
		}
	}
	return null;
}

SigmaReport.prototype.getElement = function(){
	return document.getElementById(this.id);
}

SigmaReport.prototype.getHeadBox = function(){
	return document.getElementById("head_"+this.id)
}
SigmaReport.prototype.getHeadTable= function(){
	return document.getElementById("tHead_"+this.id);
}
SigmaReport.prototype.getBodyTable = function(){
	return document.getElementById("tBody_"+this.id);
}
SigmaReport.prototype.getBodyBox= function(){
	return document.getElementById("body_"+this.id)
}

SigmaReport.prototype.countHeadDeep= function(){
	if(this.headDeep!==null)
		return this.headDeep;
	var children = this.cols;
	var maxDeep = 0;
	if(children!=null && children.length>0){
		for(var i=0;i<children.length;i++){
			var col = children[i];
			var deep = this.countColDeep(col);	//当前列深度，包括自己在内往下数总共几层
			col._deep = deep;
			if(deep>maxDeep){
				maxDeep = deep;
			}
		}
	}
	this.headDeep = maxDeep;
	return this.headDeep;
}

//计算当前列向下数共有多少层
SigmaReport.prototype.countColDeep= function(col){
	var children = col.children;
	if(children!=null && children.length>0){
		var maxDeep = 0;
		for(var i=0;i<children.length;i++){
			var child = children[i];
			var deep = this.countColDeep(child);
			if(deep>maxDeep){
				maxDeep = deep;
			}
		}
		col._deep =  maxDeep +1;
	}else{
		col._deep = 1;
	}
	return col._deep;

}

SigmaReport.prototype.calcRowSpan = function(cols,deep){
	if(cols===undefined){
		cols = this.cols;
		deep = this.countHeadDeep();
	}
	for(var i=0;i<cols.length;i++){
		var col = cols[i];
		col._rowspan = deep-col._deep+1;
		var cs = col.children;
		if(cs!==undefined && cs.length>0){
			this.calcRowSpan(cs,deep-1);
		}
	}
}

SigmaReport.prototype.countHeadWide= function(){
	if(this.headWide !=null)
		return this.headWide;
	var wide = 0;
	this.leafCols = [];	//表头的叶子节点
	var children=this.cols;
	if(children!=null && children.length>0){
		for(var i=0;i<children.length;i++){
			var col = children[i];
			col.parent = null;
			wide = wide + this.countColWide(col);
		}
	}
	this.headWide = wide;
	return wide;
}

SigmaReport.prototype.countColWide = function(col){
	var children = col.children;
	if(children==null || children.length==0){
		col._colspan = 1;	//占1列
		this.leafCols.push(col);	//是叶子节点
	}else{
		col._colspan=0;
		for(var i=0;i<children.length;i++){
			var child = children[i];
			child.parent = col;
			child.brotherIndex = i;
			var cw = this.countColWide(child);
			col._colspan = col._colspan+cw;
		}
	}
	return col._colspan;
}

SigmaReport.prototype.calcTableWidth = function(){
	var width = 0;
	for(var i=0;i<this.leafCols.length;i++){
		width = width+this.getColWidth(this.leafCols[i])+1;
	}
	return width;
}


SigmaReport.prototype.getColGroup= function(n) {
	if(this.colGroup!=null) return this.colGroup;

	var ua = navigator.userAgent.toLowerCase();
	var isIE6 = false;
	if(ua.indexOf("msie 6.0")>0){
		isIE6 = true;
	};
	var sb = [];
	sb.push("<COLGROUP id='colgroup_"+this.id+"_"+n+"'>");

	for(var i=0;i<this.leafCols.length;i++){
		var col = this.leafCols[i];
		if(i<this.leafCols.length){
			sb.push('<COL width="')
			if(isIE6){
				if(col.parent!=null && col.brotherIndex>0 && n=="head"){
					sb.push(this.getColWidth(col)+1);
				}else{
					sb.push(this.getColWidth(col));
				}
			}else
				sb.push(this.getColWidth(col));
			sb.push('" ');
			sb.push('/>');
		}else{
			sb.push('<COL')
			sb.push('/>');
		}
	}

	sb.push("</COLGROUP>");
	this.leftColGroup = sb;
	return sb;
}

SigmaReport.prototype.paintHeadCell = function(col,rowsbuf){
	var width = this.getColWidth(col);
	var rowbuf = rowsbuf[col._selfDeep];
	var cellbuf = [];
	var valign = this.getColVAlign(col);
	cellbuf.push('<TD style="text-align:center; vertical-align:'+valign+'"');
	cellbuf.push(' colspan='+col._colspan);
	cellbuf.push(' rowspan='+col._rowspan);
	cellbuf.push('>'+col.caption);
	cellbuf.push('</TD>');
	rowbuf[rowbuf.length] = cellbuf.join("");
	if(col.children!== undefined && col.children.length>0){
		var children = col.children;
		for(var i=0;i<children.length;i++){
			var child = children[i];
			child._selfDeep = col._selfDeep +1;
			this.paintHeadCell(child,rowsbuf);
		}
	}
}


SigmaReport.prototype.paintHeader = function(){
	this.calcRowSpan();
	var sb = [];
	sb.push('<TABLE id=tHead_'+this.id+' style="TABLE-LAYOUT:fixed;" cellSpacing=0 cellPadding=0 border=0>');
	sb.push(this.getColGroup("head").join(""));
	var rowsbuf = [];
	var deep = this.countHeadDeep();
	for(var i=0;i<deep;i++){
		var rowbuf = [];
		rowsbuf.push(rowbuf);
		rowbuf.push('<TR>');
	}
	for(var i=0;i<this.cols.length;i++){
		var col = this.cols[i];
		col._selfDeep = 0;
		this.paintHeadCell(col,rowsbuf);
	}
	for(var i=0;i<deep;i++){
		var rowbuf = rowsbuf[i];
		rowbuf.push('</TR>');
		rowsbuf[i]=rowbuf.join("");
	}
	sb.push(rowsbuf.join(""));

	sb.push('</TABLE>');
	return sb.join("");
}

SigmaReport.prototype.getColumnRender = function(col){
	if(col.render==null){
		if(col.mode==null)	col.mode = "string";
		var r = this.getRender(col.mode);
		col.render = r;
	}
	return col.render;
}



SigmaReport.prototype.bindData = function(data){
	if(!data){return false;}
	if(!data.length ){
		$("#"+this.id).append("<div style='margin: -1px 5px 0;line-height:4em;border: 1px solid #ccc;text-align:center;'>当前没有统计数据</div>")
		$(".print").removeClass("print");
	}
	this.rows = [];
	for(var i=0;i<data.length;i++){
		var row = new SigmaReportRow(data[i],i);
		row.report = this;
		this.rows.push(row);
	}
	this.paintRows();

	//this.getBodyTable().style.width = this.calcTableWidth() + "px";
	//this.getBodyBox().style.height = this.getBodyTable().offsetHeight + "px";
}


SigmaReport.prototype.paintRows = function(){
	var rows = this.rows;

	var sb = new Array();
	var sbr = new Array();

	sb.push('<TABLE  id=tBody_'+this.id+' style="TABLE-LAYOUT:fixed;" cellSpacing=0 cellPadding=0 border=0>');
	sb.push(this.getColGroup("body").join(""));
	for(var i=0;i<rows.length;i++){
		var str = rows[i].paint();
		sb.push(str);
	}
	sb.push("</TABLE>");
	var resultValue = this.getBodyBox();
	if(resultValue && resultValue.innerHTML){
		resultValue.innerHTML = sb.join("");
	}
}


function SigmaReportRow(rowData,index){
	this.data = rowData;
	this._index = index;
	this._selected = false;
	this.report = null;
	this.childRows = [];
	this.indexOfChildren = 0;
}
SigmaReportRow.prototype.getColAlign = function(col){
	var align = "center";
	if(col.align!=null)	align = col.align;
	else align = defaultAlign[col.mode];
	return align;
}

SigmaReportRow.prototype.getCellValue  = function(col){
	var s = col.name;
	return this.calcCellValue(s);
}

SigmaReportRow.prototype.getShowLinkValue  = function(col){
	if(col.showLink){
		var s = col.showLink;
		return this.calcCellValue(s);
	}else{
		return true;
	}
}


SigmaReportRow.prototype.calcCellValue = function (str){
	var s = str;
	var p = s.indexOf("[index]");
	if(p>0){
		var pre = s.substring(0,p);
		var reg = new RegExp(pre+"\\[index\\]","g");
		s = s.replace(reg,"this.data."+pre+"["+this.indexOfChildren+"]");
	}else{
		if(s.indexOf("/")>0){
			s = this.formatColName(s, "/");
		}else if(s.indexOf("+")>0){
			s = this.formatColName(s, "+");
		}else if(s.indexOf("-")>0){
			s = this.formatColName(s, "-");
		}else if(s.indexOf("*")>0){
			s = this.formatColName(s, "*");
		}else{
			s = "this.data."+s;
		}
	}
	v = eval(s);
	return v;
}
SigmaReportRow.prototype.getCellValueByColName  = function(colname){
	var s = colname;
	var p = s.indexOf("[index]");
	if(p>0){
		var pre = s.substring(0,p);
		var reg = new RegExp(pre+"\\[index\\]","g");
		s = s.replace(reg,"this.data."+pre+"["+this.indexOfChildren+"]");
	}else{
		if(s.indexOf("/")>0){
			s = this.formatColName(s, "/");
		}else if(s.indexOf("+")>0){
			s = this.formatColName(s, "+");
		}else if(s.indexOf("-")>0){
			s = this.formatColName(s, "-");
		}else if(s.indexOf("*")>0){
			s = this.formatColName(s, "*");
		}else{
			s = "this.data."+s;
		}
	}
	var v =  eval(s);
	return v;
}
SigmaReportRow.prototype.formatColName = function(s,c){
	var reg = new RegExp("^|\\"+c,"g");
	s = s.replace(reg,c+"this.data.");
	s = s.substring(1);
	return s;
}


SigmaReportRow.prototype.hasChildRow = function(childRowData){
	for(var i=0;i< this.childRows.length;i++){
		var row = this.childRows[i];
		if(row.data == childRowData){
			return true;
		}
	}
	return false;
}
SigmaReportRow.prototype.paint = function(){
	this.calcChildRows();
	var sb = [];
	sb.push("<tr>");
	var columns =this.report.leafCols;
	for(var i=0;i<columns.length;i++){
		if(this.indexOfChildren>0){
			if(columns[i].name.indexOf("[index]")>0){
				sb.push(this.paintCell(columns[i]));
			}
		}else
			sb.push(this.paintCell(columns[i]));

	}
	sb.push("</tr>");
	if(this.childRows.length>0){
		for(var i=1;i<this.childRows.length;i++){
			var row = this.childRows[i];
			sb.push(row.paint());
		}
	}
	var r = sb.join("");
	return r;
}


SigmaReportRow.prototype.paintCell = function(col){
	var str = this.report.getColumnRender(col).paint(this.report,this,col);
	var sb = new Array();
	var cellId = "cell@"+this._index+"@"+col.name;

	sb.push('<td id="'+cellId+'"');
	if(this.childRows.length>1 && col.name.indexOf("[index]")<0){
		sb.push(" rowspan="+this.childRows.length);
	}
	var align = this.getColAlign(col);
	//sb.push(' ><div style="text-align:'+align+';width:'+(this.report.getColWidth(col)-4)+'px;"');
	sb.push(' ><div style="text-align:'+align+';"');
	sb.push('>'+str);

	sb.push('</td>');
	var r = sb.join("");
	return r;

}

SigmaReportRow.prototype.calcChildRows = function(){
	if(this.indexOfChildren>0)
		return ;
	var cols = this.report.leafCols;
	for(var i=0;i<cols.length;i++){
		var col = cols[i];
		var colName = col.name;
		var ns = colName.split(".");
		if(ns.length==1){

		}else if(ns.length>1){
			var value = this.data;
			for(var j=0;j<ns.length;j++){
				var pName = ns[j];
				if(pName.indexOf("[index]")>0){
					pName = pName.substring(0,pName.indexOf("[index]"));
				}

				value  = value[pName];
				if(value instanceof Array){
					for(var k = 0;k<value.length;k++){
						var data = value[k];
						if(this.hasChildRow(data)==false){
							var childRow = new SigmaReportRow(this.data);
							childRow.indexOfChildren = k;
							childRow._index = this._index;
							childRow.report = this.report;
							this.childRows.push(childRow);
						}
					}
					return;
				}
			}
		}
	}
}

SigmaReport.prototype.registerRender = function(type,render){
	this.renders[type] = render;
}

SigmaReport.prototype.getRender = function(type){
	var render = this.renders[type];
	if(render==null)
		render = this.renders["string"];
	return render;
}