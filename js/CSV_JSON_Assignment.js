const readline = require('readline','utf-8');
const fs = require('fs');
let N_E_states=[], M_F_ratio=[], Compare_Population=[], data1=[],data2=[],data3=[],data4=[];
let Lit_Male=0, Lit_Males=0, Lit_Female=0,Lit_Females=0, Illit_Male=0, Illit_Males=0, Illit_Female=0, Illit_Females=0, Total_Male=0, Total_Female=0;
let rl = readline.createInterface({
	input: fs.createReadStream('../csv/India2011.csv','utf-8')
});
let WriteStream1=fs.createWriteStream('../json/M_F_ratio.json');
let WriteStream2=fs.createWriteStream('../json/N_E_states.json');
let WriteStream3=fs.createWriteStream('../json/Compare_Population.json');
rl.on('line', (line) => {
	let arr=line.split(',');
	if(arr[4]==='Total' && arr[5]==='All ages')   //storing values in variables for first json
	{	
		Total_Male+=parseInt(arr[7]),
		Total_Female+=parseInt(arr[8]), 
		Illit_Females+=parseInt(arr[10]),
		Illit_Males+=parseInt(arr[11]),
		Lit_Males+=parseInt(arr[13]),
		Lit_Females+=parseInt(arr[14])
	}
	let stateCode=arr[1];       //storing values in variables for second json
	if((stateCode==='12'||stateCode==='13'||stateCode==='14'||stateCode==='15'||stateCode==='16'||stateCode==='17'||stateCode==='18')&&(arr[4]==='Total' && arr[5]==='All ages'))
	{
		Lit_Male+=parseInt(arr[13])	;
		Lit_Female+=parseInt(arr[14]);
		Illit_Male+=parseInt(arr[10]);
		Illit_Female+=parseInt(arr[11]);
	}
	if(arr[4]==='Total' && arr[5]==='All ages')   	//storing and pushing values in variables for third json
	{

		Compare_Population.push({
			"States":arr[3],
			"Literate_Population":parseInt(arr[12]),
			"Illiterate_Population":parseInt(arr[9])
		});
	}
});
rl.on('close',()=>{							//pushing values in array
	data1.push(
		{"value":Lit_Males,"rate":"male"},
		{"value":Lit_Females,"rate":"female"});
	data2.push(
		{"value":Illit_Females,"rate":"male"},
		{"value":Illit_Males,"rate":"female"});
	M_F_ratio.push(
	{"categorie" : "Literate","values": data1.map((i) => i)},
	{"categorie" : "Illiterate","values": data2.map((i) => i)});
	data3.push(
		{"value":Lit_Male,"rate":"male"},
		{"value":Lit_Female,"rate":"female"});
	data4.push(
		{"value":Illit_Male,"rate":"male"},
		{"value":Illit_Female,"rate":"female"});
	N_E_states.push(
	{"categorie" : "Literate","values": data3.map((i) => i)},
	{"categorie" : "Illiterate","values": data4.map((i) => i)});
			WriteStream1.write(JSON.stringify(M_F_ratio,null,4));
			WriteStream2.write(JSON.stringify(N_E_states,null,4));
			WriteStream3.write(JSON.stringify(Compare_Population,null,4));
});