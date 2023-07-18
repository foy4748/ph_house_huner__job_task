function readLocalStorage(key) {
	const value = window.localStorage.getItem(key)
	if (value) {
		return value
	} else {
		return null
	}
}

function writeToLocalStorage(key, value) {
	window.localStorage.setItem(key, value);
	const val = readLocalStorage(key)

	if (val) {
		return val
	} else {
		return null
	}
}

export {readLocalStorage, writeToLocalStorage}
