$("#close1").click(function () {
	$("#cd-popup1").hide();
});
// 2
$("#btn2").click(function () {
	$("#cd-popup2").fadeIn();
});
$("#close2").click(function () {
	$("#cd-popup2").hide();
});
// 3
$("#btn3").click(function () {
	$("#cd-popup3").fadeIn();
});
$("#close3").click(function () {
	$("#cd-popup3").hide();
});

// 模型
class List {
	constructor(container, url) {
		this.url = url;
		this.model = [

		]
		this.container = container;
		this.get();
	}
	real() {
		let m = this.model;
		let dom = '';
		for (let i = 0; i < m.length; i++) {
			let temp = m[i];
			dom += '<tr >'
			temp.forEach(d => {
				dom += '<td>' + d + '</td>';
			})
			dom += '<td> <span><input data-index=' + temp[0] + ' type="button" value="编辑" class="edit btn am-btn-success btn-default"></span> <span><input data-index=' + temp[0] + ' type="button" value="删除" class="delete btn btn-default"></span> </td></tr>';
		}
		this.container.innerHTML = dom;
	}
	// 删除
	del(idx) {
		let m = this.model;
		for (let i = 0; i < m.length; i++) {
			if (m[i][0] === idx) {
				m.splice(i, 1);
				break
			}
		}
		this.submit();
	}
	// 添加
	add(arr) {
		if (arr[0] instanceof Array) {
			this.model.push(...arr);
		} else {
			this.model.push(arr);
		}
		this.submit();
	}
	// 编辑
	edit(idx, arr) {
		let m = this.model;
		for (let i = 0; i < m.length; i++) {
			if (m[i][0] === idx) {
				m[i] = arr;
				break
			}
		}
		this.submit();
	}
	// 提交数据
	submit() {
		let id = setTimeout(function () {
			alert('提交数据超时！！！！')
		}, 3000)
		$.post(this.url, {
			model: this.model
		}, function (result) {
			clearTimeout(id)
			this.model = result
			this.real();
		}.bind(this));

	}
	// 拉数据
	get() {
		let id = setTimeout(function () {
			alert('拉取数据超时！！！！')
		}, 3000)
		$.get(this.url, function (result) {
			clearTimeout(id)
			this.model = result;
			this.real();
		}.bind(this));
	}
}
let project = document.getElementById('project-table');
let projectList = new List(project, 'http://localhost:3000/model');
projectList.real()

let editOrAdd = 'add';
$(".list").click(function (e) {
	let target = e.target;
	let which = target.value
	if (which === '编辑') {
		editOrAdd = $(target).attr('data-index');
		$("#cd-popup1").fadeIn();
	} else if (which === '删除') {
		console.log(typeof $(target).attr('data-index'), $(target).attr('data-index'))
		projectList.del($(target).attr('data-index'))
	}
});
$("#btn1").click(function () {
	editOrAdd = 'add';
	$("#cd-popup1").fadeIn();
});
// 提交边基尼表单
$('.reg_div button[type=submit]').click(e=>false)
$('.reg_div button[type=submit]').click(function (e) {
	let items = []
	let vaild = true;
	$('.reg_div .info').each((i, d) => {
		let value = $(d).val();
		if (value == '') {
			vaild = false
		} else {
			items.push($(d).val())
		}
	})
	if (vaild) {
		items.push(when())
		// projectList.add(items)
	}
	if (editOrAdd !== 'add') {
		projectList.edit(editOrAdd, items)
	} else {
		return (projectList.add(items),false)
	}
	return false
})

function when() {
	var todayMsec = new Date();
	return todayMsec.getFullYear() + "/" + (todayMsec.getMonth() * 1 + 1) + "/" + todayMsec.getDate() + "  " + todayMsec.getHours() + ":" + todayMsec.getMinutes() + ":" + todayMsec.getSeconds();
}