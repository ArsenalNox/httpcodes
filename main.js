function infer_search_type(seach_query){
	const re = new RegExp('[1-5]([0-9]){0,2}')

	if (seach_query == '' || seach_query == null){
		return
	}

	load_targets = []
	if (re.exec(seach_query) != null){
		//Поиск по кодам 
        seach_query = re.exec(seach_query)[0]

		for (let code of known_codes){
			console.log(code, seach_query)
			if (seach_query == code){
				console.log('Found!')
				load_targets.push(code.toString())
			} else if (code.toString().includes(seach_query)) {
				load_targets.push(code.toString())
			}
		}
	} else {
		//Поиск по содержанию страниц
		for (let code_data of json_data){
			if (
				code_data['desc'].includes(seach_query)
				|| code_data['content'].includes(seach_query)
				){
				load_targets.push(code_data['name'])
			}
		}
	}

	loadDesc(load_targets)
}


function loadDesc(codes){
	document.getElementById('content').innerHTML = ''
	for (let code of codes){
		console.log(code)
		new_code_desc = `<zero-md src="content/${code.toString()[0]}00/${code.toString()}.md"></zero-md>`
		document.getElementById('content').innerHTML += new_code_desc
	}
}