function generateAnswer(sr)
{
	const msg = '<tr id="'+sr+'">\
	<td id="sr_'+sr+'" class="sr">'+sr+'.</td>\
	<td>\
	  <select name="qtype" id="qtype_'+sr+'">\
		<option value="0">Single option Correct</option>\
		<option value="1">Multiple option Correct</option>\
		<option value="2">Quant Comparison</option>\
		<option value="3">Numeric Entry Single</option>\
		<option value="4">Numeric Entry Fraction</option>\
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





$(function() {
	$("#gen").on('click', function () {
		if(parseInt($("#numQ").val())>0)
		{
			$("tbody").children().not(':first').remove();
			for(var i=0;i<parseInt($("#numQ").val());i++)
			{
				$("tbody").append(generateAnswer(i+1));
			}
		}
	});

	$(document).on('change','select',function(e)
	{
		const elem = e.target.id;
		const newType = $("#" + elem +" option:selected").val();
		const sr = elem.substring(6);
		changeOptionType(sr,newType);
	});

	$(document).on('change','input[type="radio"]',function(e)
	{
		const elem = e.target.id;
		const markedOption = $("#" + elem+":checked").val();
		const sr = elem.substring(2);
		$("#sel_"+sr).empty().append(markedOption);
	});

	$(document).on('change','input[type="checkbox"]',function(e)
	{
		const elem = e.target.id;
		const sr = elem.substring(2);
		var selected = [];
		$.each($("input[name='Answer"+sr+"']:checked"),function(){
			selected.push($(this).val());
		});
		$("#sel_"+sr).empty().append(selected.join(","));
	});

	$(document).on('change','input[type="number"]',function(e)
	{
		const elem = e.target.id;
		if(elem.indexOf('N')==-1 && elem.indexOf('D')==-1)
		{
			let sr = elem.substring(2);
			const ans = $("#"+elem).val();
			console.log({id:elem,sr:sr,ans:ans});
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
			console.log(sr);
			if(elem.indexOf("N")!= -1 && $("#o_"+sr+"_D").val() =="")
			{
				$("#o_"+sr+"_D").val("1");
			}

			if(elem.indexOf("D")!= -1 && $("#o_"+sr+"_N").val() =="")
			{
				$("#o_"+sr+"_N").val("1");
			}

			$("#sel_"+sr).empty().append($("#o_"+sr+"_N").val()+"/"+$("#o_"+sr+"_D").val());
		}
	});



})