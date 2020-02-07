function generateAnswer(sr)
{
	const msg = '<tr id="'+sr+'">\
	<td><button class="unmarked" id="AC_'+sr+'"></button> <button class="unmarked" id="R_'+sr+'"></button></td>\
	<td id="sr_'+sr+'" class="sr">'+(sr+1)+'.</td>\
	<td>\
	  <select name="qtype" id="qtype_'+sr+'">\
		<option value="0">SC</option>\
		<option value="1">MC</option>\
		<option value="2">QC</option>\
		<option value="3">NES</option>\
		<option value="4">NEF</option>\
	  </select>\
	</td>\
	<td>\
		<div class="options" id="options_'+sr+'">\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="A">A</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="B">B</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="C">C</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="D">D</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="E">E</label>\
		</div>\
    </td>\
    <td id="sel_'+sr+'">-</td>\
	</tr>'
	return msg;
}

function changeOptionType(sr,type)
{
	$("#options_"+sr).empty();
	$("#sel_"+sr).empty().append("-");
	let msg = "";
	switch(type)
	{
		case "0":
			msg = '<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="A">A</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="B">B</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="C">C</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="D">D</label>\
			<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="E">E</label>'
			break;

		case "1":
			msg = '<label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="A">A</label>\
            <label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="B">B</label>\
            <label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="C">C</label>\
            <label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="D">D</label>\
			<label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="E">E</label>\
			<label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="F">F</label>\
			<label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="G">G</label>\
			<label><input type="checkbox" name="Answer'+sr+'" id="o_'+sr+'" value="H">H</label>'
			break;

		case "2":
			msg = '<label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="A">A</label>\
            <label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="B">B</label>\
            <label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="C">C</label>\
            <label><input type="radio" name="Answer'+sr+'" id="o_'+sr+'" value="D">D</label>'
			break;

		case "3":
			msg = '<input id="o_'+sr+'" type="number">';
			break;
		
		case "4":
			msg = '<input id="o_'+sr+'_N" type="number"> / <input id="o_'+sr+'_D" type="number">';
			break;
	}

	$("#options_"+sr).append(msg);
}

var Qtried=-1;
var prevLastQ=-1;
	
function checkQChange()
{
	console.log("Qcheck called");
	if(prevLastQ != -1)
	{
		if(Qtried != prevLastQ)
		{
			console.log({Q: Qtried,L: prevLastQ});
			$("tr:eq("+(parseInt(Qtried)+1)+")").toggleClass('highlighted_row');
			$("tr:eq("+(parseInt(prevLastQ)+1)+")").toggleClass('highlighted_row');
		}
	}
	else
	{
		console.log({Q: Qtried,L: prevLastQ});
		$("tr:eq("+(parseInt(Qtried)+1)+")").toggleClass('highlighted_row');
	}
	prevLastQ = Qtried;
}

