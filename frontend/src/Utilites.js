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

// timestampDate : Number
const getExpiresDateByMinutes = (timestampDate) => {
	const diff = timestampDate - (new Date().getTime());
	const expiresOnMinutes = diff / (1000 * 60 * 60);
	return expiresOnMinutes;
}

export {readLocalStorage, writeToLocalStorage, getExpiresDateByMinutes}