$(function() {
	

	$(document).on('change','select',function(e)
	{
		const elem = e.target.id;
		const newType = $("#" + elem +" option:selected").val();
		const sr = elem.substring(6);
		Qtried = sr;
		console.log(Qtried);
		checkQChange();
		changeOptionType(sr,newType);
	});

	$(document).on('change','input[type="radio"]',function(e)
	{
		const elem = e.target.id;
		const markedOption = $("#" + elem+":checked").val();
		const sr = elem.substring(2);
		Qtried = sr;
		checkQChange();
		$("#sel_"+sr).empty().append(markedOption);
	});

	$(document).on('change','input[type="checkbox"]',function(e)
	{
		const elem = e.target.id;
		const sr = elem.substring(2);
		Qtried = sr;
		checkQChange();
		var selected = [];
		$.each($("input[name='Answer"+sr+"']:checked"),function(){
			selected.push($(this).val());
		});
		if(selected.length>0)
		{
			$("#sel_"+sr).empty().append(selected.join(","));
		}
		else
		{
			$("#sel_"+sr).empty().append("-");
		}
	});

	$(document).on('change','input[type="number"]',function(e)
	{
		const elem = e.target.id;
		if(elem.indexOf('N')==-1 && elem.indexOf('D')==-1 && elem != "numQ")
		{
			let sr = elem.substring(2);
			Qtried = sr;
			console.log("Qtried: " + Qtried);
			checkQChange();
			const ans = $("#"+elem).val();
			//console.log({id:elem,sr:sr,ans:ans});
			if(ans!="")
			{
				$("#sel_"+sr).empty().append(ans);
			}
			else
			{
				alert("You can't leave it blank! Enter a valid number");
			}
		}
		else
		{
			let sr = elem.substring(2);
			const ind = sr.indexOf('_');
			sr = sr.substring(0,ind);
			if(elem.indexOf("N")!= -1 && $("#o_"+sr+"_D").val() =="")
			{
				Qtried = sr;
				checkQChange();
				$("#o_"+sr+"_D").val("1");
			}

			if(elem.indexOf("D")!= -1 && $("#o_"+sr+"_N").val() =="")
			{
				Qtried = sr;
				checkQChange();
				$("#o_"+sr+"_N").val("1");
			}

			$("#sel_"+sr).empty().append($("#o_"+sr+"_N").val()+"/"+$("#o_"+sr+"_D").val());
		}
	});

	$(document).on('click','button',(e)=>{
		const elem = e.target.id;
		console.log(elem);
		if(elem == "gen")
		{
			if(parseInt($("#numQ").val())>0)
			{
				$("tbody").children().not(':first').remove();
				for(var i=0;i<parseInt($("#numQ").val());i++)
				{
					$("tbody").append(generateAnswer(i));
				}
			}
		}
		if (elem =="add_q")
		{
			const val = parseInt($("#numQ").val());
			$("tbody").append(generateAnswer(val));
			$("#numQ").val(val+1);

		}
		else if(elem != "save" || elem != "load")
		{
			if(elem.indexOf("R")!=-1)
			{
				$("#"+elem).toggleClass("unmarked review");
			}
			else if(elem.indexOf("AC")!=-1)
			{
				const c = $("#"+elem).attr('class');
				if(c == "unmarked")
				{
					$("#"+elem).toggleClass("unmarked correct");
				}
				else if(c == "correct")
				{
					$("#"+elem).toggleClass("correct incorrect");
				}
				else if(c == "incorrect")
				{
					$("#"+elem).toggleClass("incorrect unmarked");
				}
			}
		}
	});


	$("#save").on('click',function(){
		const num = parseInt($("tr:last-child").attr('id'));
		var sheet = [];
		for(var i =0;i<num+1;i++)
		{
			let ac_class = $("#AC_"+i).attr('class');
			let r_class = $("#R_"+i).attr('class');
			let qtype = $("#qtype_"+i+" option:selected").val();
			let answer = [];
			if(qtype==1)
			{
				$.each($("input[name='Answer"+i+"']:checked"),function(){
					answer.push($(this).val());
				});
				if(answer.length==0)
				{
					answer.push("-");
				}
			}
			else
			{
				if(qtype==3 || qtype == 4)
				{
					answer.push($("#sel_"+i).text());
				}
				else
				{
					answer.push($("#o_"+i+":checked").val());
				}
			}

			switch(ac_class)
			{
				case 'unmarked':
					ac_class = 0;	
					break;
				case 'correct':
					ac_class = 1;
					break;
				case 'incorrect':
					ac_class = 2;
					break;
				
			}

			switch(r_class)
			{
				case 'unmarked':
					r_class = 0;	
					break;
				case 'review':
					r_class = 1;
					break;
			}

			const obj = {
				AC: ac_class,
				R: r_class,
				Qtype:qtype,
				Ans:answer
			};
			console.log(obj);
			sheet.push(obj);
		}
		var today = new Date();
		var date = today.getDate() + "_" + (today.getMonth()+1) + "_" + today.getFullYear();
		console.log(date);
		if(sheet.length>0)
		{
			var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sheet));
			var downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute("href",     dataStr);
			downloadAnchorNode.setAttribute("download", "sheet_"+date+ ".json");
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
		}
	});

	$("#Load").on('click',function(){
		$("#file-input").focus().trigger('click');
	});


	let fileUploaded = new FileReader();
	$("#file-input").on('change',function(e)
	{
		fileUploaded.readAsText(e.target.files[0]);
	});

	fileUploaded.addEventListener("load",(e)=>{
		const msg = JSON.parse(e.target.result);
		$("tbody").children().not(':first').remove();
		$("#numQ").val(msg.length);
		for(var i=0;i<msg.length;i++)
		{
			console.log(msg[i]);
			$("tbody").append(generateAnswer(i));
			if(msg[i].AC>0)
			{
				for(var x=0;x<msg[i].AC;x++)
					$("#AC_"+i).trigger('click');
			}
			if(msg[i].R>0)
			{
				$("#R_"+i).trigger('click');
			}
			changeOptionType(i,msg[i].Qtype);
			$("#qtype_"+i).val(msg[i].Qtype);
			if(msg[i].Qtype == 0 || msg[i].Qtype == 2)
			{
				$("input[name='Answer"+i+"'][value='"+msg[i].Ans[0]+"']").trigger('click').attr('checked',true);
			}
			else
			{
				if(msg[i].Qtype == 1)
				{
					//Multiple correct
					for(const obj in msg[i].Ans)
					{
						const sel = "input[name='Answer"+i+"'][value='"+msg[i].Ans[obj]+"']";
						$(sel).trigger('click').attr('checked',true);
					}
				}
				else
				{
					if(msg[i].Qtype == 3)
					{
						//Numeric single
						$("#o_"+i).val(parseInt(msg[i].Ans[0],10));
						$("#sel_"+i).empty().append(msg[i].Ans[0]);
					}
					else
					{
						//Fraction
						if(msg[i].Ans[0].indexOf("/")!=-1)
						{
							const nums = msg[i].Ans[0].split("/");
							$("#sel_"+i).empty().append(msg[i].Ans[0]);
							$("#o_"+i+"_N").val(parseInt(nums[0],10));
							$("#o_"+i+"_D").val(parseInt(nums[1],10));
						}
					}
				}
			}
		}
	});

});